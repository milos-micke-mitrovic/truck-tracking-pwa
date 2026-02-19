import { useCallback } from 'react';

export interface CameraPhoto {
  dataUrl: string;
  file: File;
}

const MAX_WIDTH = 1280;
const MAX_HEIGHT = 1280;
const QUALITY = 0.7;

function compressImage(file: File): Promise<CameraPhoto> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'));
            return;
          }

          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              dataUrl: reader.result as string,
              file: compressedFile,
            });
          };
          reader.onerror = () => reject(new Error('Failed to read compressed image'));
          reader.readAsDataURL(compressedFile);
        },
        'image/jpeg',
        QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

function pickPhotoFromFileInput(): Promise<CameraPhoto | null> {
  return new Promise<CameraPhoto | null>((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      try {
        const compressed = await compressImage(file);
        resolve(compressed);
      } catch {
        // Fallback to original if compression fails
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            dataUrl: reader.result as string,
            file,
          });
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      }
    };
    input.oncancel = () => resolve(null);
    input.click();
  });
}

export function useCamera() {
  const takePhoto = useCallback(async (): Promise<CameraPhoto | null> => {
    // Use file input which works on both web and native (via Capacitor's web fallback)
    // When @capacitor/camera is installed, this can be upgraded to use native camera
    return pickPhotoFromFileInput();
  }, []);

  return { takePhoto };
}
