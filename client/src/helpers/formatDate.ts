import { parseISO, format } from "date-fns";
import { capitalizeString } from "./formatString";
import { ptBR } from "date-fns/locale";

export function dateToFormat(date: string | undefined): string {
  if (date === undefined || date === "") return "";

  const dateObj = parseISO(date);

  const minutes = capitalizeString(format(dateObj, "mm", { locale: ptBR }));
  const hours = capitalizeString(format(dateObj, "KK", { locale: ptBR }));
  const dayOfWeek = capitalizeString(format(dateObj, "EEE", { locale: ptBR }));
  const dayOfMonth = capitalizeString(format(dateObj, "dd", { locale: ptBR }));
  const monthFullName = format(dateObj, "MMMM", { locale: ptBR });

  const formattedDate = `${dayOfWeek.slice(
    0,
    3
  )}, ${dayOfMonth} de ${monthFullName} às ${hours}:${minutes}`;

  return formattedDate;
}
