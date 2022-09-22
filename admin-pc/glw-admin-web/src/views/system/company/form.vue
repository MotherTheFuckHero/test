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
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="form.companyName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="公司昵称" prop="nickName">
        <el-input v-model="form.nickName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="公司编码" prop="companyCode">
        <el-input v-model="form.companyCode" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="公司手机号" prop="companyPhone">
        <el-input v-model="form.companyPhone" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input v-model="form.companyAddress" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="公司状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="公司状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公司类型" prop="companyType">
        <el-select v-model="form.companyType" clearable style="width: 200px;" placeholder="公司类型">
          <el-option
            v-for="item in companyTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在城市" prop="cityId">
        <el-select v-model="form.cityId" clearable filterable style="width: 200px;" placeholder="所在城市">
          <el-option
            v-for="item in parentIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公司Logo" prop="icon">
        <el-upload
          v-model="form.icon"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.icon"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="form.dialogVisible">
          <img width="100%" :src="form.dialogImageUrl" alt="">
        </el-dialog>
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
import { getcityLists } from '@/api/system/city'
import { companytypeLists } from '@/api/system/company'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  companyName: '',
  nickName: '',
  companyAddress: '',
  companyCode: '',
  companyType: '',
  cityId: '',
  companyPhone: '',
  status: '',
  icon: '',
  dialogImageUrl: '',
  dialogVisible: false,
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      companyTypeList: [],
      parentIdList: [],
      statusList: [
        {
          value: 1,
          name: '显示'
        },
        {
          value: 2,
          name: '隐藏'
        }
      ],
      rules: {
        companyName: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }
        ],
        nickName: [
          {
            required: true,
            message: '请输入公司昵称',
            trigger: 'blur'
          }
        ],
        companyAddress: [
          {
            required: true,
            message: '请输入公司地址',
            trigger: 'blur'
          }
        ],
        companyCode: [
          {
            required: true,
            message: '请输入公司编码',
            trigger: 'blur'
          },
          { pattern: /^[0-9a-zA-Z]+$/, message: '请输入正确的系统编码' }
        ],
        companyType: [
          {
            required: true,
            message: '请选择公司类型',
            trigger: 'blur'
          }
        ],
        cityId: [
          {
            required: true,
            message: '请选择所在城市',
            trigger: 'blur'
          }
        ],
        companyPhone: [
          {
            required: true,
            message: '请输入公司联系电话',
            trigger: 'blur'
          },
          { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的手机号' }
        ],
        status: [
          {
            required: true,
            message: '请选择公司状态',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    companytypeLists(data).then(res => {
      this.companyTypeList = res.data
    })
    getcityLists(data).then(res => {
      this.parentIdList = res.data
    })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.icon = res.data.key
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

