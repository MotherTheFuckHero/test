<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.id" clearable size="small" type="number" placeholder="输入商户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.name" clearable size="small" placeholder="输入商家名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.userId" clearable filterable remote size="small" placeholder="请输入用户名称搜索" class="filter-item" :remote-method="remoteMethod" @change="crud.toQuery">
      <template v-for="item in userIdList">
        <el-option
          v-if="item.nickName !==''"
          :key="item.id"
          :label="item.userName+'('+item.nickName+')'"
          :value="item.id"
        />
        <el-option
          v-else-if="item.nickName ===''"
          :key="item.id"
          :label="item.userName"
          :value="item.id"
        />
      </template>
    </el-select>
    <el-select v-model="query.cityId" clearable filterable size="small" placeholder="所在城市" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in cityIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.companyId" clearable filterable size="small" placeholder="所属公司" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyIdList"
        :key="item.id"
        :label="item.companyName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.bizType" clearable filterable size="small" placeholder="商户类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in bizTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.status" clearable filterable size="small" placeholder="商户状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in statusList"
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
import { companycityLists } from '@/api/system/city'
import { getcompanyLists } from '@/api/system/company'
import { merchanttypeLists, merchantstatusLists } from '@/api/merchant/merchant'
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
      cityIdList: [],
      companyIdList: [],
      bizTypeList: [],
      userIdList: [],
      statusList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    companycityLists(data).then(res => {
      this.cityIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    merchanttypeLists(data).then(res => {
      this.bizTypeList = res.data
    })
    merchantstatusLists(data).then(res => {
      this.statusList = res.data
    })
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
