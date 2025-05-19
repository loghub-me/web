import { useContext } from 'react';
import { ImageUploadContext } from '~/providers/image-upload-provider';

export const useImageUpload = () => useContext(ImageUploadContext);
