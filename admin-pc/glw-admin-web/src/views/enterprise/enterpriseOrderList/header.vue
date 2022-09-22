<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.userId" clearable filterable size="small" placeholder="选择用户搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in enterpriseAllUser"
        :key="item.userId"
        :label="item.userName+'(企业名称：'+item.enterpriseName+')'"
        :value="item.userId"
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
    <el-select v-model="query.merchantId" clearable filterable size="small" placeholder="选择商家名称搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.orderStatus" clearable filterable size="small" placeholder="选择审核状态搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in orderStatusList"
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
    import { getEnterpriseList, getAllEnterpriseUser } from '@/api/enterprise/enterpriseInfo'
    import { getmerchantLists } from '@/api/merchant/merchant'
    import { settlementStatusList } from '@/api/enterprise/enterpriseOrderList'
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
                merchantIdList: [],
                orderStatusList: []
            }
        },
        created() {
            const data1 = {
                type: 2
            }
            getAllEnterpriseUser(data1).then(res => {
                this.enterpriseAllUser = res.data.resultList
            })
            getEnterpriseList({}).then(res => {
                this.enterpriseList = res.data
            })
            const datas = {
                status: 3
            }
            getmerchantLists(datas).then(res => {
                this.merchantIdList = res.data
            })
            const data = {
                status: 1
            }
            settlementStatusList(data).then(res => {
                this.orderStatusList = res.data
            })
        }
    }
</script>
