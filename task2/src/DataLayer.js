export class DataLayer {
  constructor() {
    if (DataLayer.instance) {
      console.log("не создаем");
      return DataLayer.instance
    } else {
      DataLayer.instance = this;
      console.log("создаем");
      return DataLayer.instance;
    }
  }

   getData(tableName) {
    const dataObject = JSON.parse(localStorage.getItem(tableName));
    const keyName = Object.keys(dataObject); 

    return [dataObject, keyName];
  }

  setData(data, tableName) {  
    let regData = false;
    const [dataObject, keyName] = this.getData(tableName);

    if (keyName.includes(data.email)) {
      regData = false;
    } else {
      regData = true;
      dataObject[`${data.email}`] = {password: `${data.password}`};
      localStorage.setItem(`${tableName}`, JSON.stringify(dataObject));    
    }
    return regData;
  }

  checkData(data, tableName) {
    let isChecked = false;
    const [dataObject, keyName] = this.getData(tableName);

    if(keyName.includes(data.email)) {
      isChecked = (dataObject[`${data.email}`].password === data.password) ? true : false;
    }   
    return isChecked;
  }
}
