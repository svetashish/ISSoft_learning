export const HomeComponent = {
  script () { 
    const check = document.getElementById("added_script");
    console.log(check);
    
    const checkTest = document.getElementById("added_test");
 

    if(check) {
      check.remove();
     
    }

    if(checkTest) {
      checkTest.remove();
     
    }
      

    const script = document.createElement("script");
    // script.setAttribute("type", "module");
    script.setAttribute("src", './index.js');
    script.setAttribute("id", "added_script");
    document.querySelector("head").append(script);  





    // const scriptNew = document.createElement("script");
   
    // scriptNew.setAttribute("src", './new_file.js');
    // scriptNew.setAttribute("type", "module");
    // scriptNew.setAttribute("id", "added_test");
    // scriptNew.setAttribute("data-script", true);
    // document.querySelector("head").append(scriptNew);  


},

//   script: () => { 
//     return `./index.js`
    
    
// },

  style: "./src/style/srart-page/toggle-button.css",
  render () {
    return `
    <link rel="stylesheet" href="./src/style/srart-page/toggle-button.css"/>
        <div class="container">
          <button class="login">Login</button>
          <button class="registation">Registation</button>
        </div> 
        <div class="modal">
          <form class="modal-content modal-content__login">
            <h3>Form for logging</h3>
            <div class="message-for-error">
              <div class="modal-content__input">
                <input 
                  name="email"
                  class="email" 
                  type='text' 
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
            <div class="message-for-error">
              <div class="modal-content__input">
                <input 
                  name="password"
                  class="password" 
                  type="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div class="toggle-wrapper">
                <input class="check" type="checkbox" id="checkbox" />
                <label for ="checkbox">Show password</label>
              </div>   
            </div>
            <div class="submit-section">
              <button  type="submit" class="submit-login" >
                Submit
              </button>
              <button  type="button" class="close">Close</button>
            </div>
          </form>
        </div>
        <div class="modal">
          <form class="modal-content modal-content__registration">
            <h3>Form for registration</h3>
            <div class="message-for-error">
              <div class="modal-content__input">
                <input 
                  name="email"
                  class="email" 
                  type='text' 
                  placeholder="Enter email"
                  data-reg="^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$" 
                  required
                />
              </div>
            </div>
            <div class="message-for-error">
              <div class="modal-content__input">
                  <input 
                    name="password"
                    class="password" 
                    type="password"
                    placeholder="Enter password"
                    data-reg='(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                    required
                  />
              </div>
            </div>
            <div class="message-for-error">
              <div class="modal-content__input">
                <input class="confirm-password" type='password' placeholder="Repeat password" required/>
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

