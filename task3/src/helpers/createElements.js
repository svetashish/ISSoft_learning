export const createElements = (blockName, closestElement, initialData) => {
  const elementWrapper = document.createElement("div");
  elementWrapper.classList.add("user_line-wrapper");

  const elementTitle = document.createElement("div");
  elementTitle.classList.add(`user_${blockName}-title`);
  elementTitle.innerText = `${blockName}: `;

  const elementData = document.createElement("div");
  elementData.classList.add(`user_${blockName}-data`);
  elementData.setAttribute("data-id", `${blockName}`);
  elementData.innerText = "no data";

  initialData.map((item) => {
    if (item[0] == blockName) {
      elementData.innerText = item[1];
    }
  });
  elementWrapper.append(elementTitle, elementData);
  closestElement.append(elementWrapper);
};
