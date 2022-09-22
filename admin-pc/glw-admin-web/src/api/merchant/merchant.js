import request from '@/utils/request'

export function getmerchantLists(data) {
  return request({
    url: 'admin/merchant_info/list',
    method: 'post',
    data
  })
}
export function infoadd(data) {
  return request({
    url: 'admin/merchant_info',
    method: 'post',
    data
  })
}

export function infoedit(id, data) {
  return request({
    url: 'admin/merchant_info/' + id,
    method: 'put',
    data
  })
}

export function infoget(id) {
  return request({
    url: 'admin/merchant_info/' + id,
    method: 'get'
  })
}

export function infodel(id) {
  return request({
    url: 'admin/merchant_info/' + id,
    method: 'delete'
  })
}

export function contactGet(id) {
  return request({
    url: 'admin/merchant_contact/merchant/' + id,
    method: 'get'
  })
}

export function contactadd(data) {
  return request({
    url: 'admin/merchant_contact',
    method: 'post',
    data
  })
}

export function contactdit(id, data) {
  return request({
    url: 'admin/merchant_contact/' + id,
    method: 'put',
    data
  })
}
// 附件信息查询
export function accessoryGet(id) {
  return request({
    url: 'admin/merchant_accessory/merchant/' + id,
    method: 'get'
  })
}

export function batchadd(id, data) {
  return request({
    url: 'admin/merchant_accessory/batch/' + id,
    method: 'post',
    data
  })
}

export function batchedit(id, data) {
  return request({
    url: 'admin/merchant_accessory/batch/' + id,
    method: 'put',
    data
  })
}

export function settlementGet(id) {
  return request({
    url: 'admin/merchant_settlement_info/merchant/' + id,
    method: 'get'
  })
}
export function settlementadd(data) {
  return request({
    url: 'admin/merchant_settlement_info',
    method: 'post',
    data
  })
}

export function settlementedit(id, data) {
  return request({
    url: 'admin/merchant_settlement_info/' + id,
    method: 'put',
    data
  })
}
// 类目信息查询
export function categorysGet(id) {
  return request({
    url: 'admin/merchant_category/merchant/' + id,
    method: 'get'
  })
}
export function categoryadd(data) {
  return request({
    url: 'admin/merchant_category/merchant',
    method: 'post',
    data
  })
}

export function categoryedit(id, data) {
  return request({
    url: 'admin/merchant_category/merchant/' + id,
    method: 'put',
    data
  })
}

// 扩展信息查询
export function extendGet(id) {
  return request({
    url: 'admin/merchant_extend/merchant/' + id,
    method: 'get'
  })
}
export function extendadd(data) {
  return request({
    url: 'admin/merchant_extend',
    method: 'post',
    data
  })
}

export function extendedit(id, data) {
  return request({
    url: 'admin/merchant_extend/' + id,
    method: 'put',
    data
  })
}

export function merchanttypeLists(data) {
  return request({
    url: 'admin/common/product/enum/MerchantBizTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function merchantstatusLists(data) {
  return request({
    url: 'admin/common/product/enum/MerchantStatusEnum',
    method: 'get',
    pamers: data
  })
}
export function CosttypeLists(data) {
  return request({
    url: 'admin/common/product/enum/CostTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function SettlementypeLists(data) {
  return request({
    url: 'admin/common/product/enum/SettlementTypeEnum',
    method: 'get',
    pamers: data
  })
}

/* 轮播图*/
export function batchGet(id) {
  return request({
    url: 'admin/merchant_img/merchant/' + id,
    method: 'get'
  })
}
export function batchAdd(data) {
  return request({
    url: 'admin/merchant_img/batch/merchant',
    method: 'post',
    data
  })
}

export function batchEdit(id, data) {
  return request({
    url: 'admin/merchant_img/batch/merchant/' + id,
    method: 'put',
    data
  })
}

// 审核状态
export function examinePut(id, data) {
  return request({
    url: 'admin/merchant_info/' + id + '/status',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: 'admin/merchant_info/' + id,
    method: 'delete'
  })
}
export function editisAutoPrint(id, isAutoPrint) {
  return request({
    url: 'admin/merchant_info/' + id + '/auto_print/' + isAutoPrint,
    method: 'put'
  })
}

// 更换店主
export function shopkeeperEdit(id, newUserId) {
  return request({
    url: 'admin/merchant_info/' + id + '/user/' + newUserId + '/update',
    method: 'put'
  })
}
export default { del }
