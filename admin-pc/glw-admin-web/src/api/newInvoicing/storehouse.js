import request from '@/utils/request'

export function getAllStoreHouse(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/warehouse/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getStoreHouse(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/warehouse/list',
    method: 'post',
    data
  })
}

export function addStoreHouse(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/warehouse',
    method: 'post',
    data
  })
}

export function editSupplier(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/warehouse/' + id,
    method: 'put',
    data
  })
}

export function delStoreHouse(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/warehouse/' + id,
    method: 'delete'
  })
}
