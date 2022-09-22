<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.enterpriseId" clearable filterable size="small" placeholder="选择企业名称搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in enterpriseList"
        :key="item.id"
        :label="item.enterpriseName"
        :value="item.id"
      />
    </el-select>
    <el-select
      v-model="query.status"
      clearable
      size="small"
      placeholder="状态"
      class="filter-item"
      @change="crud.toQuery"
    >
      <el-option
        v-for="item in settlementstatusList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-date-picker
      v-model="query.settlementStime"
      type="datetime"
      placeholder="结算周期起"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <el-date-picker
      v-model="query.settlementEtime"
      type="datetime"
      placeholder="结算周期止"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <rrOperation />
  </div>
</template>

<script>
    import { header } from '@crud/crud'
    import rrOperation from '@crud/RR.operation'
    import { getEnterpriseList } from '@/api/enterprise/enterpriseInfo'
    import { settlementStatusList } from '@/api/enterprise/enterpriseSettlement'

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
                enterpriseList: [],
                settlementstatusList: []
            }
        },
        created() {
            const datas = {
                status: 1
            }
            getEnterpriseList({}).then(res => {
                this.enterpriseList = res.data
            })
            settlementStatusList(datas).then(res => {
                this.settlementstatusList = res.data
            })
        }
    }
</script>
