import React from 'react'
import {Lib}from '../context/componentsLib'

export class AddComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentType: ''
    }
  }

  addComponent (e, classNameIndex, classIndex) {
    this.change(e.target.value, 'name', classNameIndex, classIndex)
  }

  add () {
    let {currentType} = this.state
    let newDom = this.props.libContext.getLib(currentType, 'vnode')
    let {currentDomIndex, node} = this.props
    let nodeShadow = JSON.parse(JSON.stringify(node))
    let findDom = this.getNode(nodeShadow, currentDomIndex)
    if (findDom.father && findDom.targetDom) {
      // if (isOutAdd) {
      //   if (findDom.father.index === findDom.targetDom.index) {
      //     newDom.children.push(findDom.father)
      //     this.props.updateNode(newDom)
      //   } else {
      //     newDom.children.push(findDom.targetDom)
      //     findDom.father.children.splice(findDom.childrenIndex, 1, newDom)
      //     this.props.updateNode(nodeShadow)
      //   }
      // } else {
      //
      // }

      findDom.targetDom.children.push(newDom)
      this.props.updateNode(nodeShadow)
    } else {
      console.warn('not found')
    }
  }

  delete () {
    let {currentDomIndex, node} = this.props
    let nodeShadow = JSON.parse(JSON.stringify(node))
    let findDom = this.getNode(nodeShadow, currentDomIndex)

    if (findDom.father && findDom.targetDom) {
      // 他是否是根节点？
      if (findDom.father.index !== findDom.targetDom.index) {
        // 更换绑定。
        findDom.father.children.splice(findDom.childrenIndex, 1)
        this.props.updateNode(nodeShadow)
      }
    } else {
      console.log('not found')
    }
  }

  // 遍历树 查找到目标
  getNode (node, findIndex) {
    if (node.index === findIndex) {
      // 查找到
      if (node.index === this.props.node.index) {
        // 如果就是本人
        return {
          father: node,
          childrenIndex: -1,
          targetDom: node,
        }
      } else {
        return false
      }
    } else {
      let findElement = true
      if (node.children) {
        node.children.every((item, index) => {
          let result = this.getNode(item, findIndex)
          if (result === true ) {
            return true
          } else if (result === false) {
            // 如果查找到
            findElement = {}
            findElement.father = node
            findElement.childrenIndex = index
            findElement.targetDom = item
            return false
          } else {
            findElement = result
            return false
          }
        })
      }
      return findElement
    }
  }

  // 还有全局css去重导出（全局css复用，修改）
  // 还有页面级别的css去重导出（局部css扩展性）
  // 还有要支持样式回拼（基础css + 页面css + 页面布局。或者是，保存vdom。而且还有维护好vdom和全局静态的关系）
  renderList () {
    let arr = []
    for (let nodeName in this.props.libContext.vnodeLibrary) {
      arr.push(<div style={nodeName === this.state.currentType ? {color: 'red'} : {}} key={nodeName} onClick={() => {this.chooseComponent(nodeName)}}>{nodeName}</div>)
    }
    return <div>
      {arr}
    </div>
  }

  renderPageList () {
    let arr = []
    for (let nodeName in this.props.libContext.pageLibrary) {
      arr.push(<div style={nodeName === this.state.currentType ? {color: 'red'} : {}} key={nodeName} onClick={() => {this.chooseComponent(nodeName)}}>{nodeName}</div>)
    }
    return <div>
      {arr}
    </div>
  }

  chooseComponent (comName) {
    this.setState({
      currentType: comName
    })
  }

  // renderCanPressButton (type) {
  //   let style = {}
  //   let pressStatus = {
  //     backgroundColor: 'red'
  //   }
  //   if (type === 'out' && this.state.isOutAdd) {
  //     style = pressStatus
  //   }
  //   if (type === 'inner' && !this.state.isOutAdd) {
  //     style = pressStatus
  //   }
  //   return <div className='press-button' onClick={() => {this.onButtonPress(type)}} style={style}>
  //     {type}
  //     <style jsx>{`
  //       .press-button {
  //         width: 100px;
  //         height: 20px;
  //         text-align: center;
  //         line-height: 20px;
  //         background-color: white;
  //         color: black;
  //       }
  //     `}</style>
  //     </div>
  // }

  // onButtonPress (type) {
  //   if (type === 'out') {
  //     this.setState({
  //       isOutAdd: true
  //     })
  //   } else {
  //     this.setState({
  //       isOutAdd: false
  //     })
  //   }
  // }

  render () {
    // 循环
    return <div className='choose-component-out'>
      {this.renderList()}
      {this.renderPageList()}
      <div className='button'>
        <div onClick={() => {this.add()}}>添加</div>
        <div onClick={() => {this.delete()}}>删除</div>
      </div>
      <style jsx>{`
        .choose-component-out {
          border: 1px solid black;
          width: 150px;
          position: relative;
        }
        .button {
          position: absolute;
          top: 0;
          right: 0;
        }
      `}</style>
    </div>
  }
}

export default function (props) {
  return <Lib.Consumer>
    {libContext => (<AddComponent libContext={libContext} {...props} />)}
  </Lib.Consumer>
}