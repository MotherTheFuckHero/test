/*
 * 异步创建script标签
 */
export default function MapLoader() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=c96da2817fef8aeac3b03260816f86b5&callback=onLoad'
      var script = document.createElement('script')
      script.charset = 'utf-8'
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.onLoad = () => {
      resolve(window.AMap)
    }
  })
}
