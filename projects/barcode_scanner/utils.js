let Utils = {
  convertObjectToMap(obj) {
    const mp = new Map;
    Object.keys(obj).forEach (k => { mp.set(k, obj[k]) });
    return mp;
  }
  ,convertMapToObject(map) {
    const obj = {};
    map.forEach ((v,k) => { obj[k] = v });
    return obj;
  },
} 