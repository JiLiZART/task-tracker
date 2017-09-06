export default function getCurrentActiveElement() {
  try {
    return document.activeElement
  } catch (e) {
  }
}
