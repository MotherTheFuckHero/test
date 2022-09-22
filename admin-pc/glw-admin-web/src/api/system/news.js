import request from '@/utils/request'

export function getnewsLists(data) {
  return request({
    url: 'admin/news/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/news',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/news/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/news/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/news/' + id,
    method: 'delete'
  })
}

export function examinePut(Id, data) {
  return request({
    url: 'admin/news/' + Id + '/status',
    method: 'put',
    data
  })
}

export function TypeList(data) {
  return request({
    url: 'admin/common/sys/enum/NewsTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function StatusList(data) {
  return request({
    url: 'admin/common/sys/enum/NewsStatusEnum',
    method: 'get',
    pamers: data
  })
}

export default { add, edit, del }
