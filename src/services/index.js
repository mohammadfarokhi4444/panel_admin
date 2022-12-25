import axios from "axios";
const BaseUrlV1 = "http://185.126.200.70:7033/api/v1";
const Auth = "/auth";
const Admin = "/admin";
const CV = "/cv";

class Services {
  async login(token, lang, request) {
    return await axios.post(`${BaseUrlV1}${Auth}/login`, request, {
      headers: { "accept-language": lang },
    });
  }
  async updateAdmin(token, lang, request, id) {
    return await axios.put(`${BaseUrlV1}${Admin}/${id}`, request, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async listCV(token, lang, request, query) {
    return await axios.get(`${BaseUrlV1}${Admin}${CV}${query || ""}`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async listAdmin(token, lang, request, query) {
    return await axios.get(`${BaseUrlV1}${Admin}${query || ""}`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async deleteCV(token, lang, request, id) {
    return await axios.delete(`${BaseUrlV1}${Admin}${CV}/${id}`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async deleteAdmin(token, lang, request, id) {
    return await axios.delete(`${BaseUrlV1}${Admin}/${id}`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async getAdmin(token, lang, request, id) {
    return await axios.get(`${BaseUrlV1}${Admin}/${id}`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async createAdmin(token, lang, request, id) {
    return await axios.post(`${BaseUrlV1}${Admin}`,request, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async dashboard(token, lang) {
    return await axios.get(`${BaseUrlV1}${Admin}/dashboard`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
}
export default new Services();
