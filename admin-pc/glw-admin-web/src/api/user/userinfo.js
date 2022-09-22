import request from '@/utils/request'

export function getuserinfoLists(data) {
  return request({
    url: 'admin/user_info/list',
    method: 'post',
    data
  })
}

export function userpassword(id, data) {
  return request({
    url: 'admin/user_info/' + id + '/password/reset',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/user_info',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/user_info/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/user_info/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/user_info/' + id,
    method: 'delete'
  })
}
export function usertypeLists(data) {
  return request({
    url: 'admin/common/user/enum/UserTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function sourceLists(data) {
  return request({
    url: 'admin/common/dict_data/user_source',
    method: 'get',
    pamers: data
  })
}
export function FootprinttypeList(data) {
  return request({
    url: 'admin/common/user/enum/UserFootprintTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function usersaddresstypeList(data) {
  return request({
    url: 'admin/common/user/enum/AddressTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function favoritetypeList(data) {
  return request({
    url: 'admin/common/user/enum/UserFavoriteEnum',
    method: 'get',
    pamers: data
  })
}
export function companyGet(id) {
  return request({
    url: 'admin/user_company/user/' + id,
    method: 'get'
  })
}
export function companyPut(id, data) {
  return request({
    url: 'admin/user_company/user_to_company/' + id,
    method: 'put',
    data
  })
}
export function userDoordownload(formData) {
  return request({
    url: 'admin/user_door_head/excelPro',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传时的格式
    },
    data: formData
  })
}
export default { add, edit, del }
