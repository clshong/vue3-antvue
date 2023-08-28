
import { http } from "@/utils/request";

/**
 * 权限
 * @param data - 请求数据
 */
export function getPermissions(data) {
  return http.get("/authority/user/refresh-permissions", {
    params: data,
  });
}
