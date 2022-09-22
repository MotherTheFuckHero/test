<template>
  <div id="bottomLeft" style="padding: 0.3rem 0.2rem 0.1rem !important;">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <div class="d-flex">
          <span class="fs-xl text mx-2s">今日内抓拍人脸总数</span>
          <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
        </div>
      </div>
      <div class="renlian">
        <ul>
          <li>
            <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABECAYAAADHsbZQAAAGaElEQVRoQ82ae4xcdRXHP+fObrumlUpKkVK1IqikK4E/6gN8ZLe0O7PFpEk7M8vyMkhCDRgJAY0JxNRErGggxgeJJZHYLq3MbCsgtjPTgksQY4QSMS0WKkZpTVoKjX2w233M/Zo7y5SW7Ox9ze7dX7J/3XO+53zu+d3Z3+/8fsYUjO7tms0QC1wxz4FZow6nLMWxo4c4snutjTYzpDVLbHlBH0sZq824Ri5LzLgAcM7QrwIHEXtl/G5QPPFc3o7EjR8bYHlBl6XgHrzkoTVEQu8AfYzxo1Kv/TuE31mmkQG6NmqOzeZ75vAtoC1qAsAJxA8/CD8p5s2rUqgRCaC7Tx9x23jKxOWhok1uXJHoLeftaBjN0ADdv9XFSvE0sDhMoIC2r7gpOiur7c2A9oQCWPGELnRG+JPBRUEDhLWT+NvwO3QO3Gz/C+IbGCBXUOq48bzB54MIx7TpK+XsxiAagQHSRX3H4P4gos2wkUu23GNb/bQCAaS3aqG5/AOY5yfYrOeCN4ZP8umBm+3UZJqBADL9Wo/4brOSC6HzjVLOfhULoOMRtbXN5V/AwhCBm2MqXijlvW/O1EjQtwJdBS1zrPazmcioGp/ambX9kQEyBf0Y49uJZE/t3a/dkbcN0QGK8t7+ssQA4JEdOft6HIDXgU8kBQAMlHLWGRkgXdRhg/MTBPh7KWcN11w+H7EsU+QwsCApAIk95bxdFrkCmYIOYixKCgDxl1LerowOUNQLwNLEAGBbKWdrIgOki/qNwU1JAbjGvZWs3RcZINOvGxCbkgKoio6deXs2MkB6kxZaW20pEWfbGJX/0AGxeG/eRiIDeI7poh43WBU1i6h+Mh4sZ+2uWIs5z7nrMX3FcWhYxqgJTuYncaqaon3XGvOq33D4LubqnpmiHmcaqyCXB8o9drffywkMsKygRa3Gywbz/UTjPhfsd4ZZuuMGO+6nFRjAE8oUtRooACk/4RjPByU6y3n7axCNUADvQtwG/DKIeASbYReylZw9FdQ3NEANoqBbMB4CZgUNFMDuOOLGUt6eDGB72iQSQO2XaYuuclrZiLg4TMCJbCVelsO1laztC6sVGcALtLygea3GXRJ3YJwTNjhwRHC/M4df7FhpwxH8w3XmGgXo2qbznTG+htEr+IxPl9prk7wkY9PJVh59fpWdiJJ43SdWBSYKnNmij9PKElzazWGRRAsw4vV5JPaOwSvP5O2/cZI+07fpAM1KLKhOUwG8/umxFuY7YrFcLjT4gMb/hhyHQRMHhkY4MNDL21jjXk/Q5D27mACyTD/edu9qxJe9+Q9cZNSmTaMxLLHfjD3Ac06VXduvtdfCJB17Cl29TfNbqtzy7kbn0pj/mcckXsJ4uCqKu/J2LAxMqArUmrxV7pRxq01Bo1fwNvDQ8Cg/G7jO3goCEgxAsvRW1iLWG3woiHBMmyMYd5SytsVPxxdgZUEXVI1fG3T7iU3B80fHxO2TTatJAVY8pi86DtsSbWyJ10ddVj7d4ENvCJAp6EvAkxjnTsGbDSUpOJwyvro9ay++33FCgBX9WpoSA8CcUJGm1vjNkRE+98z19p9Jf0a7C1og2I3x0anNJ7y6jD0a5AuVm8w75a+NsyuwTk66nT8YZMLLT4+H4OFyzm6dECDTrzsRD05PKpGjuC6squ/aTlegY7POm93KvunYtEdO/T3Hf7pDXOFNpdMAXf26xxE/aIL4tEi4Ym0lbxtqAB1/VEvbW7Vz4EumJXpzgrxYytlnawCZgq7E+HNzdKdNRYxyRR1gPZbIQXYsWsHdNYB0Ud4ljqtiqSXhLH4/DlDQITM+nEQOsWKK18anUFFep2B2LLFknI/Wp5BrsbeXiRAM1SvgXbY784pkItlECDpYr4BHksQRUoScz3IZn0KZfr2BZt7q04/OW53Wp5DXzr7Gz2GmPRdsrFegF7F5piXol49E9/haqKC5bYbX2k7uSoFftu97Lth3UFx+ejWaLuibZvw8pE5i5nLpKfdY4b0dmbcbW8JmM3oSyypoYJfvl3psnWd+1payY51a2tp5AGoXumfkkHFfOWv31pObsCtRO40UP51JG3vv6FXi9kredp75Zhv2hbr7dI5mcRvGdVDrQCcxXMRuGRuGT9I30SVY39ai1/M/4dAul06M5SY+KWORwdxmEwmOGXinN6/KqAgGKmt4dbKzhP8DE+saRdC6AX8AAAAASUVORK5CYII=">
          </li>
          <li style="font-size: 0.25rem">
            <p style="margin-bottom: 0.2rem">人脸抓拍总数</p>
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
    const type = 5
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
      }, 6000)
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
  padding: 0.1rem;
}
.renlian ul{
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.2rem 0;
}
.renlian ul li{
  text-align: center;
  width: 32%;
}
.leftImg1Li img{
  width: 0.4rem;
}
</style>
