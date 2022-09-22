import request from '@/utils/request'

export function getInventoryDetailList(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/warehouse_product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
