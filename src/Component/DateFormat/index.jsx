import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const DateFormat = ({ message, date }) => {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = toZonedTime(date, timeZone);
  const formattedDate = format(zonedDate, "dd/MM/yyyy HH:mm");
  if (message)
    return (
      <p style={{ display: "inline-block" }}>{`${message} ${formattedDate}`}</p>
    );
  return <p>{`Data: ${formattedDate}`}</p>;
};

export default DateFormat;
