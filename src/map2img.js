/**
 * @author j_bleach
 * @date 2019-08-10
 * @Description: 地图分层快照插件
 * @param srcUrl:string 室内楼层资源
 * @param zoom:number 地图缩放级别
 */

class Map2img {
  constructor(srcUrl, zoom = 18) {
    this._srcUrl = srcUrl;
    this._zoom = zoom;
  }

  onAdd(map) {
    this._map = map;
    console.log(this._map.getCanvas());
    let el = document.createElement("div");

  }
}

export default Map2img;
