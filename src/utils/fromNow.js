export default function fromNow(value) {
  if (!value) return '';
  value = value.toString();
  return new Date(value).toDateString();
}
