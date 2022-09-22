import request from '@/utils/request'

export function getmerchantguidepointLists(data) {
  return request({
    url: 'admin/merchant_guide_point/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/merchant_guide_point',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/merchant_guide_point/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/merchant_guide_point/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/merchant_guide_point/' + id,
    method: 'delete'
  })
}
export function scaleTypeLists(data) {
  return request({
    url: 'admin/common/product/enum/GuideScaleTypeEnum',
    method: 'get',
    pamers: data
  })
}

export function guideVoiceListGet(id) {
  return request({
    url: 'admin/merchant_guide_point_voice/point/' + id,
    method: 'get'
  })
}
export function voiceadd(data) {
  return request({
    url: 'admin/merchant_guide_point_voice',
    method: 'post',
    data
  })
}

export function voiceedit(id, data) {
  return request({
    url: 'admin/merchant_guide_point_voice/' + id,
    method: 'put',
    data
  })
}
export function voicedel(id) {
  return request({
    url: 'admin/merchant_guide_point_voice/' + id,
    method: 'delete'
  })
}
export default { add, edit, del }

