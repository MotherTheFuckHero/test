import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const resources = store.getters && store.getters.resources
    const permissionCodes = value
    if (resources.isSuperAdmin) {
      return true
    }
    const hasPermission = resources.sysResourceList.some(resource => {
      return permissionCodes.includes(resource.resourceCode)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
