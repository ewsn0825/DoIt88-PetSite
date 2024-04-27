import { generateRandomNumber } from './randomNumber';
import avatar0 from '@/assets/base_images/avatar0.png';
import avatar1 from '@/assets/base_images/avatar1.png';
import avatar2 from '@/assets/base_images/avatar2.png';
import avatar3 from '@/assets/base_images/avatar3.png';
import avatar4 from '@/assets/base_images/avatar4.png';
import avatar5 from '@/assets/base_images/avatar5.png';
import avatar6 from '@/assets/base_images/avatar6.png';
import avatar7 from '@/assets/base_images/avatar7.png';
import avatar8 from '@/assets/base_images/avatar8.png';
import avatar9 from '@/assets/base_images/avatar9.png';

export const uploadPngFile = () => {
  const randomNum = generateRandomNumber();

  const avatarPaths = [
    avatar0,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    
  ];

  const baseImage = new Image();
  baseImage.src = avatarPaths[randomNum];

  return new Promise((resolve) => {
    baseImage.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;

      const context = canvas.getContext('2d');
      context.drawImage(baseImage, 0, 0);

      canvas.toBlob((blob) => {
        const baseImageFile = new File([blob], `avatar${randomNum}.png`, {
          type: 'image/png',
        });

        resolve({ baseImage: baseImage.src, baseImageFile });
      }, 'image/png');
    };
  });
};
