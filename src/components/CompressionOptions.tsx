import React from 'react';
import type { OutputType, CompressionOptions } from '../types';
import { useTranslation } from '../i18n';

interface CompressionOptionsProps {
  options: CompressionOptions;
  outputType: OutputType;
  onOptionsChange: (options: CompressionOptions) => void;
  onOutputTypeChange: (type: OutputType) => void;
}

const FORMATS = ['avif', 'jpeg', 'jxl', 'png', 'webp'] as const;

export function CompressionOptions({
  options,
  outputType,
  onOptionsChange,
  onOutputTypeChange,
}: CompressionOptionsProps) {
  const { t } = useTranslation();

  return (
    <section className="kix-card space-y-6 p-5 sm:p-6">
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-3">
          {t.outputFormat}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {FORMATS.map((format) => {
            const active = outputType === format;
            return (
              <button
                key={format}
                type="button"
                aria-pressed={active}
                className={`px-3 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-150 ease-swift ${
                  active
                    ? 'bg-brand-600 text-white shadow-soft'
                    : 'bg-ink-100 text-ink-600 hover:bg-ink-200/80 hover:text-ink-900'
                }`}
                onClick={() => onOutputTypeChange(format)}
              >
                {format}
              </button>
            );
          })}
        </div>
      </div>

      {outputType !== 'png' && (
        <div>
          <label
            htmlFor="quality-range"
            className="mb-3 flex items-center justify-between text-sm font-semibold text-ink-700"
          >
            <span>{t.qualityLabel(options.quality)}</span>
            <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 tabular-nums">
              {options.quality}%
            </span>
          </label>
          <input
            id="quality-range"
            type="range"
            min="1"
            max="100"
            value={options.quality}
            onChange={(e) =>
              onOptionsChange({ quality: Number(e.target.value) })
            }
            className="kix-range"
            style={{ '--kix-progress': `${options.quality}%` } as React.CSSProperties}
          />
        </div>
      )}
    </section>
  );
}
