import { removeAttribute } from "../helpers/removeAttribute.js";
import { createElementScript } from "../helpers/createElementScript.js"

export const HomeComponent = {
  script() {
    removeAttribute("#added_script");
    createElementScript( "home.js", "added_script");
  },
  style: 'home.css',
  render() {
    return `

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
  },
};
