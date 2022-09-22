<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="650px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input v-model="form.supplierName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商家" prop="merchantId">
        <el-select
          v-model="form.merchantId"
          clearable
          filterable
          style="width: 200px;"
        >
          <el-option
            v-for="item in MerchantList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="supplierTel">
        <el-input v-model="form.supplierTel" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="营业执照号" prop="licenseNo">
        <el-input v-model="form.licenseNo" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="供货商地址" prop="addressInfo">
        <el-input v-model="form.addressInfo" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="合作状态 " prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="合作状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
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
const defaultForm = {
  supplierName: '',
  supplierTel: '',
  licenseNo: '',
  addressInfo: '',
  merchantId: '',
  status: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      MerchantList: [],
      statusList: [
        {
          value: 0,
          name: '正常'
        },
        {
          value: 1,
          name: '终止'
        }
      ],
      rules: {
        supplierName: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        supplierTel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        licenseNo: [{ required: true, message: '请输入营业执照号', trigger: 'blur' }],
        addressInfo: [{ required: true, message: '请输入供应商地址', trigger: 'blur' }],
        status: [{ required: true, message: '请选择合作状态', trigger: 'change' }],
        merchantId: [{ required: true, message: '请选择商家', trigger: 'change' }]
      }
    }
  },
  created() {
    const data = {
      status: 3
    }
    getmerchantLists(data).then(res => {
      this.MerchantList = res.data
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
