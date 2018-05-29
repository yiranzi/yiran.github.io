import Node from './node'

function Button (string) {
  let wxView = new Node()
  wxView.nodeType = 'wx-view'
  wxView.name = 'div'
  wxView.attrs['class'] = ''
  wxView.classInfo = []
  wxView.children = []
  return wxView
}

export default Button
