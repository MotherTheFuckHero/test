import request from '@/request/http'

//商品列表
export function getproductpageList(merchantId,params) {
  return request({
    url: '/web/product/'+ merchantId+'/page_list',
    method: 'get',
    params
  })
}
