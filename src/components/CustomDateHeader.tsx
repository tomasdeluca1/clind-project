import { format } from "date-fns";

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
