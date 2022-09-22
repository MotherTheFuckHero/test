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
      <el-form-item label="商户" prop="merchantId">
        <el-select v-model="form.merchantId" clearable style="width: 200px">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择用户" prop="userId">
        <el-select v-model="form.userId" clearable filterable remote placeholder="请输入用户昵称关键字搜索" :remote-method="remoteMethod"  style="width: 200px;">
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
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px">
          <el-option
            v-for="item in enterpriseTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="费用类型" prop="expensesType">
        <el-select v-model="form.expensesType" clearable style="width: 200px" @change="getExpenses">
          <el-option
            v-for="item in expensesTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="费用值" prop="expensesValue">
        <el-input v-model="form.expensesValue" :placeholder="changePlaceholder" :disabled="isDisabled" maxlength="32" style="width: 200px" />
      </el-form-item>
<!--      <el-form-item label="银行卡号" prop="bankCard">-->
<!--        <el-input v-model="form.bankCard" maxlength="32" style="width: 200px" />-->
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
import {  expensesTypeList } from '@/api/enterprise/enterpriseInfo'
import {  TypeEnumList } from '@/api/enterprise/enterpriseSales'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getuserinfoLists } from '@/api/user/userinfo'
const defaultForm = {
  id: null,
  merchantId: '',
  expensesType: '',
  expensesValue: '',
  income: 0,
  sale: 0,
  status: 1,
  type: '',
  userId: '',
  // bankCard: '',
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      changePlaceholder: '',
      isDisabled: false,
      merchantIdList: [],
      userIdList: [],
      expensesTypeList: [],
      enterpriseTypeList: [],
      rules: {
        merchantId: [{ required: true, message: '请选择商户', trigger: 'change' }],
        userId: [{ required: true, message: '请选择用户', trigger: 'change' }],
        expensesType: [{ required: true, message: '请选择费用类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择销售类型', trigger: 'change' }],
        expensesValue: [{ required: true, message: '请填写费用值', trigger: 'blur' }],
        // bankCard: [{ required: true, message: '请填写银行卡号', trigger: 'blur' }],
      }
    }
  },
  watch: {
    'form.userId': function(newQuestion, oldQuestion) {
      if (this.form.userId !== '') {
        const data = {
          id: this.form.userId,
          status: 1
        }
        getuserinfoLists(data).then(res => {
          this.userIdList = res.data
        })
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    expensesTypeList(data).then(res => {
      this.expensesTypeList = res.data
    })
    TypeEnumList(data).then(res => {
      this.enterpriseTypeList = res.data
    })
    getmerchantLists({status:3}).then(res => {
      this.merchantIdList = res.data
    })
  },
  methods: {
    remoteMethod(query) {
      const data = {
        nickName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
    },
    getExpenses(value) {
      if (value === 1) {
        this.form.expensesValue = ''
        this.changePlaceholder = '输入0-1，如：50%，输入0.5'
        this.isDisabled = false
      } else if (value === 2 || value === 3) {
        this.form.expensesValue = ''
        this.changePlaceholder = '请填写费用值'
        this.isDisabled = false
      } else {
        this.form.expensesValue = 0
        this.isDisabled = true
      }
    },
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
  .el-dialog__body{
    padding: 40px 20px !important;
  }
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
