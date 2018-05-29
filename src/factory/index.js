import button from '../nodeData/button/button'
import view from './view'

let comLibrary = {
  staticIndex: ['button', 'view'],
  newButton: function () {
  },
  newView: function () {
  },
  newComponent: function (type) {
    let component = {}
    switch (type) {
      case 'button':
        component = Object.assign({}, button)
        break;
      case 'view':
        component = new view()
        break;
    }
    // 遍历 并重新设置id
    return component
  }
}

export default comLibrary

