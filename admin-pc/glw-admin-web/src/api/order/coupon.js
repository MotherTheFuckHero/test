import request from '@/utils/request'

export function getcouponLists(data) {
  return request({
    url: 'admin/coupon/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/coupon',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/coupon/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/coupon/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/coupon/' + id,
    method: 'delete'
  })
}

export function coupontypesLists(data) {
  return request({
    url: 'admin/common/order/enum/CouponTypeEnum',
    method: 'get',
    pamers: data
  })
}
// 限制类型
export function coupontypeLists(data) {
  return request({
    url: 'admin/common/order/enum/CouponScopeTypeEnum',
    method: 'get',
    pamers: data
  })
}
// 状态
export function couponstatusLists(data) {
  return request({
    url: 'admin/common/order/enum/CouponStatusEnum',
    method: 'get',
    pamers: data
  })
}

// 时间类型
export function TimetypeLists(data) {
  return request({
    url: 'admin/common/order/enum/CouponTimeTypeEnum',
    method: 'get',
    pamers: data
  })
}

export default { add, edit, del }
