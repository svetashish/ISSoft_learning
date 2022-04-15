export class DataLayer {
  // constructor(data, tableName) {
  //   if (DataLayer.instance) {
  //     console.log("не создаем");
  //     return DataLayer.instance
  //   } else {
  //     this.data = data;
  //     this.tableName = tableName;
  //     DataLayer.instance = this;
  //     console.log("создаем");
  //     return DataLayer.instance;
  //   }
  // }

  constructor(data, tableName) {
    this.data = data;
    this.tableName = tableName;    
  }

  getData() {
    let dataObject = JSON.parse(localStorage.getItem(this.tableName));
    let users = Object.keys(dataObject);

    return [dataObject, users];
  }

  setData() { 
    console.log(this.data);
    let regData = false;
    let [dataObject, users] = this.getData();

    if (users.includes(this.data.email)) {
      regData = false;
    } else {
      regData = true;
      dataObject[`${this.data.email}`] = {"password": `${this.data.password}`};
      localStorage.setItem(`${this.tableName}`, JSON.stringify(dataObject));    
    }
    return regData;
  }

  checkData() {
    console.log(this.data);
    let isChecked = false;
    let [dataObject, users] = this.getData();

    if(users.includes(this.data.email)) {

      console.log(dataObject[`${this.data.email}`].password, 'ls');
      console.log(this.data.password, 'не лс');
      isChecked = (dataObject[`${this.data.email}`].password === this.data.password) ? true : false;
    }   
    return isChecked;
  }
}
