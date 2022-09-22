import request from '@/utils/request-sso'
import md5 from 'js-md5'

export function add(data) {
  return request({
    url: 'api/users',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/users',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/users',
    method: 'put',
    data
  })
}

export function editUser(data) {
  return request({
    url: 'api/user_info',
    method: 'put',
    data
  })
}

export function updatePass(user) {
  const data = {
    oldPassword: md5(user.oldPass),
    newPassword: md5(user.newPass)
  }
  return request({
    url: 'api/user_info/password',
    method: 'put',
    data
  })
}

export function sentEmailCaptcha(data) {
  return request({
    url: 'api/user_info/email_captcha/' + data,
    method: 'post'
  })
}

export function updateEmail(form) {
  const data = {
    email: form.email,
    smsCode: form.code,
    smsUuid: form.uuid
  }
  return request({
    url: 'api/user_info/email',
    method: 'put',
    data
  })
}

export function updatePhone(form) {
  const data = {
    phone: form.phone,
    smsCode: form.smsCode,
    smsUuid: form.smsUuid
  }
  return request({
    url: 'api/user_info/phone',
    method: 'put',
    data
  })
}

export function deletePhone(form) {
  const data = {
    phone: form.phone,
    smsCode: form.smsCode,
    smsUuid: form.smsUuid
  }
  return request({
    url: 'api/user_info/phone',
    method: 'delete',
    data
  })
}

export function updateUnionid(form) {
  return request({
    url: 'api/user_info/unionid/' + form.code,
    method: 'put'
  })
}

export function deleteUnionid(form) {
  return request({
    url: 'api/user_info/unionid/' + form.code,
    method: 'delete'
  })
}

export default { add, edit, del }

