import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const dataBaseApi = {
  token: JSON.parse(localStorage.getItem("token")),

  baseReq(method, url, headers) {
    //check refresh token

    const newHeaders = localStorage.getItem("token") != null
      ? { ...headers, Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).accessToken }
      : { ...headers };

    return api[method](url, { headers: newHeaders }).then((res) => res.data);
  },

  async getData() {
    return await this.baseReq("get", "/users/getAll", {});
  },

  // async getData() {
  //   const responce = await api.get("/users/getAll", {
  //     headers: {
  //       Authorization: "Bearer " + this.token?.accessToken,
  //     },
  //   });
  //   return responce.data;
  // },

  async getDataByEmail(data) {
    const responce = await api.get(
      "/users/getUser",
      { params: { email: data } },
      {
        headers: {
          Authorization: "Bearer " + this.token?.accessToken,
        },
      }
    );
    return responce.data;
  },

  async setData(data) {
    const responce = await api.post("/user/set", { ...data });
    return responce.data;
  },

  async login(data) {
    const responce = await api.post("/auth/login", { ...data });
    return responce.data;
  },

  async checkTokenForDelete() {
    const responce = await api.post("/auth/check", {
      token: this.token,
      headers: {
        Authorization: "Bearer " + this.token?.accessToken,
      },
    });
    return responce.data;
  },

  async deleteData(data) {
    const responce = await api.delete("/user/delete", {
      data,
      headers: {
        Authorization: "Bearer " + this.token?.accessToken,
      },
    });
    return responce.data;
  },

  async updateData(data) {
    const responce = await api.put(
      "/user/update",
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + this.token?.accessToken,
        },
      }
    );
    return responce.data;
  },

  async setPost(data) {
    const responce = await api.post('/user/setpost', {...data});
    
  }
  // async refreshToken(data) {
  //   const responce = await api.post("/refresh", { ...data });
  //   return responce.data;
  // }
};
