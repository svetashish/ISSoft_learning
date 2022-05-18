export const UserComponent = {
  script()  { 
    const check = document.querySelector("#added_script");
    console.log(check);

    if(check.dataset.script) {
      check.remove();
    }
      

    const script = document.createElement("script");
    // script.setAttribute("type", "module");
    script.setAttribute("src", './user.js');
    script.setAttribute("id", "added_script");
    script.setAttribute("data-script", true);
    document.querySelector("head").append(script);
    
},
  // script: () => { 
  //   debugger
  //   return `./user.js`   
  // },
  style: "./src/style/user-page/page.css",
  render() {
    return `
    <link rel="stylesheet" href= "./src/style/user-page/page.css"/>
        <nav class="back">
          <button type="button" class="back">
            <a href="#">Back</a>
          </button>
        </nav>
        <div class="container container__after-close">
          <h3>Hello, darling!</h3>
        </div>
        <div class="modal">
          <form class="modal-content modal-content__edit">
            <h3>Edit form</h3>
            <div class="message-for-error">
              <div class="modal-content__input">
                <div class="row radio">
                  <input id="sex-male" type="radio" name="sex" value="male" checked="checked" />
                  <label for="sex-male">Male</label>
                </div>
                <div class="row radio">
                  <input id="sex-female" type="radio" name="sex" value="female" />
                  <label for="sex-female">Female</label>
                </div>
              </div>
            </div>
            <div class="message-for-error">
              <div class="modal-content__input">
                <input 
                  name="name"
                  class="name" 
                  type='text' 
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>
            <div class="message-for-error">
              <div class="modal-content__input">
                  <input 
                    name="birth"
                    class="birth" 
                    type="text"
                    placeholder="Enter date of birth"
                    data-reg="^([0-9]{2})\\.([0-9]{2})\\.([1-2][0-9]{3})$" 
                    required
                  />
              </div>
            </div>
            <div class="message-for-error">
              <div class="modal-content__input">
                <input 
                name="number"
                class="number" 
                type="text"
                placeholder="Enter phone number"
                data-reg="^(\\+375|80)(29|25|44|33)([0-9]{3})([0-9]{2})([0-9]{2})$" 
                required
              />
              </div>
            </div>
            <div class="submit-section">
              <button type="submit" class="submit-registration" >Submit</button>
              <button type="button" class="close">Close</button>
            </div>
          </form>
        </div>
    `;
  }
} 
