<template>
  <div id="bottomLeft" style="padding: 0.2rem 0.2rem 0.1rem !important;">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="d-flex">
          <span class="fs-xl text mx-2s">今日内抓拍车辆总数</span>
          <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
        </div>
      </div>
      <div class="renlian">
        <ul>
          <li>
            <img alt="" src="data:image/png;base64,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">
          </li>
          <li style="font-size: 0.25rem">
            <p style="margin-bottom: 0.2rem">车辆抓拍总数</p>
            <!--            <br>-->
            <count-to :start-val="0" :end-val="number" :duration="1000" class="card-panel-num" />
          </li>
          <li class="leftImg1Li">
            <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACACAYAAADOIBGMAAAEoElEQVR4Xu2dP25TQRCHZx1H4iCU4QSRIidG3MGnoE9qgtJwBYoUlkgRiTIolkGyOAA5BAUnSBQvcoGw8dozO7yV3z5/ad/sanfmezO//fOc8Ho+/RRFXojyF+fycdIf3Gp2PO+GB8JwPv1smUqcy/WkP7ix2GJTvwcAo/4YFpkBYBRxa/2dAkb9MSwyA8Ao4tb6OwWM+mNYZAaAUcSt9XcKGPXHsMgMAKOIW+vvFDDqj2GRGQBGEbfW3ylg1B/DIjMAjCJurb/TzoFxFqcjS1gmYTC22O2rTefAsJ4WH4TD87tw/LCvgdfmDRiah/b0OWDsSeBzSyxg7AEYb+Ls6Dk+XVqm+qfEAobFW5XbAIaIID7XKQYMwEjmNsAADMDYVPYpJZSSJBuAARiAYVwtoTHQGGgMNIYxXYgIGYOMQcYgY5Ax7B4gY5AxyBj29wWNQcYgY5AxyBh2D5AxyBhkDPv7gsYgY3QzYyzI1t6DR3n8NQ2nP8kYmqf+Pq86Yywuq4Yo+jchQb7fh8F7wACMVQ+E3o/7cHIBGIABGHYGuqcx7KWEjJHLyZ5oDMAAjJQH0Bi5XNR9H4NSkh1vcwNKCRtciE+Wq+aEQSlZuIrPB9aBoZQABqWkhlKS+5sU9uKQZ0nGaFHG8AQjL9x2a89YWvP7GF1brnqCYQ91nqVnLICR52OztScY5s4zDT1jAYxMJ1vNPcGw9p1r5xkLYOR62WjvCYax62wzz1gAI9vNtgaeYNh6zrfyjAUw8v1sauEJhqljh5FnLIDhcLSliScYln49Np6xAIbH04Y2nmAYunWZeMYCGC5X6408wdB79Vl4xgIYPl+rrTzBUDt1GnjGAhhOZ2vNPMHQ+vQ+94wFMLzeVtp5glFoKNzHWDi2LfcxAKMhzNt0iDaMX99KjENtajHG2eTg9CplBxia94zP2wXGt3cS56/UoW+5sQ4YqvdsBoBR7t9weSBFfCa4HUYyBmAAxooHWvcfjigllJKk6AAMwACMfzxQ+n/AIj4b2uBCfB4/ID4Rn4jPZQ9sS99kDDJG8n+7AwZgAMYGIYzGQGOgMdAY+rkVO5/h8PwupDeV0BhoDDQGGmPVAyxX02WFUkIpSZLRKBhncfohRHmpSZte6F19CSezlB2HaB08RLNewI1BxpMwGAOGvaxpL5vl+c4O0QBjPTyeYFiC7LHxjKWRDS7AAIybFLGAARiAscwAnw+IxLlcT/oDwACM1fQIGIkiSsYgYyRXA4ABGICxYaFMKaGUJNEADMAADL5dbebzATa42OBiH4N9DPYx1AMrlqssV3e1XN3Vzz5xupqIeJsuA+9qLIABGCseaPRqH6uScqsSMkacjkKU0f8IvkVbK6S13BIHDMBo1TcuaAw0Bhpj2QOUknTRRnxW8sERGgONgcZIJTG+RGvXl/eIT8Qn4hPxqe4SCeIT8ZmkBDAAAzBSHmAfg32MrW9G6uGu9g7aNBZWJaxKWJWwKmFVonoAjYHGQGPE2dFzfLpU3xYR9jHIGGQMMgYZg6t9qbeAH2fjzucFYGxQUlwGbubGOhtcbHCxwcUGl75g5XSV09Wtq7XfKDllgIFcqO8AAAAASUVORK5CYII=">
            <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACACAYAAADOIBGMAAAELElEQVR4Xu3dT04UQRTH8S6ZhdcwQSRGT+EpPIWQuMK1GiLRwQu4YEGiCxPvYDyALBA9gAuPgF0GE5WRgiraKeya+bDtoul679u/96eqi7B51L+OfXe9y/z0ff/q5e3J29w41xfDAmHjsH9XMpXY9Xu765M3JWONad8CwGjfh1VmAIwqZm3/psBo34dVZgCMKmZt/6bAaN+HVWYAjCpmbf+mwGjfh1VmAIwqZm3/psBo34dVZgCMKmZt/6bAaN+HVWYAjCpmbf+mCwfGxlG8X+KW6VrYLxm3rGMWD4zC1eLJJGztrIaDZXV8bt7AyFloSa8DY0kcf9kQC4wlAOPhl3jn+Dg+KZnqrxALjBJrNT4GGF3XlW5VXKbkExjASGobMIABjPPCvlBy1jIUg2JQDIpRXipRDIpBMSgGxSi3AMWgGBSj/H2RY1AMikExKEa5BSgGxaAY5e+LHINiUAyKQTHKLUAxFlMxTmJhjoKw0n17diN8pRg5S/253nSO8XOzal/wTUgIH6a3wlNgAGPGAmElfHxxMzwCBjCAUc7A4uUYpaGEYlyekqXIMYABjKQFgAEMYFyeATmGqqScGjmGzifFoBgUQx+jnAGK0YJiXPZMin/0/7m/LscYUY4xxBnASFhg0TqfwJgT5sCod1DcEEhHc6IOMICR1BhgAAMYf1mg9rFPQomqRB9j7H2MIW/pnPL4M7cZ8iySz0reGOKMSo/SDXkWYFTyxhBnVHoUYJwYdiyHswFjTpgrV5WrylXlarmcUAyKMXrF2DyKD2If7+Wwjl18v7u+sp0aJ8fIWa/w+pgUY/NzfBy/x7u5R79oxzowctYrvA4MoWT8oYRiHGhwJTAVSgIwUvIFDGAk/70mMIABjHOabXIMOcaMBUb3XxSVq8pV5aq1ksLu1slyeeHhbFdxPobkU/Ip+ZR8zlrgop3ZFINiUAyKQTFKMj7l6iRs7aymS0ShRCgRSoQSoeTKQ8nmp/g8xria/8Nhe7oe3qfG6WMsYOez9FuO7lrYn66FfWCUq1f+ZcuPGLLNcC6LaMA465whzsi7eNiIIc8CDKur9VZXKQbFeJPMDw77d0UiJ8dImmlhD06hGBSDYpxiwAdHXdfFrt/bXZ8AAxiz8giMs+GCYlCMZNIIDGAA47yyUygRSpJsAAMYwPC1+3w+atbg0uDSx7jiPsb/OvbJ6urIV1f/1/5TYADDsvtpC7TywRHF8O3qqHasCyVCiVAilOS3U831SzR9jHp9DDmGHEOOkdw3CgxgAGPWAmMsnVUlqhJViapEVZK1wBjlO/XQqhLJp+RT8in5nLWATxSTIW6MYU1VoipRlahKsjl5Z62kkVP7VCWqElWJqkRVoirJh/XfcV2DK2EBxzmO65Ri5apyVbmqXM3HNeWqcvXCLqxQIpQIJUJJeSj5AcMA8IDOlefLAAAAAElFTkSuQmCC">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { getbigData } from '@/api/bigData/dataManagement'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      number: 0
    }
  },
  mounted() {
    const type = 11
    getbigData(type).then(res => {
      const code = res.code
      if (code === '0') {
        this.number = Number(res.data[0].value)
        this.suiji()
      }
    })
  },
  methods: {
    suiji() {
      setInterval(() => {
        this.number += 1
      }, 10000)
    }
  }
}
</script>

<style lang="scss">
#bottomLeft {
  border-radius: 0.0625rem;
  .bg-color-black {
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .card-panel-num{
    color: #43fec0;
    font-weight: 600;
  }

}
.renlian{
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 0.25rem;
  padding: 0 !important;
}
.renlian ul{
  display: flex;
  align-items: center;
  width: 100%;
  //padding: 0.2rem 0;
}
.renlian ul li{
  text-align: center;
  width: 32%;
}
.leftImg1Li img{
  width: 0.4rem;
}
</style>
