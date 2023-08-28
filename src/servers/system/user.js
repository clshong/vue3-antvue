
import { http } from "@/utils/request";

const API = {
  URL : "/authority/user",
};

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getSystemUserPage(data) {
  return http.get(`${API.URL}/index`, { params: data }); 
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getSystemUserById(id) {
  return http.get(`${API.URL}/${id}`);
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createSystemUser(data) {
  return http.post(API.URL, data);
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateSystemUser(id, data) {
  return http.put(`${API.URL}/${id}`, data);
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteSystemUser(id) {
  return http.delete(`${API.URL}/${id}`); 
}
