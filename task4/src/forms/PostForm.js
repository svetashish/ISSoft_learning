import { dataBaseApi } from "../api/api";
import { Form } from "./Form";

export class PostForm extends Form {
  constructor(selector, fields, submittedCallback) {
    super(selector, fields);
    this.submittedCallback = submittedCallback;
  }

  async handleSubmitForm(event) {
    super.handleSubmitForm(event);

    try {
      const ckeckedEmail = await dataBaseApi.checkTokenForDelete();
      const responsData = await dataBaseApi.getDataByEmail(
        ckeckedEmail.username
      );

      const newPost = await dataBaseApi.setPost({
        ...this.data,
        email: responsData.email,
      });
      
      if (this.submittedCallback) {
        this.submittedCallback();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
