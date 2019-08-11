/**
 * @author j_bleach
 * @date 2019-08-10
 * @Description: 地图分层快照插件
 * @param html:domTemplate 插件样式
 */

class Map2img {
  constructor(html) {
    this._html = html;
  }

  onAdd(map) {
    this._map = map;
    const el = document.createElement("div");
    el.className = "mapboxgl-ctrl";
    this.container = el
    el.innerHTML = this._html
    this.bindEvent(el)
    return el
  }

  onRemove(map) {
    this.container.parentNode.removeChild(this.container);
    this._map = null;
    return this
  }

  bindEvent(el) {
    el.addEventListener("click", () => {
      const base64 = this._map.getCanvas().toDataURL()
      this.downloadFile(this._map.getStyle().name, base64)
    })
  }

  downloadFile(fileName, content) {
    let aLink = document.createElement("a");
    let blob = this.base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}));
  }

  base64ToBlob(code) {
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }
}

export default Map2img;
