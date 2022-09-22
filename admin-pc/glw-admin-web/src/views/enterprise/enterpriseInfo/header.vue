<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.enterpriseId" clearable filterable size="small" placeholder="选择企业搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in enterpriseIdList"
        :key="item.id"
        :label="item.enterpriseName"
        :value="item.id"
      />
    </el-select>
    <el-input v-model="query.userId" clearable size="small" placeholder="输入用户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.wechatNum" clearable size="small" placeholder="输入微信号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getEnterpriseList } from '@/api/enterprise/enterpriseInfo'
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
            enterpriseIdList: []
        }
    },
    created() {
        const data = {
        }
        getEnterpriseList({}).then(res => {
            this.enterpriseIdList = res.data
        })
    },
}
</script>
