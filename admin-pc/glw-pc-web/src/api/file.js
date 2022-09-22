import request from '@/request/http'

export function fileAdd(formData) {
  return request({
    url: 'web/file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传时的格式
    },
    data: formData
  })
}
