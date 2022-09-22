import request from '@/utils/request'

export function getAllSupplier(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/supplier/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getSupplier(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/supplier/list',
    method: 'post',
    data
  })
}

export function addSupplier(data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/supplier',
    method: 'post',
    data
  })
}

export function editSupplier(id, data) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/supplier/' + id,
    method: 'put',
    data
  })
}

export function delSupplier(id) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + 'admin/supplier/' + id,
    method: 'delete'
  })
}
