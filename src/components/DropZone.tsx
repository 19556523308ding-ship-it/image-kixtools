import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import type { ImageFile } from '../types';
import { useTranslation } from '../i18n';

interface DropZoneProps {
  onFilesDrop: (files: ImageFile[]) => void;
}

export function DropZone({ onFilesDrop }: DropZoneProps) {
  const { t } = useTranslation();

  const toImageFiles = (files: File[]): ImageFile[] =>
    files
      .filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('jxl'))
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        status: 'pending' as const,
        originalSize: file.size,
      }));

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onFilesDrop(toImageFiles(Array.from(e.dataTransfer.files)));
  }, [onFilesDrop]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFilesDrop(toImageFiles(Array.from(e.target.files || [])));
    e.target.value = '';
  }, [onFilesDrop]);

  return (
    <div
      className="rounded-xl2 border-2 border-dashed border-ink-300 bg-white/70 p-8 sm:p-12 text-center transition-all duration-200 ease-swift hover:border-brand-400 hover:bg-brand-50/40 hover:shadow-soft"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="fileInput"
        className="sr-only"
        multiple
        accept="image/*,.jxl"
        onChange={handleFileInput}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer flex flex-col items-center gap-4"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500 ring-1 ring-brand-100">
          <Upload className="w-7 h-7" />
        </span>
        <span className="block">
          <span className="block text-base font-semibold text-ink-800">
            {t.dropTitle}
          </span>
          <span className="mt-1 block text-sm text-ink-500">
            {t.dropSubtitle}
          </span>
        </span>
      </label>
    </div>
  );
}
