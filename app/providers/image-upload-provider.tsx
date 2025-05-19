import { createContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { uploadImage } from '~/apis/client/images';

type ImageUploadContextType = Readonly<{
  inputRef: React.RefObject<HTMLInputElement | null>;
  uploadedPath?: string;
}>;

export const ImageUploadContext = createContext<ImageUploadContextType>({} as ImageUploadContextType);

interface ImageUploadProviderProps {
  children: React.ReactNode;
}

export default function ImageUploadProvider({ children }: Readonly<ImageUploadProviderProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [uploadedPath, setUploadedPath] = useState<string>();

  function onImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    if (target.files && target.files.length > 0) {
      const selectedFile = target.files[0];
      setFile(selectedFile);
    }
  }

  useEffect(() => {
    if (!file) return;

    toast.promise(() => uploadImage(file).then(({ data }) => setUploadedPath(data)), {
      loading: '이미지를 업로드 중입니다.',
      success: '이미지가 업로드되었습니다.',
      error: '이미지 업로드에 실패했습니다.',
    });
  }, [file]);

  return (
    <ImageUploadContext.Provider value={{ inputRef, uploadedPath }}>
      {children}
      <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={onImageFileChange} />
    </ImageUploadContext.Provider>
  );
}
