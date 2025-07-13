import { DateRange } from "react-day-picker";

export type CalendarSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
  setDateSelected: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  carPriceDay?: string;
  date?: DateRange | undefined;
  initialDate?: DateRange | undefined;
};
