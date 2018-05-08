import jsonp from '../common/js/jsonp'
import {commonParms, options} from "./config";

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParms,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  });
  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParms, {
    hostUin: 0,
    needNewCode: 1,
    platform: 'h5page',
    num: 30,
    begin: 0,
    order: 'listen',
    from: 'h5',
    singerid: singerId
  })
  return jsonp(url, data, options)
}

