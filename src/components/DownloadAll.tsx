import React from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from '../i18n';

interface DownloadAllProps {
  onDownloadAll: () => void;
  count: number;
}

export function DownloadAll({ onDownloadAll, count }: DownloadAllProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onDownloadAll}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ok text-white text-sm font-semibold shadow-soft hover:brightness-105 active:scale-[0.99] transition-all duration-150"
    >
      <Download className="w-5 h-5" />
      {t.downloadAllCount(count)}
    </button>
  );
}
