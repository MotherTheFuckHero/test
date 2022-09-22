import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const resources = store.getters && store.getters.resources
    if (value && value instanceof Array && value.length > 0) {
      const permissionCodes = value
      if (resources.isSuperAdmin) {
        return true
      }
      const hasPermission = resources.sysResourceList.some(resource => {
        return permissionCodes.includes(resource.resourceCode)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`)
    }
  }
}
