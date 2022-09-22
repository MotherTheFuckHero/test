<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >

    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 450px;" placeholder="商家">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="社区" prop="communityIds">
        <el-select v-model="form.communityIds" clearable filterable multiple style="width: 450px;" placeholder="社区">
          <el-option
            v-for="item in communityIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getcommunityLists } from '@/api/groupon/community'
const defaultForm = {
  id: null,
  merchantId: '',
  communityIds: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchantIdList: [],
      communityIdList: [],
      rules: {
        merchantId: [
          { required: true, message: '请选择商家', trigger: 'blur' }
        ],
        communityIds: [
          { required: true, message: '请选择社区', trigger: 'blur' }
        ]
      }
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
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-form-item{
    display: inline-block;
  }
</style>
<style>
  .mymap {
    width: 100%;
    height: 500px;
  }
  .amap-sug-result {
    z-index: 4000!important;
  }
  #tangram-suggestion--TANGRAM__u-main{
    z-index: 3000!important;
  }
</style>
