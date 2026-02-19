import { useState, useCallback } from 'react';
import { routesApi } from '../api/routes.api';
import type { PodSubmissionResponse } from '../types/route.types';

interface PodPhoto {
  file: File;
  dataUrl: string;
}

export function usePodSubmit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PodSubmissionResponse | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const submitPod = useCallback(async (stopId: string, photos: PodPhoto[], notes?: string) => {
    setIsLoading(true);
    setError(null);
    setUploadProgress('Uploading photos...');

    try {
      const tempResults = await Promise.all(
        photos.map((photo) => routesApi.uploadTempDocument(photo.file))
      );

      const documents = tempResults.map((result) => ({
        tempFileName: result.tempFileName,
        originalFileName: result.originalFileName,
      }));

      setUploadProgress('Submitting POD...');

      const response = await routesApi.submitPod(stopId, {
        notes,
        documents,
      });

      setResult(response);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit POD';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
      setUploadProgress(null);
    }
  }, []);

  const getPod = useCallback(async (stopId: string) => {
    try {
      const response = await routesApi.getPod(stopId);
      setResult(response);
      return response;
    } catch {
      return null;
    }
  }, []);

  return {
    submitPod,
    getPod,
    isLoading,
    error,
    result,
    uploadProgress,
  };
}
