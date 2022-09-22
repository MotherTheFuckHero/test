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
      <el-form-item label="所属商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 502px;" @change="merchantchange">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户等级" prop="userGradeId">
        <el-select v-model="form.userGradeId" clearable style="width: 200px;">
          <el-option
            v-for="item in userGradeIdLists"
            :key="item.id"
            :label="item.gradeName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择用户" prop="userId">
        <el-select v-model="form.userId" clearable filterable remote placeholder="请输入用户昵称关键字搜索" :remote-method="remoteMethod" style="width: 200px;">
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
import { getuserGradeLists } from '@/api/user/userGrade'
import { getuserinfoLists } from '@/api/user/userinfo'
const defaultForm = {
  id: null,
  userGradeId: '',
  merchantId: '',
  userId: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchantIdList: [],
      userGradeIdLists: [],
      userIdList: [],
      rules: {
        merchantId: [
          {
            required: true,
            message: '请选择等级所属',
            trigger: 'blur'
          }
        ],
        userGradeId: [
          {
            required: true,
            message: '请选择商家用户等级',
            trigger: 'blur'
          }
        ],
        userId: [
          {
            required: true,
            message: '请选择用户',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    'form.merchantId': function(newQuestion, oldQuestion) {
      if (this.form.merchantId !== '') {
        const data = {
          merchantId: this.form.merchantId
        }
        getuserGradeLists(data).then(res => {
          this.userGradeIdLists = res.data
        })
      }
    },
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
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  },
  methods: {
    merchantchange() {
      this.form.userGradeId = ''
    },
    remoteMethod(query) {
      const data = {
        nickName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
    }
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
