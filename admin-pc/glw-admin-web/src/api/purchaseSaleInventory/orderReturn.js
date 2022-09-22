import request from '@/utils/request'

export function getOrderReturn(pageNo, pageSize, data) {
  return request({
    url: `admin/stock_info/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function getShopReviewDetail(pageNo, pageSize, data) {
  return request({
    url: `admin/stock_product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function editShopReview(id, status) {
  return request({
    url: 'admin/stock_info/' + id + '/' + status,
    method: 'put'
  })
}

export function delShopReview(id) {
  return request({
    url: 'admin/stock_info/' + id,
    method: 'delete'
  })
}

export function exportList(data) {
  return request({
    url: 'admin/stock_info/export',
    method: 'post',
    responseType: 'blob',
    data
  })
}
