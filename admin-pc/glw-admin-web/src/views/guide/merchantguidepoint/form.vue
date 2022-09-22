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
      <el-form-item label="导览图" prop="guideId">
        <el-select v-model="form.guideId" clearable filterable placeholder="选择导览图" style="width: 200px;">
          <el-option
            v-for="item in guideIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规模" prop="scaleType">
        <el-select v-model="form.scaleType" clearable filterable placeholder="选择规模" style="width: 200px;">
          <el-option
            v-for="item in scaleTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导览点名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <el-input v-model="form.floor" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="坐标经度" prop="pointLongitude">
        <el-input v-model="form.pointLongitude" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="坐标纬度" prop="pointLatitude">
        <el-input v-model="form.pointLatitude" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="中坐标经度" prop="imgLongitude">
        <el-input v-model="form.imgLongitude" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="中坐标纬度" prop="imgLatitude">
        <el-input v-model="form.imgLatitude" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="讲解范围" prop="scope">
        <el-input v-model="form.scope" type="number" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="是否入口" prop="entrance">
        <el-radio-group v-model="form.entrance" style="width:200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否讲解" prop="explain">
        <el-radio-group v-model="form.explain" style="width:200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="介绍" prop="introduction">
        <el-input v-model="form.introduction" maxlength="10000" type="textarea" style="width: 505px" />
      </el-form-item>
      <el-form-item label="导览点图" prop="pointImgKey">
        <el-upload
          v-model="form.pointImgKey"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.pointImgKey"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="下一导览点" prop="nextPoint">
        <el-select v-model="form.nextPoint" clearable filterable placeholder="选择下一导览点" style="width: 200px;">
          <el-option
            v-for="item in guidePointList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
import { scaleTypeLists, getmerchantguidepointLists } from '@/api/guide/merchantguidepoint'
import { getmerchantguideLists } from '@/api/guide/merchantguide'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  guideId: '',
  name: '',
  pointImgKey: '',
  pointLongitude: '',
  pointLatitude: '',
  imgLongitude: '',
  imgLatitude: '',
  scaleType: '',
  entrance: '',
  floor: '',
  explain: '',
  scope: '',
  introduction: '',
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      guideIdList: [],
      scaleTypeList: [],
      guidePointList: [],
      rules: {
        guideId: [
          {
            required: true,
            message: '请选择导览图',
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
            message: '请输入导览点名称',
            trigger: 'blur'
          }
        ],
        scaleType: [
          {
            required: true,
            message: '请选择规模',
            trigger: 'blur'
          }
        ],
        entrance: [
          {
            required: true,
            message: '请选择是否是入口',
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
        explain: [
          {
            required: true,
            message: '请选择是否讲解',
            trigger: 'blur'
          }
        ],
        floor: [
          {
            required: true,
            message: '请输入楼层',
            trigger: 'blur'
          }
        ],
        pointLongitude: [
          {
            required: true,
            message: '请输入坐标经度',
            trigger: 'blur'
          }
        ],
        pointLatitude: [
          {
            required: true,
            message: '请输入坐标纬度',
            trigger: 'blur'
          }
        ],
        scope: [
          {
            required: true,
            message: '请输入讲解范围',
            trigger: 'blur'
          }
        ],
        pointImgKey: [
          {
            required: true,
            message: '请选择导览点图片',
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
    getmerchantguideLists(data).then(res => {
      this.guideIdList = res.data
    })
    scaleTypeLists(data).then(res => {
      this.scaleTypeList = res.data
    })
    getmerchantguidepointLists(data).then(res => {
      this.guidePointList = res.data
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
          _this.form.pointImgKey = res.data.key
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
