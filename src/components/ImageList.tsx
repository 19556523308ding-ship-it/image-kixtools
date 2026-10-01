import React from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react';
import type { ImageFile } from '../types';
import { formatFileSize } from '../utils/imageProcessing';
import { downloadImage } from '../utils/download';
import { useTranslation } from '../i18n';

interface ImageListProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
}

export function ImageList({ images, onRemove }: ImageListProps) {
  const { t } = useTranslation();

  if (images.length === 0) return null;

  return (
    <div className="space-y-3">
      {images.map((image) => (
        <div
          key={image.id}
          className="brand-card animate-fade-up flex items-center gap-4 p-4 transition-shadow duration-200 hover:shadow-soft"
        >
          {image.preview && (
            <img
              src={image.preview}
              alt={image.file.name}
              className="h-16 w-16 flex-shrink-0 object-cover rounded-lg ring-1 ring-ink-200"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink-900 truncate">
                {image.file.name}
              </p>
              <div className="flex items-center gap-1">
                {image.status === 'complete' && (
                  <button
                    onClick={() => downloadImage(image)}
                    className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-brand-600 transition-colors"
                    title={t.download}
                    aria-label={t.download}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => onRemove(image.id)}
                  className="rounded-md p-1.5 text-ink-400 hover:bg-err/10 hover:text-err transition-colors"
                  title={t.remove}
                  aria-label={t.remove}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm">
              {image.status === 'pending' && (
                <span className="text-ink-500">{t.statusPending}</span>
              )}
              {image.status === 'processing' && (
                <span className="flex items-center gap-2 text-brand-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.statusProcessing}
                </span>
              )}
              {image.status === 'complete' && (
                <span className="flex items-center gap-1.5 font-medium text-ok">
                  <CheckCircle className="w-4 h-4" />
                  {t.statusComplete}
                </span>
              )}
              {image.status === 'error' && (
                <span className="flex items-center gap-1.5 font-medium text-err">
                  <AlertCircle className="w-4 h-4" />
                  {image.error || t.statusError}
                </span>
              )}
            </div>
            <div className="mt-1 text-sm text-ink-500 tabular-nums">
              {formatFileSize(image.originalSize)}
              {image.compressedSize && (
                <>
                  <span className="mx-1.5 text-ink-300">→</span>
                  {formatFileSize(image.compressedSize)}{' '}
                  <span className="font-semibold text-ok">
                    ({t.smaller(
                      Math.round(
                        ((image.originalSize - image.compressedSize) /
                          image.originalSize) *
                          100
                      )
                    )})
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
