import request from '@/request/http'

//ๅๅๅ่กจ
export function getproductpageList(merchantId,params) {
  return request({
    url: '/web/product/'+ merchantId+'/page_list',
    method: 'get',
    params
  })
}
