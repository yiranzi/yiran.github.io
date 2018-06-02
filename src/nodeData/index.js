// import UtilTool from '../util/tools'
// import text from './wx/text'
// import image from './wx/image'
// import view from './wx/view'
//
// import normalText from './normalText'
// import button from './button'
//
// let comLibrary = {
//   staticIndex: ['button', 'view', 'text', 'image', 'normalText'],
//   newComponent: function (type) {
//     let component = {}
//     switch (type) {
//       case 'button':
//         component = JSON.parse(JSON.stringify(button))
//         break;
//
//       case 'text':
//         component = JSON.parse(JSON.stringify(text))
//         break;
//       case 'view':
//         component = JSON.parse(JSON.stringify(view))
//         break;
//       case 'image':
//         component = JSON.parse(JSON.stringify(image))
//         break;
//       case 'normalText':
//         component = JSON.parse(JSON.stringify(normalText))
//         break;
//     }
//     vNodeToDom(component)
//     // 遍历 并重新设置id
//     return component
//   }
// }
//
// let vNodeToDom = (node) => {
//   // 根据json。设置出来最单纯的block。
//   node.index = UtilTool.uuid(8, 16)
//   if (node.children && node.children.length > 0) {
//     node.children.forEach((node) => {
//       return vNodeToDom(node)
//     })
//   }
// }
//
// export default comLibrary
//
