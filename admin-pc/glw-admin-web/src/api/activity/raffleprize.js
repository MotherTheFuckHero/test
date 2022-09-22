import request from '@/utils/request'

export function getraffleprizeLists(data) {
  return request({
    url: 'admin/raffle_prize/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'admin/raffle_prize',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: 'admin/raffle_prize/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'admin/raffle_prize/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'admin/raffle_prize/' + id,
    method: 'delete'
  })
}
export function activitiestypeLists(data) {
  return request({
    url: 'admin/common/sys/enum/PrizeTypeEnum',
    method: 'get',
    pamers: data
  })
}

export default { add, edit, del }

