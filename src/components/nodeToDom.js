import React from 'react'
export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  // 这个神奇的函数。可以利用react的函数，
  // 将任何形式的（jsx，vnode）转化成实实在在的dom节点，并用react引擎完成渲染

  // 从这角度上理解jsx 他只是描述dom节点并生成的一种快捷方式。 他会被解析 然后在用createElement函数渲染。
  // 而vdom的生成，可以使用editor 也可以使用图形化界面。我们完全有能力维护正常的vdom
  vNodeToDom (node) {
    // 根据json。设置出来最单纯的block。
    let {name, attrs, children, classInfo, index} = node
    let attrObj = this.transAttrToReact(attrs, classInfo)
    // 增加选中效果
    attrObj = JSON.parse(JSON.stringify(attrObj))
    if (index === this.props.currentDomIndex) {
      attrObj.style.border = '1px dashed #848282'
    }
    let {nodeType, text} = node
    if (nodeType === 'node-text') {
      return text
    } else {
      if (children) {
        let cArr = children.map((node, index) => {
          return this.vNodeToDom(node)
        })
        // return cArr
        this.addControl(node, attrObj)
        return React.createElement(name, attrObj, cArr);
      } else {
        this.addControl(node, attrObj)
        return React.createElement(name, attrObj);
      }
    }
  }

  addControl (node, attrs) {
    attrs.onClick = (e) => {
      this.props.onSelectDom(node.index)
      e.stopPropagation()
    }
  }

  transAttrToReact (attrs, classInfo) {
    let attrObj = {
      style: {}
    }
    if (attrs) {
      let {style, src, onClick} = attrs
      // class是保留字
      if (attrs['class']) {
        attrObj.className = attrs['class']
        // 从样式中取出。
        this.classStringToStyle(attrObj.style, style)
      }
      // classInfo动态注入到style样式中
      if (classInfo) {
        // 每个class
        classInfo.forEach((oneClass) => {
          oneClass.styleArr.forEach((styleString) => {
            this.arrToStyle(attrObj.style, [styleString.name, styleString.value])
          })

        })
      }
      // 将输入的style样式转换为react的style
      if (style) {
        this.classStringToStyle(attrObj.style, style)
      }
      if (src) {
        attrObj.src = src
      }
      if (onClick) {
        attrObj.onClick = onClick
      }

    }
    return attrObj
  }

  classStringToStyle (attrObj, styleString) {
    // 1 删除掉空格
    if (styleString) {
      styleString = styleString.replace(/\s+/g,"")
      // 3 分割
      let arrStyle = styleString.split(/:|;/)
      this.arrToStyle(attrObj.style, arrStyle)
    }
  }

  //
  arrToStyle (attrObj, arrStyle) {
    for (let i = 0; i < arrStyle.length; i = i+2) {
      let keyString = arrStyle[i]
      let valueString = arrStyle[i + 1]
      let afterKeyString = ''
      if (keyString && valueString) {
        // 2 转换掉斜杠
        let needToUpper = false
        for (let j = 0; j < keyString.length; j++) {
          let char = keyString[j]
          if (needToUpper) {
            needToUpper = !needToUpper
            char = char.toUpperCase()
          } else {
            if (char === '-') {
              char = ''
              needToUpper = !needToUpper
            }
          }
          afterKeyString += char
        }
      }
      // 可以增加单位换算。
      let wxRpx = valueString.split('rpx')
      console.log('hehehe')
      if (wxRpx && wxRpx.length > 1) {
        let value = wxRpx[0]
        let unit = wxRpx[1]
        value = value / 2
        unit = 'px'
        valueString = value + unit
      }
      attrObj[afterKeyString] = valueString
    }
  }

  render () {
    if (this.props.node) {
      return <div className='node'>
        {this.vNodeToDom(this.props.node)}
        <style jsx>{`
          .node {
            width: 375px;
            min-height: 367px;
            background-color: #ffffff;
          }
        `}</style>
      </div>
    } else {
      return null
    }
  }
}