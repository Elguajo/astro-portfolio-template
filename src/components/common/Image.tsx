import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {Skeleton} from "@heroui/react";

interface ImageProps {
  src: string;
  alt?: string;
  classNames?: {
    skeleton?: string;
    img?: string;
  };
  onClick?: () => void;
  imageInfo: {
    width: number;
    height: number;
  };
  workTitle?: string;
  [key: string]: any;
}

export default React.memo(function({ src, alt, classNames = {}, onClick, imageInfo, workTitle, ...props }: ImageProps) {
  const [isLoad, setIsLoad] = useState(false)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const radio = Math.round(imageInfo.width / imageInfo.height * 100) / 100;
  
  // Generate meaningful alt text
  const generateAltText = () => {
    if (alt) return alt;
    
    const imageName = src.split('/').pop();
    const workName = workTitle || src.split('/').slice(-2, -1)[0];
    
    if (imageName === 'main') {
      return `${workName} - Main portfolio image`;
    }
    
    return `${workName} - Portfolio work image ${imageName}`;
  };
  return (
    <Skeleton
      classNames={{
        base: clsx([
          "w-full text-white/0",
          !isLoad && "animate-[pulse_1s_ease-in-out_infinite] bg-[#f6f9f0] dark:bg-[#222] transform-gpu",
          !isLoad && !radio && 'h-[40dvh]',
          classNames.skeleton,
        ]),
      }}
      isLoaded={isLoad}
      style={{aspectRatio: radio}}
    >
      {
        mounted && <picture className="">
          <source srcSet={`${src}.avif`} type="image/avif" />
          <source srcSet={`${src}.webp`} type="image/webp" />
          <img
            onContextMenu={e => e.preventDefault()}
            key={src}
            loading="lazy"
            className={clsx('w-full', classNames.img)}
            onClick={onClick}
            src={`${src}.webp`}
            alt={generateAltText()}
            onLoad={() => setIsLoad(true)}
            {...props}
          />
        </picture>
      }
    </Skeleton>
  );
});

