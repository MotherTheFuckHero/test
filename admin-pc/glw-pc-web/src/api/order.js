import request from '@/request/http'

//订单详情
export function getOrderdetail(id) {
  return request({
    url: '/web/order/detail/'+ id,
    method: 'get',
  })
}
//订单地址
export function getOrderaddress(id) {
  return request({
    url: '/web/order/address/'+ id,
    method: 'get',
  })
}
//取消订单
export function getOrdercancel(id) {
  return request({
    url: '/web/order/cancel/'+ id,
    method: 'put',
  })
}
//删除订单
export function getOrderDel(id) {
  return request({
    url: '/web/order/'+ id,
    method: 'delete',
  })
}
//确认收货
export function getOrderreceipt(id) {
  return request({
    url: '/web/order/receipt/'+ id,
    method: 'put',
  })
}
//申请退款
export function getOrderrefund(id,reason) {
  return request({
    url: '/web/order/refund/'+ id +'?reason='+reason,
    method: 'put',
  })
}
//订单列表
export function getOrderList(pageNo, pageSize, data) {
  return request({
    url: `/web/order/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
//收货地址列表
export function getAddressList(pageNo, pageSize, data) {
  return request({
    url: `/web/address/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
//收货地址列表
export function addAddress(data) {
  return request({
    url: '/web/address',
    method: 'post',
    data
  })
}
//收货地址列表
export function putAddress(id, data) {
  return request({
    url: '/web/address/' + id,
    method: 'put',
    data
  })
}
//收货地址列表
export function delAddress(id) {
  return request({
    url: '/web/address/' + id,
    method: 'delete'
  })
}
//提交评价
export function addComment(data) {
  return request({
    url: '/web/product_comment',
    method: 'post',
    data
  })
}
//评价列表
export function getCommentList(pageNo, pageSize, data) {
  return request({
    url: `/web/product_comment/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
//提交问题
export function addShopQA(data) {
  return request({
    url: '/web/product_question',
    method: 'post',
    data
  })
}
//问题列表
export function getShopQAList(pageNo, pageSize, data) {
  return request({
    url: `/web/product_question/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
//回复列表
export function getShopAnswerList(pageNo, pageSize, data) {
  return request({
    url: `/web/product_question/answer_page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

//游客信息列表
export function getcontactsList(pageNo, pageSize, data) {
  return request({
    url: `/web/user_contacts/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
//游客信息添加
export function addcontacts(data) {
  return request({
    url: '/web/user_contacts',
    method: 'post',
    data
  })
}
//游客信息修改
export function putcontacts(id, data) {
  return request({
    url: '/web/user_contacts/' + id,
    method: 'put',
    data
  })
}
//游客信息删除
export function delcontacts(id) {
  return request({
    url: '/web/user_contacts/' + id,
    method: 'delete'
  })
}
//钱包详情
export function getwallet() {
  return request({
    url: '/web/user_wallet',
    method: 'get',
  })
}
//物流轨迹
export function getsearch(data) {
  return request({
    url: 'web/logistics/search',
    method: 'post',
    data
  })
}
//优惠券列表
export function getcouponList(data) {
  return request({
    url: `/web/coupon/page_list?pageNo=${data.pageNo}&pageSize=10`,
    method: 'post',
    data
  })
}
//用户领取优惠券列表
export function getusercouponList(data) {
  return request({
    url: `/web/coupon/user/page_list?pageNo=${data.pageNo}&pageSize=10`,
    method: 'post',
    data
  })
}
//可用优惠券
export function postcouponlist(data) {
  return request({
    url: '/web/order/coupon/list',
    method: 'post',
    data
  })
}
//领取优惠券
export function postcoupon(data) {
  return request({
    url: '/web/coupon',
    method: 'post',
    data
  })
}
//预算费
export function postcalculation(data) {
  return request({
    url: '/web/order/calculation',
    method: 'post',
    data
  })
}


//钱包记录
export function getwalletList(data) {
  return request({
    url: `/web/user_wallet/page_list?pageNo=${data.pageNo}&pageSize=10`,
    method: 'post',
    data
  })
}
//查询支付是否成功
export function getpayment(id) {
  return request({
    url: process.env.BASE_CASHIER_URL + '/api/payment/'+ id,
    method: 'get',
  })
}
//钱包提现
export function addwallet(data) {
  return request({
    url: process.env.BASE_CASHIER_URL + '/api/user_wallet/cash',
    method: 'put',
    data
  })
}
//支付方式
export function getorderpayment() {
  return request({
    url: process.env.BASE_CASHIER_URL + '/cashier/payment_type?clientId=9',
    method: 'get'
  })
}
