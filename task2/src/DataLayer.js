export class DataLayer {
  constructor() {
    if (DataLayer.instance) {
      return DataLayer.instance;
    } else {
      DataLayer.instance = this;
      return DataLayer.instance;
    }
  }

  getData(tableName) {
    const dataObject = JSON.parse(localStorage.getItem(tableName)) || {};

    return [dataObject, Object.keys(dataObject)];
  }

  setData(data, tableName) {
    let isNeedReg = false;

    console.log(this.getData(tableName));
    let [dataObject, keyName] = this.getData(tableName);

    if (keyName && keyName.includes(data.email)) {
      isNeedReg = false;
    } else {
      isNeedReg = true;
      dataObject[`${data.email}`] = { password: `${data.password}` };
      localStorage.setItem(`${tableName}`, JSON.stringify(dataObject));
    }

    return isNeedReg;
  }

  checkData(data, tableName) {
    let isChecked = false;
    const [dataObject, keyName] = this.getData(tableName);

    if (keyName && keyName.includes(data.email)) {
      isChecked =
        dataObject[`${data.email}`].password === data.password ? true : false;
    }
    return isChecked;
  }
}
