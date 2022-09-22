<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.enterpriseUserId" clearable filterable size="small" placeholder="选择审核人搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in enterpriseAllUser"
        :key="item.id"
        :label="item.userName+'(企业名称：'+item.enterpriseName+')'"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.enterpriseId" clearable filterable size="small" placeholder="选择企业名称搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in enterpriseList"
        :key="item.id"
        :label="item.enterpriseName"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getAllEnterpriseUser, getEnterpriseList } from '@/api/enterprise/enterpriseInfo'
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
        enterpriseAllUser: [],
        enterpriseList: [],
    }
  },
  created() {
      const data = {
          type: 2
      }
      getAllEnterpriseUser(data).then(res => {
          this.enterpriseAllUser = res.data.resultList
      })
      getEnterpriseList({}).then(res => {
          this.enterpriseList = res.data
      })
  }
}
</script>
