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
      <el-form-item label="关联商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 200px;" placeholder="关联商家">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="打印机名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="打印机编号" prop="number">
        <el-input v-model="form.number" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="易联云编号" prop="machineCode">
        <el-input v-model="form.machineCode" maxlength="32" style="width:200px;" />
      </el-form-item>
      <!--      <el-form-item label="令牌编号" prop="clientId">-->
      <!--        <el-input v-model="form.clientId" type="number" maxlength="32" style="width:200px;" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="应用私钥" prop="clientSecret">-->
      <!--        <el-input v-model="form.clientSecret" maxlength="32" style="width:200px;" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="token" prop="accessToken">-->
      <!--        <el-input v-model="form.accessToken" maxlength="32" style="width:505px;" />-->
      <!--      </el-form-item>-->
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
const defaultForm = {
  id: null,
  name: '',
  merchantId: '',
  machineCode: '',
  // clientId: '',
  // clientSecret: '',
  // accessToken: '',
  number: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchantIdList: [],
      rules: {
        name: [
          { required: true, message: '请输入打印机名称', trigger: 'blur' }
        ],
        merchantId: [
          { required: true, message: '请选择管理商家', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入打印机编号', trigger: 'blur' }
        ],
        machineCode: [
          { required: true, message: '请输入易联云商户编号', trigger: 'blur' }
        ]
        // clientId: [
        //   { required: true, message: '请输入令牌编号', trigger: 'blur' }
        // ],
        // clientSecret: [
        //   { required: true, message: '请输入应用私钥', trigger: 'blur' }
        // ],
        // accessToken: [
        //   { required: true, message: '请输入打印机token', trigger: 'blur' }
        // ]
      }
    }
  },
  created() {
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
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
