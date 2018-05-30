import center from './center'
import bold from './bold'
let classLibrary = {
  staticIndex: ['center', 'bold'],
  addClass: function (type) {
    let addClassJson = {}
    switch (type) {
      case 'center':
        addClassJson = JSON.parse(JSON.stringify(center))
        break;
      case 'bold':
        addClassJson = JSON.parse(JSON.stringify(bold))
        break;
    }
    console.log(bold)
    // 遍历 并重新设置id
    return addClassJson
  }
}

export default classLibrary

