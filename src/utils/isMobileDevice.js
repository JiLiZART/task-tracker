export default function isMobileDevice() {
  return typeof window.orientation !== "undefined";
}
