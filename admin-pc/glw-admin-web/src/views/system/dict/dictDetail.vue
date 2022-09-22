<template>
  <div>
    <div v-if="query.dictTypeId === ''">
      <div class="my-code">点击字典查看详情</div>
    </div>
    <div v-else>
      <!--工具栏-->
      <div class="head-container">
        <div v-if="crud.props.searchToggle">
          <!-- 搜索 -->
          <el-input v-model="query.dataCode" clearable size="small" placeholder="输入字典标签查询" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
          <rrOperation />
        </div>
      </div>
      <!--表单组件-->
      <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="数据编码" prop="dataCode">
            <el-input v-model="form.dataCode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="数据值" prop="dataValue">
            <el-input v-model="form.dataValue" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="数据描述" prop="dataDesc">
            <el-input v-model="form.dataDesc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="排序" prop="sortNo">
            <el-input-number v-model.number="form.sortNo" :min="0" :max="999" controls-position="right" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" highlight-current-row style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column label="所属字典">
          {{ dictTypeName }}
        </el-table-column>
        <el-table-column prop="dataCode" label="数据编码" />
        <el-table-column prop="dataValue" label="数据值" />
        <el-table-column prop="dataDesc" label="数据描述" />
        <el-table-column prop="sortNo" label="排序" />
        <el-table-column v-permission="['dict_data_update','dict_data_delete']" label="操作" width="130px" align="center" fixed="right">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudDictDetail from '@/api/system/dictDetail'
import CRUD, { presenter, header, form } from '@crud/crud'
import pagination from '@crud/Pagination'
import rrOperation from '@crud/RR.operation'
import udOperation from '@crud/UD.operation'

const defaultForm = { id: null, parentId: 0, dataCode: null, dataValue: null, dataDesc: null, dataLevel: 1, typeLevel: 1, sortNo: 998 }

export default {
  components: { pagination, rrOperation, udOperation },
  cruds() {
    return [
      CRUD({ title: '字典详情', url: 'admin/dict_data/page_list', query: { dictTypeId: '' }, sort: ['sortNo,asc', 'id,desc'],
        crudMethod: { ...crudDictDetail },
        optShow: {
          add: true,
          edit: true,
          del: true,
          reset: false
        },
        queryOnPresenterCreated: false
      })
    ]
  },
  mixins: [
    presenter(),
    header(),
    form(function() {
      return Object.assign({ dictTypeId: this.query.dictTypeId }, defaultForm)
    })],
  data() {
    return {
      dictTypeId: null,
      rules: {
        dataCode: [
          { required: true, message: '请输入字典数据编码', trigger: 'blur' }
        ],
        dataValue: [
          { required: true, message: '请输入字典数据值', trigger: 'blur' }
        ],
        dataDesc: [
          { required: false, message: '请输入字典数据描述', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
        ]
      },
      permission: {
        add: ['dict_data_add'],
        edit: ['dict_data_update'],
        del: ['dict_data_delete']
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
