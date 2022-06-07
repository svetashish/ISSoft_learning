export const createElementScript = (srcName, idName) => {
  const script = document.createElement("script");
  script.setAttribute("src", srcName);
  script.setAttribute("id", idName);
  document.querySelector("body").append(script);
}