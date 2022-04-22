export class CompareElements {
  constructor(elements){
    this.arrElements = elements;
  }

  compare() {
    let isMatch = false;
    isMatch = (this.arrElements[0] === this.arrElements[1]) ? true : false;
    return isMatch;
  }
}
