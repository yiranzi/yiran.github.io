import Node from './node'
function Button () {
  let vnode = {}
  vnode.index = 1
  vnode.nodeType = 'button-1'
  vnode.name = 'div'
  vnode.attrs = {
    class: 'button-background button-border button-center button-font'
  }
  vnode.classInfo = this.makeStyleTestData(vnode.attrs.class)
  vnode.children = [{
    type: 'text',
    text: 123
  }]
  let button = new Node(vnode)
  return button
}

let classNameMap = new Map()

// 导出到全局map中。
function makeStyleTestData (classNameStr) {
  // 将str split转化成数组
  let classNameArr = classNameStr.trim().split(/\s+/)
  // 取出来每个class。并且去全局hash表中获取对应的值。
  let result = classNameArr.map((className) => {
    initClassNameMap(className)
    // 遍历这个对象。并将数值保存
    let classArr = []
    let aClass = {}
    classArr.push(aClass)
    aClass.name = className
    aClass.styleArr = classNameMap.get(className)
    return aClass
  })
  return result
}

function initClassNameMap (className) {
  // 初始化
  let arr = []
  switch (className) {
    case 'button-background':
      classAdd(arr, 'background-color', '#18BCE8');
      classAdd(arr, 'min-width', '80px');
      classAdd(arr, 'height', '28px');
      classAdd(arr, 'line-height', '28px');
      classAdd(arr, 'padding', '0px 5px');
      classAdd(arr, 'display', 'inline-block')
      break;
    case 'button-border':
      classAdd(arr, 'border-radius', '100px');
      classAdd(arr, 'box-shadow', '0px 2px 2px rgba(24,188,232,0.2)');
      break;
    case 'button-center':
      classAdd(arr, 'text-align', 'center');
      break;
    case 'button-font':
      classAdd(arr, 'color', 'white');
      classAdd(arr, 'font-size', '11px')
      break;
  }
  classNameMap.set(className, arr);
  // 编辑（插入，修改）
}

function classAdd (arr, key, value) {
  let obj = {
    name: key,
    value: value,
  }
  arr.push(obj)
}

function Button (string) {
  let button = new Node()
  button.nodeType = 'button-1'
  button.name = 'div'
  button.attrs['class'] = 'button-background button-border button-center button-font'
  button.classInfo = makeStyleTestData(button.attrs.class)
  button.children = [{
    type: 'text',
    text: string
  }]
  return button
}

export default Button
