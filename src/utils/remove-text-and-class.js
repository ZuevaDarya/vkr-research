export default function removeTextAndClass(elem, className) {
  elem.innerText = '';
  elem.classList.remove(className.toString());
}
