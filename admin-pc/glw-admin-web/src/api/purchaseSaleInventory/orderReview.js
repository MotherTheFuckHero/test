import request from '@/utils/request'

export function getOrderReview(pageNo, pageSize, data) {
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

export function getShopReviewImg(data) {
  return request({
    url: 'admin/stock_pay/list',
    method: 'post',
    data
  })
}

export function putShopReviewImg(data) {
  return request({
    url: 'admin/stock_pay',
    method: 'post',
    data
  })
}
