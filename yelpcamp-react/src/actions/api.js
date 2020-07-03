import axios from "axios";

const baseUrl = "http://localhost:5000";

export default {
  campground(url = `${baseUrl}/campgrounds/`) {
    return {
      fetchAll: () => axios.get(url, { crossDomain: true }),
      fetchById: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url + id, updateRecord),
      delete: (id) => axios.delete(url + id),
    };
  },
  user(url = baseUrl) {
    return {
      signUp: (userData) => axios.post(url + "/register", userData),
      login: (userData) => axios.post(url + "/login", userData),
    };
  },
};
