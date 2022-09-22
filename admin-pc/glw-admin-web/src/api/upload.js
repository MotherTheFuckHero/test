import request from '@/utils/request'

/* 私有*/
export function sysfileAdds(formData) {
  return request({
    url: 'admin/file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传时的格式
    },
    data: formData
  })
}
/* 公共*/
export function sysfileAdd(formData) {
  return request({
    url: 'admin/file/public',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传时的格式
    },
    data: formData
  })
}

/* 富文本上传*/
export function sysfileAddtext(formData) {
  return request({
    url: 'admin/file/public/rich_text',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传时的格式
    },
    data: formData
  })
}
/* 获取推广*/
export function getspread(type) {
  return request({
    url: 'admin/app_spread/' + type,
    method: 'get'
  })
}
