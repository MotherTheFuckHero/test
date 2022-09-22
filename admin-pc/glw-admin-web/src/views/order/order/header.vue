<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.id" clearable size="small" placeholder="输入订单编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.userId" clearable filterable remote size="small" placeholder="请输入用户昵称搜索" class="filter-item" :remote-method="remoteMethod" @change="crud.toQuery">
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
    <el-select v-model="query.merchantId" clearable filterable size="small" placeholder="商家" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.demolished" clearable size="small" placeholder="是否拆单" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in demolishedList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.orderType" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in ordertypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.orderStatus" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in orderstatusList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.printStatus" clearable size="small" placeholder="打印状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in printStatusList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span>开始时间:</span>
    <el-date-picker
      v-model="query.startCreatedTime"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      class="filter-item"
      style="width: 200px;"
    />
    <span>结束时间:</span>
    <el-date-picker
      v-model="query.endCreatedTime"
      type="datetime"
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
import { ordertypeLists, orderStatusLists } from '@/api/order/order'
import { getuserinfoLists } from '@/api/user/userinfo'
import { getmerchantLists } from '@/api/merchant/merchant'
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
      ordertypeList: [],
      orderstatusList: [],
      merchantIdList: [],
      userIdList: [],
      demolishedList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      printStatusList: [
        {
          value: 1,
          label: '未打印'
        },
        {
          value: 2,
          label: '已打印'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1
    }
    ordertypeLists(data).then(res => {
      this.ordertypeList = res.data
    })
    orderStatusLists(data).then(res => {
      this.orderstatusList = res.data
    })
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  },
  methods:{
      remoteMethod(query) {
          console.log(query)
          const data = {
              nickName: query,
              status: 1
          }
          getuserinfoLists(data).then(res => {
              this.userIdList = res.data
          })
      },
  }
}
</script>
