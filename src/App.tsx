import React, { useState, useCallback } from 'react';
import { Trash2, BookOpen, ArrowRight } from 'lucide-react';
import { CompressionOptions } from './components/CompressionOptions';
import { DropZone } from './components/DropZone';
import { ImageList } from './components/ImageList';
import { DownloadAll } from './components/DownloadAll';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useImageQueue } from './hooks/useImageQueue';
import { DEFAULT_QUALITY_SETTINGS } from './utils/formatDefaults';
import { useTranslation } from './i18n';
import type { ImageFile, OutputType, CompressionOptions as CompressionOptionsType } from './types';

export function App() {
  const { lang, t } = useTranslation();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [outputType, setOutputType] = useState<OutputType>('webp');
  const [options, setOptions] = useState<CompressionOptionsType>({
    quality: DEFAULT_QUALITY_SETTINGS.webp,
  });

  const { addToQueue } = useImageQueue(options, outputType, setImages);

  const handleOutputTypeChange = useCallback((type: OutputType) => {
    setOutputType(type);
    if (type !== 'png') {
      setOptions({ quality: DEFAULT_QUALITY_SETTINGS[type] });
    }
  }, []);

  const handleFilesDrop = useCallback((newImages: ImageFile[]) => {
    // First add all images to state
    setImages((prev) => [...prev, ...newImages]);

    // Use requestAnimationFrame to wait for render to complete
    requestAnimationFrame(() => {
      // Then add to queue after UI has updated
      newImages.forEach(image => addToQueue(image.id));
    });
  }, [addToQueue]);

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find(img => img.id === id);
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach(image => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });
    setImages([]);
  }, [images]);

  const handleDownloadAll = useCallback(async () => {
    const completedImages = images.filter((img) => img.status === "complete");

    for (const image of completedImages) {
      if (image.blob && image.outputType) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(image.blob);
        link.download = `${image.file.name.split(".")[0]}.${image.outputType}`;
        link.click();
        URL.revokeObjectURL(link.href);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }, [images]);

  const completedImages = images.filter(img => img.status === 'complete').length;
  const blogHref = lang === 'en' ? '/blog/' : '/zh-CN/blog/';

  return (
    <div className="min-h-screen bg-ink-50">
      {/* 顶部品牌色氛围光，让页面不是一整块死灰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-100/60 via-brand-50/30 to-transparent"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <header className="flex items-center justify-end mb-8 sm:mb-10">
          <LanguageSwitcher />
        </header>

        <section className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-4 mb-5">
            <img
              src="/logo.png"
              srcSet="/logo.png 256w, /logo@2x.png 512w"
              sizes="(min-width: 640px) 80px, 64px"
              width={80}
              height={80}
              alt=""
              aria-hidden="true"
              className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-[0_4px_12px_rgba(69,120,245,0.28)]"
            />
            <h1 className="text-display sm:text-display-lg font-bold text-ink-900">
              {t.brand}
            </h1>
          </div>
          <p className="text-ink-600 leading-relaxed max-w-xl mx-auto">
            {t.tagline}
          </p>
        </section>

        <div className="space-y-6">
          <CompressionOptions
            options={options}
            outputType={outputType}
            onOptionsChange={setOptions}
            onOutputTypeChange={handleOutputTypeChange}
          />

          <DropZone onFilesDrop={handleFilesDrop} />

          {completedImages > 0 && (
            <DownloadAll onDownloadAll={handleDownloadAll} count={completedImages} />
          )}

          <ImageList
            images={images}
            onRemove={handleRemoveImage}
          />

          {images.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-ink-200 bg-white text-sm font-medium text-ink-600 hover:border-err/40 hover:bg-err/5 hover:text-err transition-colors duration-150"
            >
              <Trash2 className="w-5 h-5" />
              {t.clearAll}
            </button>
          )}

          <a
            href={blogHref}
            className="kix-card flex items-center gap-4 p-5 hover:border-brand-300 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200 ease-swift group"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 group-hover:bg-brand-100 transition-colors">
              <BookOpen className="w-6 h-6" />
            </span>
            <span className="flex-1 min-w-0">
              <p className="font-semibold text-ink-900">{t.blogCardTitle}</p>
              <p className="text-sm text-ink-500 mt-0.5">{t.blogCardDesc}</p>
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 whitespace-nowrap group-hover:gap-2 transition-all">
              {t.blogCardCta}
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        <footer className="mt-14 pt-6 border-t border-ink-200 text-center text-sm text-ink-400">
          <span>{t.footerBefore}</span>
          <a
            href="https://kixtools.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:text-brand-700 hover:underline underline-offset-2"
          >
            {t.footerLink}
          </a>
          <span>{t.footerAfter}</span>
        </footer>
      </div>
    </div>
  );
}
