import { DataLayer } from "../common-classes/DataLayer";

export const guard = () => {
  const dataBase = new DataLayer();

  const [token, key] = dataBase.getData("token");

  return key.length === 1 ? true : false;
};
