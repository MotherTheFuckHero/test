<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="750px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="135px">
      <el-form-item label="商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable placeholder="商家" style="width: 200px;" @change="merchantchange">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品" prop="productId">
        <el-select v-model="form.productId" clearable filterable placeholder="商品" style="width: 200px;" @change="productchange">
          <el-option
            v-for="item in productIdList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="specId">
        <el-select v-model="form.specId" clearable filterable placeholder="规格" style="width: 200px;">
          <el-option
            v-for="item in specIdList"
            :key="item.id"
            :label="item.productSpecs"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="场次" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;">
          <el-option
            v-for="item in TypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="秒杀价格(￥)" prop="secKillPrice">
        <el-input v-model="form.secKillPrice" onkeyup="value=value.replace(/[^0-9.]/ig,'')" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="秒杀日期" prop="secKillTime">
        <el-date-picker
          v-model="form.secKillTime"
          style="width: 200px;"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="单次限购数量" prop="timesLimitNum">
        <el-input v-model="form.timesLimitNum" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品秒杀数量" prop="secKillNum">
        <el-input v-model="form.secKillNum" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" onkeyup="value=value.replace(/[^0-9]/ig,'')" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="活动图标" prop="imgKey" style="display: block">
        <el-upload
          v-model="form.imgKey"
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
import { getmerchantLists } from '@/api/merchant/merchant'
import { getproductLists, getmultiSpec } from '@/api/product/product'
import { sysfileAdds } from '@/api/upload'
import { getseckillType } from '@/api/activity/seckill'
const defaultForm = {
  id: null,
  productId: '',
  merchantId: '',
  specId: '',
  secKillPrice: '',
  imgKey: '',
  secKillTime: '',
  status: 1,
  type: '',
  sort: 100,
  dayLimitNum: 1,
  timesLimitNum: 1,
  secKillNum: 100,
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      merchantIdList: [],
      productIdList: [],
      specIdList: [],
      TypeList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
        }
      },
      rules: {
        productId: [
          { required: true, message: '请选择秒杀商品', trigger: 'blur' }
        ],
        merchantId: [
          { required: true, message: '请选择秒杀商家', trigger: 'blur' }
        ],
        specId: [
          { required: true, message: '请选择商品规格', trigger: 'blur' }
        ],
        secKillPrice: [
          { required: true, message: '请输入商品秒杀价格', trigger: 'blur' }
        ],
        imgKey: [
          { required: true, message: '请选择秒杀活动图片', trigger: 'blur' }
        ],
        secKillTime: [
          { required: true, message: '请选择秒杀开始时间', trigger: 'blur' }
        ],
        timesLimitNum: [
          { required: true, message: '请输入商品单次限购数量', trigger: 'blur' }
        ],
        secKillNum: [
          { required: true, message: '请输入商品秒杀数量', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择活动场次', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.merchantId': function(newQuestion, oldQuestion) {
      if (this.form.merchantId !== '') {
        const data = {
          merchantId: this.form.merchantId,
          status: 3
        }
        getproductLists(data).then(res => {
          this.productIdList = res.data
        })
      }
    },
    'form.productId': function(newQuestion, oldQuestion) {
      if (this.form.productId !== '') {
        const data = this.form.productId
        getmultiSpec(data).then(res => {
          this.specIdList = res.data
        })
      }
    }
  },
  created() {
    const data = {
      status: 3
    }
    getmerchantLists(data).then(res => {
      this.merchantIdList = res.data
    })
    getseckillType(data).then(res => {
      this.TypeList = res.data
    })
  },
  methods: {
    merchantchange() {
      this.form.productId = ''
      this.form.specId = ''
    },
    productchange() {
      this.form.specId = ''
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
