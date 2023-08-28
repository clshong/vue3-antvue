import { http } from "@/utils/request";

/**
 * 登录
 * @param data - 请求数据
 */
export function login(data) {
  return http.post("/login", data);
}

/**
 * 修改密码
 * @param data - 请求数据
 */

export function updatePassword(data) {
  return http.post("/update-password", data); 
}
