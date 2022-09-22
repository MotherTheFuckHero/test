<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.resourceName" clearable size="small" placeholder="父菜单标题搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="580px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="菜单类型" prop="resourceType" style="display: inline-block">
          <el-radio-group v-model="form.resourceType" size="mini" style="width: 178px">
            <el-radio-button label="3">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属系统" prop="systemId" style="display: inline-block">
          <el-select v-model="form.systemId" style="width: 178px;" placeholder="系统">
            <el-option
              v-for="item in systemIdList"
              :key="item.id"
              :label="item.systemName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="form.resourceType.toString() !== '2'" label="菜单图标" prop="resourceLogo">
          <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="form.resourceLogo" style="width: 450px;" placeholder="点击选择图标" readonly>
              <svg-icon v-if="form.resourceLogo" slot="prefix" :icon-class="form.resourceLogo" class="el-input__icon" style="height: 32px;width: 16px;" />
              <em v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item v-show="form.resourceType.toString() !== '2'" label="外链菜单" prop="iframe">
          <el-radio-group v-model="form.iframe" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.resourceType.toString() === '1'" label="菜单缓存" prop="cache">
          <el-radio-group v-model="form.cache" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.resourceType.toString() !== '2'" label="菜单可见" prop="displayStatus">
          <el-radio-group v-model="form.displayStatus" size="mini">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="2">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.resourceType.toString() !== '2'" label="菜单标题" prop="resourceName">
          <el-input v-model="form.resourceName" :style=" form.resourceType.toString() === '1' ? 'width: 450px' : 'width: 178px'" placeholder="菜单标题" />
        </el-form-item>
        <el-form-item v-if="form.resourceType.toString() === '2'" label="按钮名称" prop="resourceName">
          <el-input v-model="form.resourceName" placeholder="按钮名称" style="width: 178px;" />
        </el-form-item>
        <el-form-item label="权限标识" prop="resourceCode">
          <el-input v-model="form.resourceCode" :disabled="form.iframe" placeholder="权限标识" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-if="form.resourceType.toString() !== '2'" label="路由地址" prop="resourceUrl">
          <el-input v-model="form.resourceUrl" placeholder="路由地址" style="width: 178px;" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="sortNo">
          <el-input-number v-model.number="form.sortNo" :min="0" :max="999" controls-position="right" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-show="!form.iframe && form.resourceType.toString() === '1'" label="组件名称" prop="componentName">
          <el-input v-model="form.componentName" style="width: 178px;" placeholder="匹配组件内Name字段" />
        </el-form-item>
        <el-form-item v-show="!form.iframe && form.resourceType.toString() === '1'" label="组件路径" prop="component">
          <el-input v-model="form.component" style="width: 178px;" placeholder="组件路径" />
        </el-form-item>

        <el-form-item label="上级类目" prop="parentId">
          <treeselect
            v-model="form.parentId"
            :options="menus"
            :load-options="loadMenus"
            style="width: 450px;"
            placeholder="选择上级类目"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      lazy
      :load="getMenus"
      :data="crud.data"
      :tree-props="{children: 'childrenNum', hasChildren: 'hasChildren'}"
      row-key="id"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="180px" prop="resourceName" />
      <el-table-column prop="resourceLogo" label="图标" align="center" width="60px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.resourceLogo ? scope.row.resourceLogo : ''" />
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="resourceTypeDesc" label="类型" width="60px" />
      <el-table-column prop="sortNo" align="center" label="排序" width="60px">
        <template slot-scope="scope">
          {{ scope.row.sortNo }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="resourceCode" label="权限标识" />
      <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
      <el-table-column prop="iframe" label="外链" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.iframe">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="cache" label="缓存" width="75px">
        <template slot-scope="scope">
          <span v-if="scope.row.cache">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="displayStatus" label="可见" width="75px">
        <template slot-scope="scope">
          {{ scope.row.displayStatus === 1 ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建日期" width="135px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-permission="['sys_resource_update','sys_resource_delete']" label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            msg="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import crudMenu from '@/api/user/sysresource'
import IconSelect from '@/components/IconSelect'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import { getsystemLists } from '@/api/system/sys'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'

// crud交由presenter持有
const defaultForm = { id: null, parentId: 0, resourceName: null, systemId: 1, resourceUrl: null, resourceCode: null, component: null, componentName: null, iframe: false, resourceLogo: null, cache: false, displayStatus: 1, resourceType: 1, sortNo: 999 }
export default {
  name: '权限菜单列表',
  components: { Treeselect, IconSelect, crudOperation, rrOperation, udOperation },
  cruds() {
    return CRUD({ title: '菜单', url: 'admin/sys_resource/page_list', query: { parentId: 0 }, crudMethod: { ...crudMenu }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],

  data() {
    return {
      menus: [],
      systemIdList: [],
      permission: {
        add: ['sys_resource_add'],
        edit: ['sys_resource_update'],
        del: ['sys_resource_delete'],
        export: ['sys_resource_export']
      },
      rules: {
        resourceName: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        resourceCode: [
          { required: true, message: '请输入权限标识', trigger: 'blur' }
        ],
        resourceUrl: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        systemId: [
          { required: true, message: '请选择所属系统', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.systemId': function(newQuestion, oldQuestion) {
      if (this.form.systemId !== '' || this.form.systemId !== undefined) {
        var params = {
          systemId: this.form.systemId
        }
        crudMenu.getMenusByPid(0, params).then(res => {
          this.menus = res.data
        })
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.menus = []
      if (form.id != null) {
        if (form.parentId === null) {
          form.parentId = 0
        }
        this.getSupDepts(form.id)
      } else {
        this.menus.push({ id: 0, label: '顶级类目', children: null })
      }
    },
    getMenus(tree, treeNode, resolve) {
      const data = { parentId: tree.id }
      setTimeout(() => {
        crudMenu.getMenus(data).then(res => {
          resolve(res.data)
        })
      }, 100)
    },
    getSupDepts(id) {
      crudMenu.getMenuSuperior(id).then(res => {
        const children = res.data.map(function(obj) {
          if (!obj.leaf && !obj.children) {
            obj.children = null
          }
          return obj
        })
        this.menus = [{ id: 0, label: '顶级类目', children: children }]
      })
    },
    loadMenus({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        var params = {
          systemId: this.form.systemId
        }
        crudMenu.getMenusByPid(parentNode.id, params).then(res => {
          parentNode.children = res.data.map(function(obj) {
            if (!obj.leaf) {
              obj.children = null
            }
            return obj
          })
          setTimeout(() => {
            callback()
          }, 100)
        })
      }
    },
    // 选中图标
    selected(name) {
      this.form.resourceLogo = name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
 ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>
<style>
  .vue-treeselect--single .vue-treeselect__input{
    display: none;
  }
</style>
