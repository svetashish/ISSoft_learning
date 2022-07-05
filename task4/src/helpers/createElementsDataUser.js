export const createElementsDataUser = (blockName, initialData) => {
  return `
    <div class="user_line-wrapper">
      <div class="user_${blockName}-title">${blockName}: </div>
      <div class="user_${blockName}-data" data-id="${blockName}">
        ${initialData[`${blockName}`] || "no data"}
      </div>
    </div>
  `;
};
