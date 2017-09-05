export default function isMac() {
  return navigator ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false
}
