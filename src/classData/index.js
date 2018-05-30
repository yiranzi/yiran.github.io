import center from './center'
import bold from './bold'
import zaoColorWhite from './zao-color-white'
import zaoFontBold from './zao-font-bold'
import zaoFontInfo from './zao-font-info'
import zaoFontNormal from './zao-font-normal'

let classLibrary = {
  staticIndex: ['center', 'bold', 'zaoColorWhite', 'zaoFontBold', 'zaoFontInfo', 'zaoFontNormal'],
  addClass: function (type) {
    let addClassJson = {}
    switch (type) {
      case 'center':
        addClassJson = JSON.parse(JSON.stringify(center))
        break;
      case 'bold':
        addClassJson = JSON.parse(JSON.stringify(bold))
        break;
      case 'zaoColorWhite':
        addClassJson = JSON.parse(JSON.stringify(zaoColorWhite))
        break;
      case 'zaoFontBold':
        addClassJson = JSON.parse(JSON.stringify(zaoFontBold))
        break;
      case 'zaoFontInfo':
        addClassJson = JSON.parse(JSON.stringify(zaoFontInfo))
        break;
      case 'zaoFontNormal':
        addClassJson = JSON.parse(JSON.stringify(zaoFontNormal))
        break;
    }
    console.log(bold)
    // 遍历 并重新设置id
    return addClassJson
  }
}

export default classLibrary

