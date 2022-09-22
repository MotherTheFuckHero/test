<template>
  <div style="width:920px">
    <ele-calendar
      :render-content="renderContent"
      :data="datedef"
      :prop="prop"
      :disabled-date="disabledDate"
      :effective-time-limit="effectiveTimeLimit"
      :default-value="defaultValue"
    />
  </div>
</template>

<script>
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
export default {
  components: {
    eleCalendar
  },
  props: {
    datedef: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultPrice: {
      type: String,
      default: () => {
        return ''
      }
    },
    defaultstockCount: {
      type: String,
      default: () => {
        return ''
      }
    },
    effectiveTimeLimit: {
      type: String,
      default: () => {
        return ''
      }
    },
    defaultValue: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    const self = this
    return {
      prop: 'date', // 对应日期字段名
      disabledDate: date => {
        return (
          date.valueOf() < new Date().valueOf() - 1 * 24 * 60 * 60 * 1000 ||
                        date.valueOf() > new Date(self.effectiveTimeLimit).valueOf()
        )
      }
    }
  },
  methods: {
    //  JSX语法
    renderContent(h, parmas) {
      const self = this
      const loop = data => {
        return (
          <div class={data.defvalue.value ? 'active' : ''}>
            <div>{data.defvalue.text}</div>
            <div>
              <p>
                        价格 <i-input value={data.defvalue.value.content ? data.defvalue.value.content : self.defaultPrice}
                  on-on-blur={event =>
                    self.handleChange(
                      event,
                      data.defvalue.value
                        ? data.defvalue.value.date
                        : self.handleDate(data.defdate)
                    )
                  }
                  disabled={
                    data.defvalue.value
                      ? new Date(data.defvalue.value.date).valueOf() <
                            new Date().valueOf() - 1 * 24 * 60 * 60 * 1000 ||
                            new Date(data.defvalue.value.date).valueOf() >
                            new Date(self.effectiveTimeLimit).valueOf()
                      : data.defdate.valueOf() <
                            new Date().valueOf() - 1 * 24 * 60 * 60 * 1000 ||
                            data.defdate.valueOf() >
                            new Date(self.effectiveTimeLimit).valueOf()
                  }
                  key={
                    data.defvalue.value
                      ? data.defvalue.value.date
                      : self.handleDate(data.defdate)
                  }
                />
              </p>
              <p>
                    库存 <i-input value={data.defvalue.value.contents ? data.defvalue.value.contents : self.defaultstockCount}
                  on-on-blur={event =>
                    self.handleChanges(
                      event,
                      data.defvalue.value
                        ? data.defvalue.value.date
                        : self.handleDates(data.defdate)
                    )
                  }
                  disabled={
                    data.defvalue.value
                      ? new Date(data.defvalue.value.date).valueOf() <
                            new Date().valueOf() - 1 * 24 * 60 * 60 * 1000 ||
                            new Date(data.defvalue.value.date).valueOf() >
                            new Date(self.effectiveTimeLimit).valueOf()
                      : data.defdate.valueOf() <
                            new Date().valueOf() - 1 * 24 * 60 * 60 * 1000 ||
                            data.defdate.valueOf() >
                            new Date(self.effectiveTimeLimit).valueOf()
                  }
                  key={
                    data.defvalue.value
                      ? data.defvalue.value.date
                      : self.handleDates(data.defdate)
                  }
                />
              </p>
            </div>
          </div>
        )
      }
      return <div style='min-height:60px;'>{loop(parmas)}</div>
    },
    handleChange(event, date) {
      console.log(event, date, 'dddddd')
      const self = this
      const index = self.datedef.findIndex(item => {
        return item.date === date
      })
      if (isNaN(event.target.value)) {
        this.$message.warning(`请输入正确的价格`)
        event.target.value = self.defaultPrice
        return
      }
      if (event.target.value && index === -1) {
        if (event.target.value === self.defaultPrice) {
          return
        }
        self.datedef.push({
          date,
          content: event.target.value,
          contents: null,
          cid: null
        })
        console.log('self.datedef', self.datedef)
        this.$emit('aaa', self.datedef)
      } else if (event.target.value && index !== -1) {
        if (event.target.value === self.defaultPrice) {
          self.datedef.splice(index, 1)
          return
        }
        const selectItem = self.datedef[index]
        selectItem.content = event.target.value
        self.datedef.splice(index, 1, selectItem)
      } else if (!event.target.value && index !== -1) {
        self.datedef.splice(index, 1)
      } else {
        event.target.value = self.defaultPrice
      }
    },
    handleDate(date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month >= 10 ? month : '0' + month
      let idate = date.getDate()
      idate = idate >= 10 ? idate : '0' + idate
      return `${year}-${month}-${idate}`
    },
    handleChanges(event, date) {
      console.log(event, date, 'dddddds')
      const self = this
      const index = self.datedef.findIndex(item => {
        return item.date === date
      })
      if (isNaN(event.target.value)) {
        this.$message.warning(`请输入正确的库存`)
        event.target.value = self.defaultstockCount
        return
      }
      if (event.target.value && index === -1) {
        if (event.target.value === self.defaultstockCount) {
          return
        }
        self.datedef.push({
          date,
          content: null,
          contents: event.target.value,
          cid: null
        })
        console.log('self.datedef', self.datedef)
        this.$emit('aaa', self.datedef)
      } else if (event.target.value && index !== -1) {
        if (event.target.value === self.defaultstockCount) {
          self.datedef.splice(index, 1)
          return
        }
        const selectItem = self.datedef[index]
        selectItem.contents = event.target.value
        self.datedef.splice(index, 1, selectItem)
      } else if (!event.target.value && index !== -1) {
        self.datedef.splice(index, 1)
      } else {
        event.target.value = self.defaultstockCount
      }
    },
    handleDates(date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month >= 10 ? month : '0' + month
      let idate = date.getDate()
      idate = idate >= 10 ? idate : '0' + idate
      return `${year}-${month}-${idate}`
    }
  }
}
</script>

<style lang="scss">
  .el-picker-panel-calendar.el-date-picker-calendar.el-popper {
    box-shadow: none;
  }
  .el-date-table-calendar td > div > div {
    border: 1px solid rgba(24,144,255,0.8);
    color: #fff;
    margin: 5px;
    & > div:first-child {
      background-color: rgba(24,144,255,0.8);
    }
    & > div:nth-child(2) {
      padding: 5px;
      color: #000;
      .ivu-input-wrapper {
        width: 69%;
      }
    }
    &.active {
      border: 1px solid #FF4949;
      & > div:first-child {
        background-color: #FF4949;
      }
      & > div:nth-child(2) {
        padding: 5px;
        color: #000;
        .ivu-input-wrapper {
          width: 69%;
        }
      }
    }
  }
  // 这段如果放开的话当天之前的所有框置灰
  .el-date-table-calendar td.disabled > div > div {
    border: 1px solid #aaa;
    color: #fff;
    margin: 5px;
    & > div:first-child {
      background-color: #aaa;
    }
    & > div:nth-child(2) {
      padding: 5px;
      color: #000;
      .ivu-input-wrapper {
        width: 69%;
      }
    }
  }
  .el-date-table-calendar td.available:hover {
    color: #000;
  }
  .el-date-table-calendar td.available.today {
    color: #000;
    font-weight: normal;
  }
  .el-date-table-calendar tr td.current.available:not(.disabled) {
    background-color: #fff;
  }
</style>
