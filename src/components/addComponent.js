import React from 'react'
import comLibrary from '../factory/index'


export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOutAdd: true,
      currentType: 'view'
    }
  }

  addComponent (e, classNameIndex, classIndex) {
    this.change(e.target.value, 'name', classNameIndex, classIndex)
  }

  add () {
    let {isOutAdd, currentType} = this.state
    let newDom = comLibrary.newComponent(currentType)
    let {currentDomIndex, node} = this.props
    let nodeShadow = Object.assign({}, node)
    let findDom = this.getNode(nodeShadow, currentDomIndex)
    if (findDom.father && findDom.targetDom) {
      if (isOutAdd) {
        if (findDom.father.index === findDom.targetDom.index) {
          newDom.children.push(findDom.father)
          this.props.updateNode(newDom)
        } else {
          findDom.father.children.push(newDom)
          this.props.updateNode(nodeShadow)
        }
      } else {
        findDom.targetDom.children.push(newDom)
        this.props.updateNode(nodeShadow)
      }
    } else {
      console.log('not found')
    }
  }

  delete () {

  }

  findNode () {

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

  // 添加外部。
  // 添加内部。
  // 删除当前。
  // 回调的时候。设置好node。设置好变更了的current

  // 这边还要实现。组件选择功能。（组建复用）

  // 那边要实现全局样式引入。（样式复用）

  // 最后实现导出view(html导出)

  // 还有全局css去重导出（全局css复用，修改）

  // 还有页面级别的css去重导出（局部css扩展性）

  // 还有要支持样式回拼（基础css + 页面css + 页面布局。或者是，保存vdom。而且还有维护好vdom和全局静态的关系）
  renderList () {
    let arr = comLibrary.staticIndex.map((comName, index) => {
      return <div style={comName === this.state.currentType ? {color: 'red'} : {}} key={comName} onClick={() => {this.chooseComponent(comName)}}>{comName}</div>
    })
    return <div>
      {arr}
    </div>
  }

  chooseComponent (comName) {
    this.setState({
      currentType: comName
    })
  }

  renderCanPressButton (type) {
    let style = {}
    let pressStatus = {
      backgroundColor: 'red'
    }
    if (type === 'out' && this.state.isOutAdd) {
      style = pressStatus
    }
    if (type === 'inner' && !this.state.isOutAdd) {
      style = pressStatus
    }
    return <div className='press-button' onClick={() => {this.onButtonPress(type)}} style={style}>
      {type}
      <style jsx>{`
        .press-button {
          width: 100px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background-color: white;
          color: black;
        }
      `}</style>
      </div>
  }

  onButtonPress (type) {
    if (type === 'out') {
      this.setState({
        isOutAdd: true
      })
    } else {
      this.setState({
        isOutAdd: false
      })
    }
  }

  render () {
    // 循环
    return <div className='choose-component-out'>
      <div className='choose-button'>
        {this.renderCanPressButton('out')}
        {this.renderCanPressButton('inner')}
      </div>
      {this.renderList()}
      <div onClick={() => {this.add()}}>添加</div>
      <div onClick={() => {this.delete()}}>删除</div>
      <style jsx>{`
        .choose-button {
          border: 1px solid black;
          display: flex;
          width: 300px;
          justify-content: space-between;
        }
        .choose-component-out {
          border: 1px solid black;
        }
      `}</style>
    </div>
  }
}