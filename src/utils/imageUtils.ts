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
