import { useCallback } from 'react';

export interface CameraPhoto {
  dataUrl: string;
  file: File;
}

function pickPhotoFromFileInput(): Promise<CameraPhoto | null> {
  return new Promise<CameraPhoto | null>((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          dataUrl: reader.result as string,
          file,
        });
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
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
