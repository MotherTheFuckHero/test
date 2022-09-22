import request from '@/utils/request'

export function getorderinfoLists(data) {
  return request({
    url: 'admin/order_info/list',
    method: 'post',
    data
  })
}
export function agreeRefund(id) {
  return request({
    url: 'admin/order_info/' + id + '/agree_refund',
    method: 'put'
  })
}
export function refuse(id, data) {
  return request({
    url: 'admin/order_info/' + id + '/status/' + data,
    method: 'put'
  })
}
export function reason(orderId, data) {
  return request({
    url: 'admin/order_info/' + orderId + '/refund?reason=' + data,
    method: 'put'
  })
}
export function getorderdetail(id) {
  return request({
    url: 'admin/order_info/' + id,
    method: 'get'
  })
}

export function CouponStatusLists(data) {
  return request({
    url: 'admin/common/order/enum/CouponUserStatusEnum',
    method: 'get',
    pamers: data
  })
}

export function ordertypeLists(data) {
  return request({
    url: 'admin/common/order/enum/OrderTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function settlementStatusList(data) {
  return request({
    url: 'admin/common/pay/enum/SettlementStatusEnum',
    method: 'get',
    pamers: data
  })
}
export function orderStatusLists(data) {
  return request({
    url: 'admin/common/order/enum/OrderStatusEnum',
    method: 'get',
    pamers: data
  })
}
/* 获取待退款数量*/
export function getordercount() {
  return request({
    url: 'admin/order_info/refund_count',
    method: 'get'
  })
}

/* 打印*/
export function orderPrint(id) {
  return request({
    url: process.env.VUE_APP_community_API + '/admin/order_print/print/' + id,
    method: 'get'
  })
}

export function cancel(id) {
  return request({
    url: 'admin/order_info/cancel/' + id,
    method: 'put'
  })
}

/* 单独退商品*/
export function getproductId(id, count) {
  return request({
    url: 'admin/order_info/refund_alone/' + id + '/product_count/' + count,
    method: 'get'
  })
}
// 单独退款状态审核
export function getproductIds(id, count, type) {
  return request({
    url: 'admin/order_info/refund_alone/' + id + '/' + type,
    method: 'put'
  })
}
// 导游同意拒绝退款
export function guiderefund(id, type) {
  return request({
    url: 'admin/order_info/refund_guide/' + id + '/' + type,
    method: 'put'
  })
}
// 停车续费单查询
export function getparkingRenew(id) {
  return request({
    url: 'admin/order_parking_renew/list/' + id,
    method: 'get'
  })
}

// 今日采购报表
export function getPurchaseOrderList(data) {
  return request({
    url: 'admin/merchant_sale_info/purchase_day',
    method: 'post',
    data
  })
}
// 报损审核状态
export function statusListss(data) {
  return request({
    url: 'admin/common/product/enum/StockOrderStatusEnum',
    method: 'get',
    pamers: data
  })
}

// 销售退货审核
export function stockPut(id, data) {
  return request({
    url: 'admin/stock_product/' + id,
    method: 'put',
    data
  })
}
// 负责人列表
export function getstockInfoUserlist(merchantId) {
  return request({
    url: 'admin/stock_info/user_list/' + merchantId,
    method: 'get'
  })
}

// 物流确认发货
export function postlogistic(data) {
  return request({
    url: 'admin/order_logistic',
    method: 'put',
    data
  })
}
// 物流快递枚举
export function LogisticsCode(data) {
  return request({
    url: 'admin/common/order/enum/LogisticsCodeEnum',
    method: 'get',
    pamers: data
  })
}

export function genCount(data) {
  return request({
    url: 'admin/order_info/generate/' + data,
    method: 'post'
  })
}
