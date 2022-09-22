import request from '@/utils/request'

export function getmerchantguideLists(data) {
  return request({
    url: 'admin/merchant_guide/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/merchant_guide',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/merchant_guide/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/merchant_guide/' + id,
    method: 'get'
  })
}
export function del(id) {
  return request({
    url: 'admin/merchant_guide/' + id,
    method: 'delete'
  })
}

export function guideimgGet(id) {
  return request({
    url: 'admin/merchant_guide_img_point/guide/' + id,
    method: 'get'
  })
}
export function guideimgadd(data) {
  return request({
    url: 'admin/merchant_guide_img_point',
    method: 'post',
    data
  })
}

export function guideimgedit(id, data) {
  return request({
    url: 'admin/merchant_guide_img_point/' + id,
    method: 'put',
    data
  })
}
export function guideimgdel(id) {
  return request({
    url: 'admin/merchant_guide_img_point/' + id,
    method: 'delete'
  })
}

export function guideVoiceListGet(id) {
  return request({
    url: 'admin/merchant_guide_voice/guide/' + id,
    method: 'get'
  })
}
export function voiceadd(data) {
  return request({
    url: 'admin/merchant_guide_voice',
    method: 'post',
    data
  })
}

export function voiceedit(id, data) {
  return request({
    url: 'admin/merchant_guide_voice/' + id,
    method: 'put',
    data
  })
}
export function voicedel(id) {
  return request({
    url: 'admin/merchant_guide_voice/' + id,
    method: 'delete'
  })
}
export function VoiceTypeLists(data) {
  return request({
    url: 'admin/common/product/enum/VoiceTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function VoiceLanguageTypeLists(data) {
  return request({
    url: 'admin/common/product/enum/VoiceLanguageTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function GuideImagePointTypeLists(data) {
  return request({
    url: 'admin/common/product/enum/GuideImagePointTypeEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }

