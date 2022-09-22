import request from '@/utils/request'

export function getseckillLists(data) {
  return request({
    url: 'admin/product_seckill/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/product_seckill',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/product_seckill/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/product_seckill/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/product_seckill/' + id,
    method: 'delete'
  })
}
export function getseckillType(data) {
  return request({
    url: 'admin/common/product/enum/ProductSecKillTypeEnum',
    method: 'get',
    pamers: data
  })
}
export function editseckill(id, data) {
  return request({
    url: 'admin/product_seckill/' + id + '/status',
    method: 'put',
    data
  })
}
export default { add, edit, del }

