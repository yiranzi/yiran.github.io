import Node from './node'

function View (string) {
  let wxView = new Node()
  wxView.nodeType = 'wx-view'
  wxView.name = 'div'
  return wxView
}

export default View
