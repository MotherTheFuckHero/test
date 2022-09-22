<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.merchantId" clearable size="small" filterable placeholder="商家" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.communityId" clearable size="small" filterable placeholder="社区" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in communityIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getcommunityLists } from '@/api/groupon/community'
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
      merchantIdList: [],
      communityIdList: []
    }
  },
  created() {
    const data = {
      status: 3
    }
    getmerchantLists(data).then(res => {
      this.merchantIdList = res.data
    })
    const datas = {
      status: 1
    }
    getcommunityLists(datas).then(res => {
      this.communityIdList = res.data
    })
  }
}
</script>
