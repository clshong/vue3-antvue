
import { http } from "@/utils/request";

const API = {
  URL : "/authority/menu",
};

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getSystemMenuPage(data) {
  return http.get(`${API.URL}/index`, { params: data }); 
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getSystemMenuById(id) {
  return http.get(`${API.URL}/${id}`);
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createSystemMenu(data) {
  return http.post(API.URL, data);
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateSystemMenu(id, data) {
  return http.put(`${API.URL}/${id}`, data);
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteSystemMenu(id) {
  return http.delete(`${API.URL}/${id}`);
}

/**
 * 获取权限列表
 * @param data - 搜索数据
 */
export function getPermission(data) {
  return http.get(`${API.URL}/tree`, { params: data });
}

/**
 * 保存权限列表
 * @param data - 权限数据
 */
export function savePermission(data) {
  return http.put(`${API.URL}/authorize/save`, data) ;
}
