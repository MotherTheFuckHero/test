import request from '@/request/http'

export function newsList(data) {
  return request({
    url: '/web/news/page_list?pageNo=1&pageSize=1000',
    method: 'post',
    data
  })
}

export function getNews(id) {
  return request({
    url: '/web/news/'+ id,
    method: 'get',
  })
}
