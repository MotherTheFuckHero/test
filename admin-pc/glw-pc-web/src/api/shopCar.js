import request from '@/request/http';
// 购物车查询
export function getShopCarList () {
  return request({
    url: '/web/shop_cart/list',
    method: 'post'
  });
}
// 购物车单个删除
export function deleteShopCar (id) {
  return request({
    url: '/web/shop_cart/' + id,
    method: 'delete'
  });
}
// 购物车批量删除
export function deleteShopCarList (data) {
  return request({
    url: `/web/shop_cart/batch?ids=${data}` ,
    method: 'delete'
  });
}
