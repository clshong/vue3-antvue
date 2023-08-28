
import { http } from "@/utils/request";

const API = {
  COMMON_URL : "/authority/common",
};

/**
 * 获取游戏数据
 * @param data - 请求数据
 */
export function getGames(data) {
  return http.get(`${API.COMMON_URL}/games`, { params: data }); 
}
