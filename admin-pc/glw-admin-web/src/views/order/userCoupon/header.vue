<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.couponId" clearable size="small" placeholder="优惠券" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in couponIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in CouponList"
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
import { CouponStatusLists } from '@/api/order/order'
import { getcouponLists } from '@/api/order/coupon'
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
      CouponList: [],
      couponIdList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    const datas = {
    }
    CouponStatusLists(data).then(res => {
      this.CouponList = res.data
    })
    getcouponLists(datas).then(res => {
      this.couponIdList = res.data
    })
  }
}
</script>
