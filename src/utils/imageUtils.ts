import api from '../api/api';
import { BASE_URL, PATHS } from '../api/paths';

export const fetchImageUrl = async (imageName: string): Promise<string> => {
  const response = await api.get(
    `${BASE_URL}${PATHS.IMAGES_PATH}/${imageName}`,
    {
      responseType: 'blob',
    }
  );
  return URL.createObjectURL(response.data);
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (result) {
        resolve(result.toString());
      } else {
        reject('Failed to convert blob to base64');
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const fetchBlob = async (blobUrl: string) => {
  const response = await fetch(blobUrl);
  return await response.blob();
};
