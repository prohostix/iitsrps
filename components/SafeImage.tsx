"use client";

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  width?: number;
  height?: number;
  fallback?: React.ReactNode;
}

export default function SafeImage({ 
  src, 
  alt, 
  fill, 
  className, 
  sizes, 
  priority, 
  unoptimized,
  width,
  height,
  fallback 
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Don't render if src is empty or invalid
  if (!src || src.trim() === '') {
    return fallback || (
      <div className={`bg-slate-200 flex items-center justify-center ${className}`}>
        <span className="text-slate-500 text-sm">No image</span>
      </div>
    );
  }

  if (hasError) {
    return fallback || (
      <div className={`bg-slate-200 flex items-center justify-center ${className}`}>
        <span className="text-slate-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`bg-slate-200 animate-pulse ${className}`} />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
        style={isLoading ? { display: 'none' } : {}}
      />
    </>
  );
}