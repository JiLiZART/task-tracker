export default function daysLeft(value) {
  if (!value) return "";

  value = value.toString();

  const start = new Date();
  const end = new Date(value);
  const daysCount = start.getTime() - end.getTime();
  const word = start < end ? " left" : " delay";
  const days = `${daysCount}`; //  moment(end).toNow(true);

  return days + word;
}
