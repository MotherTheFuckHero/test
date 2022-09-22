import request from '@/utils/request-sso'
import qs from 'qs'
import Config from '@/settings'

export function getMenusTree(pid) {
  return request({
    url: 'api/menus/lazy?pid=' + pid,
    method: 'get'
  })
}

export function getMenus() {
  const params = {
    systemId: Config.systemId
  }
  return request({
    url: 'api/menus',
    method: 'get',
    params
  })
}

export function getMenuSuperior(ids) {
  const params = {
    ids: ids
  }
  return request({
    url: 'api/menus/superior?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export function buildMenus() {
  const params = {
    systemId: Config.systemId
  }
  return request({
    url: 'api/menus/build',
    method: 'get',
    params
  })
}

export function getPermissions() {
  const params = {
    systemId: Config.systemId
  }
  return request({
    url: 'api/permission',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/menus',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/menus',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/menus',
    method: 'put',
    data
  })
}

export default { add, edit, del, getMenusTree, getMenuSuperior, getMenus }
