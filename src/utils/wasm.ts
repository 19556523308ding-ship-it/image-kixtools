import type { OutputType } from '../types';

// Track WASM module initialization
const wasmInitialized = new Map<OutputType, boolean>();

export async function ensureWasmLoaded(format: string): Promise<any> {
  const normalized = format === 'jpg' ? 'jpeg' : format;
  
  try {
    switch (normalized) {
      case 'avif':
        return await import('@jsquash/avif');
      case 'jpeg':
        return await import('@jsquash/jpeg');
      case 'jxl':
        return await import('@jsquash/jxl');
      case 'png':
        return await import('@jsquash/png');
      case 'webp':
        return await import('@jsquash/webp');
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  } catch (error) {
    console.error(`Failed to initialize WASM for ${format}:`, error);
    throw new Error(`Failed to initialize ${format} support`);
  }
}