import request from '@/utils/request'

export function getbigDataLists(data) {
  return request({
    url: 'admin/big_data/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/big_data',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/big_data/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/big_data/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/big_data/' + id,
    method: 'delete'
  })
}
export function typeLists(data) {
  return request({
    url: 'admin/common/sys/enum/BigDataTypeEnum',
    method: 'get',
    pamers: data
  })
}
/* 大数据展示*/
export function getbigData(type) {
  return request({
    url: 'admin/bigData/' + type,
    method: 'get'
  })
}
export default { add, edit, del }
