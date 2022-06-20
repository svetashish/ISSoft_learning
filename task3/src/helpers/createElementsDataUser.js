export const createElementsDataUser = (blockName, initialData) => {
  const value = initialData.map((item) => {
      if (item[0] == blockName) {
        return item[1];
      }
    }).join("");

  return `
    <div class="user_line-wrapper">
      <div class="user_${blockName}-title">${blockName}: </div>
      <div class="user_${blockName}-data" data-id="${blockName}">
        ${value || "no data"}
      </div>
    </div>
  `;
};
