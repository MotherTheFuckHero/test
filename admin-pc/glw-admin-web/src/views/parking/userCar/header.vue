<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.carPlate" clearable size="small" placeholder="输入车牌号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.userId" clearable filterable remote size="small" placeholder="请输入用户名称搜索" class="filter-item" :remote-method="remoteMethod" @change="crud.toQuery">
      <el-option
        v-for="item in userIdList"
        :key="item.id"
        :label="item.userName+'('+item.nickName+')'"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getuserinfoLists } from '@/api/user/userinfo'
export default {
  components: { rrOperation },
  mixins: [header()],
  props: {
    permission: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userIdList: []
    }
  },
  created() {
    // const data = {
    //     id: this.form.userId,
    //     status: 1
    // }
    // getuserinfoLists(data).then(res => {
    //     this.userIdList = res.data
    // })
  },
  methods: {
    remoteMethod(query) {
      const data = {
        userName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
    }
  }
}
</script>
