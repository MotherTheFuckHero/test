import request from '@/utils/request'

export function fileAdd(formData) {
  return request({
    url: 'api/file',
    method: 'post',
    type: 'multipart/form-data',
    formData
  })
}
