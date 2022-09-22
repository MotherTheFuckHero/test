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
      <el-form-item label="所属板块" prop="panelId">
        <el-select v-model="form.panelId" clearable style="width: 200px;" placeholder="所属板块">
          <el-option
            v-for="item in panelList"
            :key="item.id"
            :label="item.name+'('+item.companyName+')'"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="板块位置" prop="position">
        <el-select v-model="form.position" clearable style="width: 200px;" placeholder="板块位置">
          <el-option
            v-for="item in positionList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="板块类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;" @change="typechange" placeholder="板块类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
            :disabled="item.display"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.position===3" label="板块分类" prop="categoryId">
        <el-select v-model="form.categoryId" clearable filterable style="width: 200px;"  placeholder="板块分类">
          <el-option
            v-for="item in categoryIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===1" label="商品" prop="valueId">
        <el-select v-model="form.valueId" style="width: 200px;" clearable filterable>
          <el-option
            v-for="item in productIdList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===2" label="商家" prop="valueId">
        <el-select v-model="form.valueId" style="width: 200px;" clearable filterable>
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===3" label="资源" prop="valueId">
        <el-select v-model="form.valueId" style="width: 200px;" clearable filterable>
          <el-option
            v-for="item in dictList"
            :key="item.id"
            :label="item.dataValue"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.type !==1 && form.type !==2 && form.type !==3 && form.type !==4 && form.type !=='' && form.type !==undefined " label="链接地址" prop="linkUrl" :rules="[{ required: true, message: '请输入链接地址', trigger: 'blur' }]">
        <el-input v-model="form.linkUrl" maxlength="128" style="width: 200px;" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="128" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="子标题" prop="subtitle">
        <el-input v-model="form.subtitle" maxlength="128" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model="form.sortNo" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="阅读量" prop="readCount">
        <el-input v-model="form.readCount" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item v-if="form.position ===1 || form.position ===2" label="轮播图" prop="imgKey" style="display:block" :rules="[{ required: true, message: '请选择轮播图', trigger: 'blur' }]">
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
          value-key="form.icon"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item v-if="form.type===4" label="内容" prop="content" :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]">
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
import { getpanelLists } from '@/api/panel/panel'
import { panelpositionList, paneltypeList } from '@/api/panel/panelcontent'
import { getpanelcategoryLists } from '@/api/panel/panelcategory'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getproductLists } from '@/api/product/product'
import { getdictdataLists } from '@/api/system/dictDetail'
import { sysfileAdds } from '@/api/upload'
import Editor from '../../Editor'
const defaultForm = {
  id: null,
  panelId: '',
  categoryId: '',
  type: '',
  position: '',
  valueId: '',
  linkUrl: '',
  sortNo: 100,
  companyId: 0,
  languageId: 1,
  readCount: 0,
  title: '',
  content: '',
  imgKey: '',
  subtitle: '',
  status: 1,
  fileList: []
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      panelList: [],
      positionList: [],
      categoryIdList: [],
      typeList: [],
      merchantIdList: [],
      productIdList: [],
      dictList: [],
      statusList: [ // 状态列表
        {
          value: 1,
          label: '显示'
        },
        {
          value: 2,
          label: '隐藏'
        }
      ],
      rules: {
        panelId: [
          {
            required: true,
            message: '请选择所属板块',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        valueId: [
          {
            required: true,
            message: '请选择关联数据',
            trigger: 'blur'
          }
        ],
        sortNo: [
          {
            required: true,
            message: '请输入排序编号',
            trigger: 'blur'
          }
        ],
        readCount: [
          {
            required: true,
            message: '请输入阅读数量',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        position: [
          {
            required: true,
            message: '请选择位置类型',
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
  watch: {
    'form.panelId': function(newQuestion, oldQuestion) {
      if (this.form.panelId !== '') {
        const val = this.form.panelId
        const data = {
          status: 1,
          panelId: val
        }
        getpanelcategoryLists(data).then(res => {
          this.categoryIdList = res.data
        })
      }
    },
    'form.position': function(newQuestion, oldQuestion) {
      if (this.form.position === 3) {
        for (var i = 0; i < this.typeList.length; i++) {
          this.typeList[i].display = true
        }
        this.typeList[1].display = false
      } else {
        for (var s = 0; s < this.typeList.length; s++) {
          this.typeList[s].display = false
        }
      }
    },
      'form.valueId': function(newQuestion, oldQuestion) {
          if (this.form.valueId !== '' && this.form.type===1 || this.form.type===2) {
              const val = this.form.valueId
              if(this.form.type===1){
                  for(var i=0;i<this.productIdList.length;i++){
                      if(val===this.productIdList[i].id){
                          this.form.title=this.productIdList[i].title
                      }
                  }
                }else if(this.form.type===2){
                  for(var i=0;i<this.merchantIdList.length;i++){
                      if(val===this.merchantIdList[i].id){
                          this.form.title=this.merchantIdList[i].name
                      }
                  }
              }

          }
      },
  },
  created() {
    const data = {
      status: 1
    }
    getpanelLists(data).then(res => {
      this.panelList = res.data
    })
    panelpositionList(data).then(res => {
      this.positionList = res.data
    })
    paneltypeList(data).then(res => {
      this.typeList = res.data
    })
    getdictdataLists(data).then(res => {
      this.dictList = res.data
    })

    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
    getproductLists(datas).then(res => {
      this.productIdList = res.data
    })
  },
  methods: {
    typechange(e){
    this.form.valueId=''
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
