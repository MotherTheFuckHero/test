import request from '@/request/http'

export function getguideList(companyId,languageId,data) {
  return request({
    url: '/web/home/guide_user_list/'+ companyId+'/'+languageId,
    method: 'post',
    data
  })
}
export function getguide(id,languageId) {
  return request({
    url: '/web/home/guide_user/'+ id+'/'+languageId,
    method: 'get',
  })
}
//查询是否导游
export function getisguide() {
  return request({
    url: '/web/guide_user',
    method: 'get'
  })
}
//导游再次申请
export function postguides(id,data) {
  return request({
    url: '/web/guide_user/'+id,
    method: 'put',
    data
  })
}
//导游申请
export function postguide(data) {
  return request({
    url: '/web/guide_user',
    method: 'post',
    data
  })
}
//导游分类
export function guideList(data) {
  return request({
    url: '/web/guide_user/category_list',
    method: 'post',
    data
  })
}

//导游休息记录
export function getguiderest(data) {
  return request({
    url: `/web/guide_user/rest?pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
    method: 'get'
  })
}
//设置休息日
export function postguiderest(data) {
  return request({
    url: '/web/guide_user/rest',
    method: 'post',
    data
  })
}
//修改休息日
export function putguiderest(data) {
  return request({
    url: '/web/guide_user/rest',
    method: 'put',
    data
  })
}
//导游订单
export function getguideorderlist(data) {
  return request({
    url: `/web/guide_user/guide_order/list?pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
    method: 'post',
    data
  })
}
//导游结算单
export function getguidesettlementlist(data) {
  return request({
    url: `/web/guide_user/settlement_page_list?pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
    method: 'post',
    data
  })
}
//修改结算状态
export function putsettlement(id,status) {
  return request({
    url: '/web/guide_user/settlement/'+id+'/'+status,
    method: 'put'
  })
}
//结算明细
export function settlementdetail(data) {
  return request({
    url: '/web/guide_user/settlement_detail_list',
    method: 'post',
    data
  })
}
