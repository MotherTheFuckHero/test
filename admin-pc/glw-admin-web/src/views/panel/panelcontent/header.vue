<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.title" clearable size="small" placeholder="输入标题名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.companyId" clearable size="small" placeholder="分公司" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyIdList"
        :key="item.id"
        :label="item.companyName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.panelId" clearable size="small" placeholder="所属板块" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in panelList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.categoryId" clearable size="small" placeholder="板块分类" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in categoryIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.position" clearable size="small" placeholder="板块位置" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in positionList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.type" clearable size="small" placeholder="板块类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getpanelLists } from '@/api/panel/panel'
import { getpanelcategoryLists } from '@/api/panel/panelcategory'
import { panelpositionList, paneltypeList } from '@/api/panel/panelcontent'
import { getcompanyLists } from '@/api/system/company'
export default {
  components: { rrOperation },
  mixins: [header()],
  props: {
    permission: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      panelList: [],
      categoryIdList: [],
      companyIdList: [],
      positionList: [],
      typeList: [],
      statusList: [ // 状态列表
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '禁用'
        }
      ]
    }
  },
  watch: {
    'query.panelId': function(newQuestion, oldQuestion) {
      const datas = {
        panelId: this.query.panelId
      }
      getpanelcategoryLists(datas).then(res => {
        this.categoryIdList = res.data
      })
    },
    'query.companyId': function(newQuestion, oldQuestion) {
      const data = {
        companyId: this.query.companyId
      }
      getpanelLists(data).then(res => {
        this.panelList = res.data
      })
    }
  },
  created() {
    const data = {
      status: 1
    }

    panelpositionList(data).then(res => {
      this.positionList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    paneltypeList(data).then(res => {
      this.typeList = res.data
    })
  }
}
</script>
