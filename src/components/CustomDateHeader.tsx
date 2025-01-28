import { format } from "date-fns";
import { JSX } from "react";

interface CustomDateHeaderProps {
  date: Date;
  label: string;
}

export default function CustomDateHeader({
  date,
  label,
}: CustomDateHeaderProps): JSX.Element {
  return <span>{label}</span>;
}
