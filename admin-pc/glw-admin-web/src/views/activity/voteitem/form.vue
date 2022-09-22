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
      <el-form-item label="活动列表" prop="voteId">
        <el-select v-model="form.voteId" placeholder="活动列表" style="width: 200px;" @change="voteIdchange">
          <el-option
            v-for="item in voteIdList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type===1" label="投票项目" prop="valueId">
        <el-select v-model="form.valueId" clearable filterable placeholder="投票项目" style="width: 200px;">
          <el-option
            v-for="item in merchantList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type===2" label="投票项目" prop="valueId">
        <el-select v-model="form.valueId" clearable filterable placeholder="投票项目" style="width: 200px;">
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="副主题" prop="subTitle">
        <el-input v-model="form.subTitle" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model="form.sortNo" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="项目描述" prop="desc">
        <el-input v-model="form.desc" maxlength="512" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="奖品图标" prop="icon" style="display: block">
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
import { getraffleactivityLists } from '@/api/activity/votetheme'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getproductLists } from '@/api/product/product'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  voteId: '',
  valueId: '',
  title: '',
  icon: '',
  subTitle: '',
  desc: '',
  sortNo: 1,
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      type: '',
      voteIdList: [],
      merchantList: [],
      productList: [],
      rules: {
        voteId: [
          {
            required: true,
            message: '请选择投票活动',
            trigger: 'blur'
          }
        ],
        valueId: [
          {
            required: true,
            message: '请选择投票项目',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入主题',
            trigger: 'blur'
          }
        ],
        subTitle: [
          {
            required: true,
            message: '请输入副主题',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            required: true,
            message: '请输入奖品图标',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入项目描述',
            trigger: 'blur'
          }
        ],
        sortNo: [
          {
            required: true,
            message: '请输入奖品排序',
            trigger: 'blur'
          }
        ]

      }
    }
  },
  watch: {
    'form.voteId': function(newQuestion, oldQuestion) {
      if (this.form.voteId !== '') {
        for (var i = 0; i < this.voteIdList.length; i++) {
          if (this.form.voteId === this.voteIdList[i].id) {
            this.type = this.voteIdList[i].type
          }
        }
      }
    },
    'type': function(newQuestion, oldQuestion) {
      if (this.type === 3) {
        this.form.valueId = 0
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getraffleactivityLists(data).then(res => {
      this.voteIdList = res.data
    })
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantList = res.data
    })
    getproductLists(datas).then(res => {
      this.productList = res.data
    })
  },
  methods: {
    voteIdchange(val) {
      this.form.valueId = ''
    },
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
