// import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
// import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url
  }

  // getLyric() {
  //   if (this.lyric) {
  //     return Promise.resolve(this.lyric)
  //   }
  //
  //   return new Promise((resolve, reject) => {
  //     getLyric(this.mid).then((res) => {
  //       if (res.retcode === ERR_OK) {
  //         this.lyric = Base64.decode(res.lyric)
  //         resolve(this.lyric)
  //       } else {
  //         reject('no lyric')
  //       }
  //     })
  //   })
  // }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

//http://dl.stream.qqmusic.qq.com/C400001uxKNp3a7Qkv.m4a?guid=8931625675&vkey=2461F9D3907F1389F9BA84FE48A7CD8B4AF3191C6CF61EF415C086391AD98B92BA38CF7A9137DB1111DDEC0ED523B721D4E72ED79A2E98FA&uin=0&fromtag=38
//http://dl.stream.qqmusic.qq.com/C400004VBMk71TdUuR.m4a?guid=8931625675&vkey=249FC74208335065B7E65009B6A88FEEC1ECF2D7F719B094AD71BFF69C2CEBFBED3ED5F2DDECC9FC2BFB97E4CA98DBB937F1CDDA5D5F5C0E&uin=0&fromtag=38
