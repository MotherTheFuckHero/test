<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.userId" clearable size="small" placeholder="输入用户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.addressType" clearable size="small" placeholder="地址类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in addressTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { usersaddresstypeList } from '@/api/user/userinfo'
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
      addressTypeList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    usersaddresstypeList(data).then(res => {
      this.addressTypeList = res.data
    })
  }
}
</script>
