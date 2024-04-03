export default function addTextAndClass(elem, text, className = '') {
  elem.innerText = text.toString();

  if (className) {
    elem.classList.add(className.toString());
  }
}
