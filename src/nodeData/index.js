import button from './button/button'
import normalText from './normalText'
import view from './view'

let comLibrary = {
  staticIndex: ['button', 'view', 'normalText'],
  newComponent: function (type) {
    let component = {}
    switch (type) {
      case 'button':
        component = JSON.parse(JSON.stringify(button))
        break;
      case 'view':
        component = JSON.parse(JSON.stringify(view))
        break;
      case 'normalText':
        component = JSON.parse(JSON.stringify(normalText))
        break;
    }
    // 遍历 并重新设置id
    return component
  }
}

export default comLibrary

