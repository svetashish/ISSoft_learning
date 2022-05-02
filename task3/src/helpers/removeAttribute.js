export const removeAttribute = (selector) => {
  const element = document.querySelector(selector);
  if (element) element.remove();
}

//для Page line 19