import request from '@/utils/request'

export function getAllSaleItem(data, pageNo, pageSize) {
  return request({
    url: process.env.VUE_APP_salesStorage_API + `admin/sale_item/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
