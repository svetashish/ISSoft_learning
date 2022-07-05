import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // headers: { "Content-Type": "multipart/form-data" },
});

export const dataBaseApi = {
  async getData() {
    const responce = await api.get("/users");
    return responce.data;
  },

  async setData(data) {
    const responce = await api.post("/users", { ...data });

    return responce.data;
  },

  async checkData(data) {
    const responce = await api.post("/check", { ...data });
    return responce.data;
  },

  async deleteData(data) {
    const responce = await api.delete("/user", {data});
    return responce.data;
  },

  async updateData(data) {
    const responce = await api.put("/user", {...data});
    return responce.data;
  }
};
