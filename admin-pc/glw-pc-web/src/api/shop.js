import request from '@/request/http';
// 商家详情
export function getShopInfo (id) {
  return request({
    url: '/web/product/info/' + id,
    method: 'get'
  });
}
export function getSpecInfo (id) {
  return request({
    url: '/web/product/spec/' + id,
    method: 'get'
  });
}
// 商家详情图片列表
export function getShopImg (id) {
  return request({
    url: '/web/product/img/' + id,
    method: 'get'
  });
}
// 加入购物车
export function addShopCared (data) {
  return request({
    url: '/web/shop_cart',
    method: 'post',
    data
  });
}
// 立即购买
export function buyShopSubmit (data) {
  return request({
    url: '/web/order/submit',
    method: 'post',
    data
  });
}
// 导游下单
export function buyguideSubmit (data) {
  return request({
    url: '/web/order/submit_guide',
    method: 'post',
    data
  });
}
// 立即购买
export function getPay (data) {
  return request({
    url: process.env.BASE_CASHIER_URL + '/cashier/pay',
    method: 'post',
    data
  });
}
// 正在拼单数据
export function getGroupOrder (id) {
  return request({
    url: '/web/product/group_order/' + id,
    method: 'get'
  });
}
