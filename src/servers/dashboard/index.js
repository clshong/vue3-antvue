import { http } from "@/utils/request";

/**
 * 获取数据总览数据
 * @param data - 请求数据
 */
export function getDataTrends(data) {
  return http.get("/dashboard", { params: data }); 
}
