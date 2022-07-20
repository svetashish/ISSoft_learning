import { removeAttribute } from "../helpers/removeAttribute.js";
import { createElementScript } from "../helpers/createElementScript.js"  

export const PostComponent = {
    script() {
        removeAttribute("#added_script");
        createElementScript("posts.js", "added_script");
      },
    style: 'users.css',

    render() {
        return`
        <nav class="back">
            <a href="#">
              <button type="button" class="back">Back</button>
            </a>
            <a href="#">
              <button type="button" class="all_users">All Users</button>
            </a>
        </nav>
        <div class="container posts">
          <h3>Hello, darling!</h3>
        </div>  
        <div class="modal">
          <form class="modal-content modal-content__post" action="/" method="post" enctype="multipart/form-data">
            <h3>Create new post</h3>
              <div class="message-for-error">
                <div class="modal-content__input">
                  <input class="title" type="text" name="title" placeholder="Enter post's title" />
                </div>
                <div class="modal-content__input">
                  <textarea class="description" name="description" rows="4" cols="50" placeholder="Post's description"> </textarea>
                </div>
                <div class="modal-content__input">  
                  <input class="image" type="file" name="image" accept="image/*">
                </div>
              </div>
              <div class="submit-section">
                <button type="submit"  class="submit">Create</button>
                <button type="button" class="close">Close</button>
              </div>
            </form>
        </div>               
     
        `;
    }
};


// <form class="download-form modal-content modal-content__post" action="/" method="post" enctype="multipart/form-data">
