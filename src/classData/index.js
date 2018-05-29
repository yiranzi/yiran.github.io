import center from './center'
import bold from './bold'
let classLibrary = {
  staticIndex: ['center', 'bold'],
  addClass: function (type) {
    let addClassJson = {}
    switch (type) {
      case 'center':
        addClassJson = center.slice(0)
        break;
      case 'bold':
        addClassJson = bold.slice(0)
        break;
    }
    console.log(bold)
    // 遍历 并重新设置id
    return addClassJson
  }
}

export default classLibrary

