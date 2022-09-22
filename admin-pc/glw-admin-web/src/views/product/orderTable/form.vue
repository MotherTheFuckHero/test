<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="700px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
      <el-form-item label="餐桌名称" prop="tableName">
        <el-input v-model="form.tableName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable style="width: 200px;">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="桌号" prop="tableNo">
        <el-input v-model="form.tableNo" type="number" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="订桌价" prop="tablePrice">
        <el-input v-model.number="form.tablePrice" type="number" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="使用人数" prop="peopleCount">
        <el-input v-model.number="form.peopleCount" type="number" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="楼层" prop="tier">
        <el-input v-model.number="form.tier" type="number" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="是否包间" prop="room">
        <el-radio-group v-model="form.room" style="width: 200px;">
          <el-radio class="radio" :label="false">否</el-radio>
          <el-radio class="radio" :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有卡拉OK" prop="karaoke">
        <el-radio-group v-model="form.karaoke" style="width: 200px;">
          <el-radio class="radio" :label="false">否</el-radio>
          <el-radio class="radio" :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有卫生间" prop="lavatory">
        <el-radio-group v-model="form.lavatory" style="width: 200px;">
          <el-radio class="radio" :label="false">否</el-radio>
          <el-radio class="radio" :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有沙发" prop="sofa">
        <el-radio-group v-model="form.sofa" style="width: 200px;">
          <el-radio class="radio" :label="false">否</el-radio>
          <el-radio class="radio" :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有电视" prop="television">
        <el-radio-group v-model="form.television" style="width: 200px;">
          <el-radio class="radio" :label="false">否</el-radio>
          <el-radio class="radio" :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有空调" prop="airConditioner">
        <el-radio-group v-model="form.airConditioner" style="width: 200px;">
          <el-radio class="radio" :label="false">否</el-radio>
          <el-radio class="radio" :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有wifi" prop="wifi">
        <el-radio-group v-model="form.wifi" style="width: 200px;">
          <el-radio class="radio" :label="false">否</el-radio>
          <el-radio class="radio" :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="桌子图片" prop="tableImg" style="display: block">
        <el-upload
          v-model="form.tableImg"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
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
import { sysfileAdds } from '@/api/upload'
import { getmerchantLists } from '@/api/merchant/merchant'
const defaultForm = {
  id: null,
  merchantId: '',
  tableNo: '',
  tableName: '',
  tablePrice: '',
  peopleCount: '',
  tier: '',
  room: true,
  karaoke: true,
  lavatory: true,
  sofa: true,
  television: true,
  airConditioner: true,
  wifi: true,
  tableImg: '',
  fileList: []
}

export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchantIdList: [],
      rules: {
        tableName: [
          {
            required: true,
            message: '请输入桌名',
            trigger: 'blur'
          }
        ],
        tableNo: [
          {
            required: true,
            message: '请输入桌号',
            trigger: 'blur'
          }
        ],
        tablePrice: [
          {
            required: true,
            message: '请输入订桌价',
            trigger: 'blur'
          }
        ],
        peopleCount: [
          {
            required: true,
            message: '请输入使用人数',
            trigger: 'blur'
          }
        ],
        tier: [
          {
            required: true,
            message: '请输入楼层',
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
        tableImg: [
          {
            required: true,
            message: '请上传桌子图片',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const datas = {
      status: 3,
      bizType: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
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
          _this.form.tableImg = res.data.key
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
