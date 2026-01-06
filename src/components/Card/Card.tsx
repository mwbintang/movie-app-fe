import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ className = "", children, ...props }: CardProps) => {
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-card text-card-foreground shadow-md transition hover:shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};