import request from '@/utils/request'

export function getliveproductLists(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product/list',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product/' + id,
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product/' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product/' + id,
    method: 'delete'
  })
}
/* 主播列表*/
export function getliveActorLists(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_actor/list',
    method: 'post',
    data
  })
}

/* 主播提成列表*/
export function getliveproductActorLists(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_actor_commission/list',
    method: 'post',
    data
  })
}

export function productActoradd(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_actor_commission',
    method: 'post',
    data
  })
}

export function productActoredit(id, data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_actor_commission/' + id,
    method: 'put',
    data
  })
}

export function productActordel(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_actor_commission/' + id,
    method: 'delete'
  })
}

/* 商品规格列表*/
export function getliveproductspecLists(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product_spec/list',
    method: 'post',
    data
  })
}
export function productspecadd(data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product_spec',
    method: 'post',
    data
  })
}

export function productspecedit(id, data) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product_spec/' + id,
    method: 'put',
    data
  })
}

export function productspecdel(id) {
  return request({
    url: process.env.VUE_APP_live_API + '/admin/glw_live_product_spec/' + id,
    method: 'delete'
  })
}

export default { add, edit, del }
