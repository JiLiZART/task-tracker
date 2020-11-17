import getCurrentActiveElement from "./getCurrentActiveElement";

export default function isBodyActiveElement() {
  return document.body === getCurrentActiveElement();
}
