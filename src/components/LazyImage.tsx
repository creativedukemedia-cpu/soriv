import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  skeletonClassName?: string;
};

function LazyImage({
  wrapperClassName,
  skeletonClassName,
  className,
  onLoad,
  loading,
  alt,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  return (
    <div className={cn("relative", wrapperClassName)}>
      {!loaded ? (
        <Skeleton className={cn("absolute inset-0", skeletonClassName)} />
      ) : null}
      <img
        {...props}
        alt={alt ?? ""}
        loading={loading ?? "lazy"}
        onLoad={handleLoad}
        className={cn("block h-full w-full", className, !loaded && "opacity-0")}
      />
    </div>
  );
}

export { LazyImage };
