<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.roleName" clearable size="small" placeholder="输入角色名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.roleCode" clearable size="small" placeholder="输入角色编码搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.roleType" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in roleTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in systemIdList"
        :key="item.id"
        :label="item.systemName"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getsystemLists } from '@/api/system/sys'
import { roletypeLists } from '@/api/user/sysrole'
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
      roleTypeList: [],
      systemIdList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    roletypeLists(data).then(res => {
      this.roleTypeList = res.data
    })
  }
}
</script>
