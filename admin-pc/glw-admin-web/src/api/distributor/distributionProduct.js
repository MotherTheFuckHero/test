import request from '@/utils/request'

export function getProduct(pageNo, pageSize, data) {
  return request({
    url: `admin/product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function addDistribution(data) {
  return request({
    url: 'admin/order_distribution_policy',
    method: 'post',
    data
  })
}

export function getDistributionProductList(pageNo, pageSize, data) {
  return request({
    url: `admin/order_distribution_product/page_list?pageNo=${pageNo}&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}

export function selectDistribution(data) {
  return request({
    url: 'admin/order_distribution_product',
    method: 'post',
    data
  })
}
