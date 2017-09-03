import moment from 'moment';

export default function daysLeft(value) {
  if (!value) return '';
  value = value.toString();

  const start = new Date();
  const end = new Date(value);
  const word = start < end ? ' left' : ' delay';
  const days = moment(end).toNow(true);

  return days + word;
}
