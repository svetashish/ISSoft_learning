export class DataLayer {
  constructor() {
    if (DataLayer.instance) {
      return DataLayer.instance;
    } else {
      DataLayer.instance = this;
      return DataLayer.instance;
    }
  }

  deleteTableOfData(tableName) {
    localStorage.removeItem(tableName);
  }

  getData(tableName) {
    const dataObject = JSON.parse(localStorage.getItem(tableName)) || {};

    return [dataObject, Object.keys(dataObject)];
  }

  setData(data, tableName, isToken = false) { // есть
    let isNeedReg = false;
    if (isToken) {
      this.deleteTableOfData(tableName);
    }

    const [dataObject, keyName] = this.getData(tableName);
   
    if (keyName && keyName.includes(data.email)) {
      isNeedReg = false;
    } else {
      isNeedReg = true;
      dataObject[`${data.email}`] = { password: `${data.password}` };
      localStorage.setItem(`${tableName}`, JSON.stringify(dataObject));
    }
    return isNeedReg;
  }

  checkData(data, tableName) {  // есть
    let isChecked = false;
    const [dataObject, keyName] = this.getData(tableName);

    if (keyName && keyName.includes(data.email)) {
      isChecked =
        dataObject[`${data.email}`].password === data.password ? true : false;
    }
    return isChecked;
  }

  deleteData(id, tableName) { // done
    const [dataObject, keyName] = this.getData(tableName);

    const newDataBase = Object.entries(dataObject)
      .filter((item) => item[0] !== id)
      .reduce((acc, [email, value]) => ({ ...acc, [email]: value }), {});

    this.updateData(newDataBase, tableName);
  }

  updateData(data, tableName) { // not use from delete
    localStorage.setItem(`${tableName}`, JSON.stringify(data));
  }

  setNewParams(data, tableName, selectedEmail) {
    const [dataObject, keyName] = this.getData(tableName);

    const newDataBase = {
      ...dataObject,
      [selectedEmail]: Object.assign(dataObject[`${selectedEmail}`], data),
    };

    this.updateData(newDataBase, tableName);
  }
}
