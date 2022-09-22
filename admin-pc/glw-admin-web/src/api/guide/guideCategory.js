import request from '@/utils/request'

export function getguideCategoryLists(data) {
  return request({
    url: 'admin/guide_category/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/guide_category',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/guide_category/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/guide_category/' + id,
    method: 'get'
  })
}
export function del(id) {
  return request({
    url: 'admin/guide_category/' + id,
    method: 'delete'
  })
}

export function categoryTypeLists(data) {
  return request({
    url: 'admin/common/user/enum/UserGuideCategoryTypeEnum',
    method: 'get',
    pamers: data
  })
}
export default { add, edit, del }

