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
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="form.userName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="form.nickName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" maxlength="11" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" maxlength="50" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="用户类型" prop="userTypeList">
        <el-select v-model="form.userTypeList" multiple clearable style="width: 505px;">
          <el-option
            v-for="item in userTypeLists"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex" style="width: 200px;">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" style="width: 200px;">
          <el-radio class="radio" :label="1">正常</el-radio>
          <el-radio class="radio" :label="2">禁止登录</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="用户头像" prop="headImg">
        <el-upload
          v-model="form.headImg"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileheadImgList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.icon"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
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
import { usertypeLists } from '@/api/user/userinfo'
import { sysfileAdd } from '@/api/upload'
const defaultForm = {
  id: null,
  userName: '',
  nickName: '',
  realName: '',
  source: 4,
  sex: '',
  email: '',
  phone: '',
  userTypeList: [],
  status: 1,
  headImg: '',
  userGradeId: 1000,
  fileheadImgList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      userTypeLists: [],
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          },
          { pattern: /^[0-9a-zA-Z]+$/, message: '请输入符合规范的用户名称' }
        ],
        nickName: [
          {
            required: true,
            message: '请输入用户昵称',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择用户性别',
            trigger: 'blur'
          }
        ],
        userTypeList: [
          {
            required: true,
            message: '请选择用户类型',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ],
        phone: [
          { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的手机号' }
        ],
        email: [
          { pattern: /^[A-Za-z0-9.\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    usertypeLists(data).then(res => {
      this.userTypeLists = res.data
    })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileheadImgList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileheadImgList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdd(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileheadImgList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.headImg = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
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
