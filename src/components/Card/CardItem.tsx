import React from "react";

interface CardItemProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description?: string;
  vote: number | string;
  releaseDate: string;
}

export const CardItem = ({
  image,
  title,
  description,
  vote,
  releaseDate,
  className = "",
  ...props
}: CardItemProps) => {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-72 w-full object-cover"
        />

        <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
          ⭐ {vote}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-lg font-semibold leading-snug">
          {title}
        </div>

        {description && (
          <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {description}
          </div>
        )}

        <div className="mt-auto pt-3 text-xs text-muted-foreground">
          📅 {releaseDate}
        </div>
      </div>
    </div>
  );
};