import { useState, useEffect } from 'react';
import { Keyboard } from '@capacitor/keyboard';

interface UseKeyboardReturn {
  isKeyboardOpen: boolean;
  keyboardHeight: number;
}

export function useKeyboard(): UseKeyboardReturn {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    let showListener: { remove: () => void } | undefined;
    let hideListener: { remove: () => void } | undefined;
    let cleanupViewport: (() => void) | undefined;

    const setupListeners = async () => {
      try {
        showListener = await Keyboard.addListener('keyboardWillShow', (info) => {
          setIsKeyboardOpen(true);
          setKeyboardHeight(info.keyboardHeight);
        });

        hideListener = await Keyboard.addListener('keyboardWillHide', () => {
          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
        });
      } catch {
        // Keyboard plugin not available (web environment)
        // Use visual viewport API as fallback
        if (window.visualViewport) {
          const handleResize = () => {
            const heightDiff = window.innerHeight - window.visualViewport!.height;
            setIsKeyboardOpen(heightDiff > 150);
            setKeyboardHeight(heightDiff > 150 ? heightDiff : 0);
          };

          window.visualViewport.addEventListener('resize', handleResize);
          cleanupViewport = () => {
            window.visualViewport?.removeEventListener('resize', handleResize);
          };
        }
      }
    };

    void setupListeners();

    return () => {
      showListener?.remove();
      hideListener?.remove();
      cleanupViewport?.();
    };
  }, []);

  return {
    isKeyboardOpen,
    keyboardHeight,
  };
}
