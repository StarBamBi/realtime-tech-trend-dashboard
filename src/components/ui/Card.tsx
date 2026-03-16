import type { ReactNode } from "react";
import * as s from "./Card.css";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`${s.card} ${className}`.trim()}>{children}</div>;
}

export function CardHeader({ children, className = "" }: CardProps) {
  return (
    <div className={`${s.cardHeader} ${className}`.trim()}>{children}</div>
  );
}

export function CardTitle({ children, className = "" }: CardProps) {
  return <h3 className={`${s.cardTitle} ${className}`.trim()}>{children}</h3>;
}
