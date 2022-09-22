<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.userName" clearable size="small" placeholder="输入用户名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.nickName" clearable size="small" placeholder="输入用户昵称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.phone" clearable size="small" placeholder="输入手机号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.userType" clearable size="small" placeholder="用户类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in userTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.source" clearable size="small" placeholder="用户来源" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in sourceList"
        :key="item.dataCode"
        :label="item.dataDesc"
        :value="item.dataCode"
      />
    </el-select>
    <el-input v-model="query.unionId" clearable size="unionId" placeholder="unionId" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { usertypeLists, sourceLists } from '@/api/user/userinfo'
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
      userTypeList: [],
      sourceList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    usertypeLists(data).then(res => {
      this.userTypeList = res.data
    })
    sourceLists(data).then(res => {
      this.sourceList = res.data
    })
  }
}
</script>
