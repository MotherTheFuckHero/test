import request from '@/utils/request'

export function get() {
  return request({
    url: 'admin/home/dashboard',
    method: 'get'
  })
}
