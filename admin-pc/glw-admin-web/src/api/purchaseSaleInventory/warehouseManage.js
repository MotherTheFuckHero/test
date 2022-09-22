import request from '@/utils/request'

export function getmerchantLists(data) {
  return request({
    url: 'admin/merchant_info/list',
    method: 'post',
    data
  })
}
export function getWareHouseInfoListss(data) {
  return request({
    url: 'admin/warehouse_info/list',
    method: 'post',
    data
  })
}
export function getWareHouseInfoLists(pageNo, pageSize, data) {
  return request({
    url: `admin/warehouse_info/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function addWareHouse(data) {
  return request({
    url: 'admin/warehouse_info',
    method: 'post',
    data
  })
}

export function editWareHouse(id, data) {
  return request({
    url: 'admin/warehouse_info/' + id,
    method: 'put',
    data
  })
}

export function getWareHouse(id) {
  return request({
    url: 'admin/warehouse_info/' + id,
    method: 'get'
  })
}

export function delWareHouse(id) {
  return request({
    url: 'admin/warehouse_info/' + id,
    method: 'delete'
  })
}

export function WarehouseTypeEnumList(data) {
  return request({
    url: 'admin/common/product/enum/WarehouseTypeEnum',
    method: 'get',
    pamers: data
  })
}

