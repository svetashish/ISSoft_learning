import { removeAttribute } from "../helpers/removeAttribute.js";
import { createElementScript } from "../helpers/createElementScript.js"


export const UserComponent = {
  script() {
    removeAttribute("#added_script");
    createElementScript("users.js", "added_script");
  },

  style: 'users.css',
  render() {
    removeAttribute(".wrapper-data");
    const header = 
      `<nav class="back">
        <button type="button" class="back">
           <a href="#">Back</a>
        </button>
      </nav>`
      

    const data = `
      <div class="container container__after-close">
        <h3>Hello, darling!</h3>
        <div class = "wrapper-data-dataata"></div>
     `

    const modalForms = `
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
            <button type="submit" class="submit" >Submit</button>
            <button type="button" class="close">Close</button>
          </div>
        </form>
      </div>
      <div class="modal">
        <form class="modal-content modal-content__delete">
          <h3>Are you sure you want to delete this user?</h3>
          <div class="submit-section">
            <button type="submit" class="submit">OK, submit</button>
            <button type="button" class="close">No, close</button>
          </div>
        </form>
      </div>
    `;
  
    
    // const result = Array.from({length: cancelBtnCounts}).map(() => cancelBtn).join("");

    const result = header + data + modalForms;


    return  result;
  // render () {
  //   return `
  //       <nav class="back">
  //         <button type="button" class="back">
  //           <a href="#">Back</a>
  //         </button>
  //       </nav>
  //       <div class="container container__after-close">
  //         <h3>Hello, darling!</h3>
  //       </div>
  //       <div class="modal">
  //         <form class="modal-content modal-content__edit">
  //           <h3>Edit form</h3>
  //           <div class="message-for-error">
  //             <div class="modal-content__input">
  //               <div class="row radio">
  //                 <input id="sex-male" type="radio" name="sex" value="male" checked="checked" />
  //                 <label for="sex-male">Male</label>
  //               </div>
  //               <div class="row radio">
  //                 <input id="sex-female" type="radio" name="sex" value="female" />
  //                 <label for="sex-female">Female</label>
  //               </div>
  //             </div>
  //           </div>
  //           <div class="message-for-error">
  //             <div class="modal-content__input">
  //               <input 
  //                 name="name"
  //                 class="name" 
  //                 type='text' 
  //                 placeholder="Enter name"
  //                 required
  //               />
  //             </div>
  //           </div>
  //           <div class="message-for-error">
  //             <div class="modal-content__input">
  //                 <input 
  //                   name="birth"
  //                   class="birth" 
  //                   type="text"
  //                   placeholder="Enter date of birth"
  //                   data-reg="^([0-9]{2})\\.([0-9]{2})\\.([1-2][0-9]{3})$" 
  //                   required
  //                 />
  //             </div>
  //           </div>
  //           <div class="message-for-error">
  //             <div class="modal-content__input">
  //               <input 
  //               name="number"
  //               class="number" 
  //               type="text"
  //               placeholder="Enter phone number"
  //               data-reg="^(\\+375|80)(29|25|44|33)([0-9]{3})([0-9]{2})([0-9]{2})$" 
  //               required
  //             />
  //             </div>
  //           </div>
  //           <div class="submit-section">
  //             <button type="submit" class="submit" >Submit</button>
  //             <button type="button" class="close">Close</button>
  //           </div>
  //         </form>
  //       </div>
  //       <div class="modal">
  //         <form class="modal-content modal-content__delete">
  //           <h3>Are you sure you want to delete this user?</h3>
  //           <div class="submit-section">
  //             <button type="submit" class="submit">OK, submit</button>
  //             <button type="button" class="close">No, close</button>
  //           </div>
  //         </form>
  //       </div>
  //   `;
  // },
},
}
