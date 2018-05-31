import center from './zao-flex-center'
import bold from './zao-bold'
import zaoColorWhite from './zao-color-white'
import zaoFontBold from './zao-font-bold'
import zaoFontInfo from './zao-font-info'
import zaoFontNormal from './zao-font-normal'
import zaoView from './zao-view'
import defaultImage1 from './default-image-1'

let classLibrary = {
  staticIndex: ['zao-flex-center', 'zao-bold', 'zao-color-white',
    'zao-font-bold', 'zaoFontInfo',
    'zao-font-normal',
    'default-image-1',
  ],
  addClass: function (type) {
    let addClassJson = {}
    switch (type) {
      case 'zao-flex-center':
        addClassJson = JSON.parse(JSON.stringify(center))
        break;
      case 'zao-bold':
        addClassJson = JSON.parse(JSON.stringify(bold))
        break;
      case 'zao-color-white':
        addClassJson = JSON.parse(JSON.stringify(zaoColorWhite))
        break;
      case 'zao-font-bold':
        addClassJson = JSON.parse(JSON.stringify(zaoFontBold))
        break;
      case 'zao-font-info':
        addClassJson = JSON.parse(JSON.stringify(zaoFontInfo))
        break;
      case 'zao-font-normal':
        addClassJson = JSON.parse(JSON.stringify(zaoFontNormal))
        break;
      case 'zao-view':
        addClassJson = JSON.parse(JSON.stringify(zaoView))
        break;
      case 'default-image-1':
        addClassJson = JSON.parse(JSON.stringify(defaultImage1))
        break;
      default:
        addClassJson = null
    }
    console.log(bold)
    // 遍历 并重新设置id
    return addClassJson
  }
}

export default classLibrary

