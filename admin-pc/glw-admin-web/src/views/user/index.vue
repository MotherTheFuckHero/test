<template>
  <elFrame :src="userInfoSrc" />
</template>
<script>
import { mapGetters } from 'vuex'
import elFrame from '@/components/Iframe/index'
import Config from '@/settings'
import { randomString } from '../../utils/sso'
export default {
  name: 'UserIndex',
  components: { elFrame },
  data() {
    return {
      userInfoSrc: {}
    }
  },
  computed: {
    ...mapGetters([
      'ssoApi'
    ])
  },

  created() {
    this.init()
  },
  methods: {
    init(to) {
      var redirectUri = encodeURIComponent(location.origin + (to ? to.fullPath : '/'))
      this.userInfoSrc = process.env.VUE_APP_SSO_API + '/user_info?' + [
        'redirectUrl=' + redirectUri,
        'state=' + randomString(8),
        'clientId=' + Config.clientId,
        'systemId=' + Config.systemId,
        'userType=' + Config.userType,
        'loginType=' + Config.loginType
      ].join('&')
    }
  }
}
</script>
