import request from '@/request/http'

//商家详情
export function getmerchantInfo(id) {
  return request({
    url: '/web/merchant/info/'+ id,
    method: 'get',
  })
}
// 查询收藏
export function isfavorite (data) {
  return request({
    url: '/web/favorite/check_exist',
    method: 'post',
    data
  });
}
// 收藏
export function favorite (data) {
  return request({
    url: '/web/favorite',
    method: 'post',
    data
  });
}
// 取消收藏
export function deletefavorite (id) {
  return request({
    url: '/web/favorite/'+id,
    method: 'delete'
  });
}
//收藏列表
export function getfavoriteList(data) {
  return request({
    url: `/web/favorite/page_list?favoriteType=${data.favoriteType}&pageNo=${data.pageNo}&pageSize=10`,
    method: 'get'
  })
}
