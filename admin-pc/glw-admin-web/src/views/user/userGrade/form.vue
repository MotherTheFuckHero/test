<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
      <el-form-item label="等级所属" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 512px;">
          <el-option :value="1" label="过来玩系统" />
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="等级名称" prop="gradeName">
        <el-input v-model="form.gradeName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="折扣比例" prop="discount">
        <el-input v-model="form.discount" type="number" placeholder="如0.8为8折，1为不打折" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="最低下单金额" prop="startingPrice">
        <el-input v-model="form.startingPrice" type="number" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="加价率" prop="risingRate">
        <el-input v-model="form.risingRate" type="number" placeholder="1为不加价, 1.5为1.5倍" style="width: 200px;" />
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
// import CRUD from '@crud/crud'
const defaultForm = {
  id: null,
  gradeName: '',
  merchantId: '',
  startingPrice: '',
  risingRate: '',
  discount: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchantIdList: [],
      rules: {
        merchantId: [
          {
            required: true,
            message: '请选择等级所属',
            trigger: 'blur'
          }
        ],
        gradeName: [
          {
            required: true,
            message: '请输入等级名称',
            trigger: 'blur'
          }
        ],
        discount: [
          {
            required: true,
            message: '请输入折扣比例',
            trigger: 'blur'
          }
        ],
        startingPrice: [
          {
            required: true,
            message: '请输入最低下单金额',
            trigger: 'blur'
          }
        ],
        risingRate: [
          {
            required: true,
            message: '请输入加价率',
            trigger: 'blur'
          }
        ]
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
    // // 新增与编辑提交前做的操作
    // [CRUD.HOOK.beforeSubmit](crud, form) {
    //     if(crud.form.merchantId===''){
    //         crud.form.merchantId=1
    //     }
    // },
    // // 新增与编辑打开前做的操作
    // [CRUD.HOOK.beforeToCU](crud, form) {
    //     if(form.merchantId===1){
    //         form.merchantId=''
    //     }
    // }
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
