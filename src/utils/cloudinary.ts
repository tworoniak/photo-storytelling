const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

type Options = {
  width?: number;
  quality?: string;
};

export const cldImage = (publicId: string, options: Options = {}) => {
  const { width = 1200, quality = 'auto' } = options;

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},q_${quality},f_auto/${publicId}`;
};
