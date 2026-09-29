import type { OutputType, CompressionOptions } from '../types';
import type { AvifEncodeOptions, JpegEncodeOptions, JxlEncodeOptions, WebpEncodeOptions } from '../types/encoders';
import { ensureWasmLoaded } from './wasm';

export async function decode(sourceType: string, fileBuffer: ArrayBuffer): Promise<ImageData> {
  // 彻底解除首页静态 import 绑定，真正按需动态加载 WASM 编解码器
  const codec = await ensureWasmLoaded(sourceType);

  try {
    return await codec.decode(fileBuffer);
  } catch (error) {
    console.error(`Failed to decode ${sourceType} image:`, error);
    throw new Error(`Failed to decode ${sourceType} image`);
  }
}

export async function encode(outputType: OutputType, imageData: ImageData, options: CompressionOptions): Promise<ArrayBuffer> {
  const codec = await ensureWasmLoaded(outputType);

  try {
    switch (outputType) {
      case 'avif': {
        const avifOptions: AvifEncodeOptions = {
          quality: options.quality,
          effort: 4
        };
        return await codec.encode(imageData, avifOptions as any);
      }
      case 'jpeg': {
        const jpegOptions: JpegEncodeOptions = {
          quality: options.quality
        };
        return await codec.encode(imageData, jpegOptions as any);
      }
      case 'jxl': {
        const jxlOptions: JxlEncodeOptions = {
          quality: options.quality
        };
        return await codec.encode(imageData, jxlOptions as any);
      }
      case 'png':
        return await codec.encode(imageData);
      case 'webp': {
        const webpOptions: WebpEncodeOptions = {
          quality: options.quality
        };
        return await codec.encode(imageData, webpOptions as any);
      }
      default:
        throw new Error(`Unsupported output type: ${outputType}`);
    }
  } catch (error) {
    console.error(`Failed to encode to ${outputType}:`, error);
    throw new Error(`Failed to encode to ${outputType}`);
  }
}

export function getFileType(file: File): string {
  if (file.name.toLowerCase().endsWith('jxl')) return 'jxl';
  const type = file.type.split('/')[1];
  return type === 'jpeg' ? 'jpg' : type;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
