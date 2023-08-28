
import { http } from "@/utils/request";

const API = {
  URL :"/platform/partner",
};

/**
 * 获取公司数据
 * @param data - 请求数据
 */
export function getPartner(data) {
  return http.get(`${API.URL}`, { params: data }); 
}
