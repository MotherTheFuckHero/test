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
        <el-select v-model="form.merchantId" style="width: 200px;" clearable filterable>
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="语言" prop="languageId">
        <el-select v-model="form.languageId" clearable style="width: 200px;" placeholder="语言">
          <el-option
            v-for="item in languageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="子标题" prop="subtitle">
        <el-input v-model="form.subtitle" maxlength="255" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="图片" prop="imgKey">
          <el-upload
            v-model="form.imgKey"
            action="/"
            :http-request="fileAdd"
            :limit="1"
            :file-list="form.fileimgKeyList"
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
      </div>
      <el-form-item label="内容" prop="content">
        <Editor v-model="form.content" />
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
import { getlanguageLists } from '@/api/system/language'
import { getmerchantLists } from '@/api/merchant/merchant'
import { sysfileAdds } from '@/api/upload'
import Editor from '../../Editor'
const defaultForm = {
  id: null,
  title: '',
  merchantId: '',
  languageId: '',
  subtitle: '',
  imgKey: '',
  content: '',
  status: 1,
  dialogImageUrl: '',
  dialogVisible: false,
  fileimgKeyList: []
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
      merchantIdList: [],
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
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        merchantId: [
          {
            required: true,
            message: '请选择商家',
            trigger: 'blur'
          }
        ],
        languageId: [
          {
            required: true,
            message: '请选择语言',
            trigger: 'blur'
          }
        ],
        imgKey: [
          {
            required: true,
            message: '请选择图片',
            trigger: 'blur'
          }
        ],
        subtitle: [
          {
            required: true,
            message: '请输入副标题',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
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
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileimgKeyList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileimgKeyList = fileList
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
          _this.form.fileimgKeyList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.imgKey = res.data.key
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
<style>
  .editor{
    width: 500px !important;
  }
</style>
