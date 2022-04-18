import axios from "axios";
import store from "../store/index";
import { baseUrl } from "@/config/config";

axios.defaults.baseURL = "http://127.0.0.1:3000/";
export default function setAxios() {
  //请求拦截
  axios.interceptors.request.use((config) => {
    if (store.state.token) {
      // 将token设置在headers ['Authorization'] 上面
      config.headers["Authorization"] = `Bearer ${store.state.token}`;
    }
    return config;
  });
}
// export default function setAxios() {
//   //请求拦截
//   axios.interceptors.request.use((config) => {
//     if (config.type === "specialRequest") return config;
//     if (store.state.token) {
//       // 将token设置在headers ['Authorization'] 上面
//       config.headers["Authorization"] = `Bearer ${store.state.token}`;
//     }
//     return config;
//   });
// }
