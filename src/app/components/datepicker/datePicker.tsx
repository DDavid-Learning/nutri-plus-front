import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReactInputMask from "react-input-mask";

export const CustomDatePicker: React.FC<any> = ({ field, form }: { field: any, form: any }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
  
    useEffect(() => {
      setStartDate(field.value ? new Date(field.value) : null);
    }, [field.value]);
  
    return (
      <DatePicker
        {...field}
        selected={startDate}
        onChange={(date: Date) => form.setFieldValue(field.name, date)}
        dateFormat="dd/MM/yyyy"
        customInput={
          <ReactInputMask mask="99/99/9999" maskPlaceholder="dd/mm/yyyy" />
        }
      />
    );
  };