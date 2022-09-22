import request from '@/utils/request'

export function getarticleLists(data) {
  return request({
    url: 'admin/article_guide/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/article_guide',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/article_guide/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/article_guide/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/article_guide/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
