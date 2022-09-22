<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="orderId" label="订单编号" width="150px" />
      <el-table-column prop="productName" label="商品名称" width="150px" />
      <el-table-column prop="specName" label="规格" width="100px" />
      <el-table-column prop="userName" label="评价用户" width="100px" />
      <el-table-column prop="star" label="评分星级" width="100px" />
      <el-table-column prop="content" :show-overflow-tooltip="true" label="评论内容" width="200px" />
      <el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="是否包含图片" prop="hasPicture" width="100">
        <template slot-scope="scope">
          {{ scope.row.hasPicture === false ? '否': '是' }}
        </template>
      </el-table-column>
      <el-table-column label="评论图片" prop="pictureUrls" width="250">
        <template slot-scope="scope">
          <span v-if="scope.row.pictureUrls === null ? false: true">
            <span v-for="(item,index) in scope.row.pictureUrlsList" :key="index">
              <a :herf="item"><img style="margin: 0 3px;" alt="" :src="item" width="40" height="40"></a>
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="150" />
      <el-table-column label="创建时间" prop="createdTime" width="150" />
      <!--   编辑与删除   -->

    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
  </div>
</template>

<script>
import crudJob from '@/api/system/sys'
import eHeader from './header'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import { editcomment } from '@/api/product/product'

export default {
  name: '商品评论列表',
  components: { eHeader, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '商品评论',
      optShow: {
        add: false,
        edit: false,
        del: false,
        download: false,
        reset: true
      },
      url: 'admin/product_comment/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['product_comment_add'],
        edit: ['product_comment_update'],
        del: ['product_comment_delete']
      }
    }
  },
  watch: {
    'crud.data': function(newQuestion, oldQuestion) {
      if (this.crud.data.length > 0) {
        for (var i = 0; i < this.crud.data.length; i++) {
          if (this.crud.data[i].hasPicture) {
            this.crud.data[i].pictureUrlsList = this.crud.data[i].pictureUrls.split(',')
          }
        }
      }
    }
  },
  methods: {
    changeStatus(val) {
      editcomment(val.id, val.status).then(res => {
        var code = res.code
        var msg = res.msg
        if (code !== '0') {
          this.$message({
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
</style>
