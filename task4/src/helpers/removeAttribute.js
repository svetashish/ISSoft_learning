export const removeAttribute = (selector, targetElement = document) => {
  const elements = targetElement.querySelectorAll(selector);
  if (elements.length > 0) {
    for (let element of elements) {
      element.remove();
    }
    return true;
  }
};
