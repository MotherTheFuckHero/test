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
        <el-select v-model="form.merchantId" clearable filterable placeholder="选择商家" style="width: 200px;">
          <el-option
            v-for="item in merchantList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导览名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="缩放比例" prop="scaling">
        <el-input v-model="form.scaling" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="是否多层" prop="multiStorey">
        <el-radio-group v-model="form.multiStorey" style="width:200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否室内" prop="indoor">
        <el-radio-group v-model="form.indoor" style="width:200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.indoor" label="背景色" prop="guideBgColor">
        <el-input v-model="form.guideBgColor" placeholder="如red,#BFEE9D" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="介绍" prop="introduction">
        <el-input v-model="form.introduction" maxlength="512" type="textarea" style="width: 505px" />
      </el-form-item>
      <el-form-item label="导览图" prop="guideImgKey">
        <el-upload
          v-model="form.guideImgKey"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.guideImgKey"
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
import { getmerchantLists } from '@/api/merchant/merchant'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  merchantId: '',
  name: '',
  guideImgKey: '',
  scaling: '',
  indoor: '',
  multiStorey: '',
  introduction: '',
  guideBgColor: '',
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchantList: [],
      rules: {
        merchantId: [
          {
            required: true,
            message: '请选择导览商家',
            trigger: 'blur'
          }
        ],
        introduction: [
          {
            required: true,
            message: '请输入导览介绍',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入导览名称',
            trigger: 'blur'
          }
        ],
        scaling: [
          {
            required: true,
            message: '请输入缩放比例',
            trigger: 'blur'
          }
        ],
        guideImgKey: [
          {
            required: true,
            message: '请选择导览图',
            trigger: 'blur'
          }
        ],
        indoor: [
          {
            required: true,
            message: '请选择是否室内',
            trigger: 'blur'
          }
        ],
        multiStorey: [
          {
            required: true,
            message: '请选择是否多层',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
      // status: 3,
      // bizType: 2
    }
    getmerchantLists(data).then(res => {
      this.merchantList = res.data
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
          _this.form.guideImgKey = res.data.key
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
