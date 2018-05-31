import React from 'react'
import Block from './startInfoEditor/block'
import comLibrary from '../nodeData/index'

import NodeContainer from '../components/nodeContainer'
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      json: {},
      currentDom: {},
      outputJson: ''
    }
    this.changeCurrentDom = this.changeCurrentDom.bind(this)
  }

  componentWillMount () {
    this.jsToVNode()
  }


  formatDelete (nodes) {
    // delete nodes.index
    // delete nodes.myType
    if (nodes.children) {
      nodes.children.forEach((node) => {
        // delete node.index
        // delete node.myType
        let {name, attrs, children} = node
        let attrObj ={}
        if (attrs) {

        }
        let {nodeType, text} = node
        if (nodeType === 'node-text') {
        } else {
          if (children) {
            children.forEach((node, index) => {
              return this.formatDelete(node)
            })
          } else {
          }
        }
      })
    }
  }

  renderUserControl () {
    return (
      <div className={"flex"}>
        <div>
          <div style={{display: 'flex'}}><div onClick={() => {this.outputFormat()}}>组件导出</div><input value={this.state.outputJson} /></div>
          <div style={{display: 'flex'}}><div onClick={() => {this.outputClassFormat()}}>样式导出</div><input value={this.state.outputJson} /></div>
        </div>
        <div onClick={() => {this.jsToVNode()}}>一键重置</div>
        <div>
          <div style={{display: 'flex'}}>
            <div onClick={() => {this.resetLast(0)}}>还原</div>
            <input value={this.state.inputJson} onChange={(e) => {this.setState({inputJson: e.target.value})}}/>
            <div onClick={() => {this.resetLast(1)}}>导入</div>
          </div>
        </div>
      </div>
    )
  }

  updateNode (node) {
    this.setState({
      json: node
    })
  }

  changeCurrentDom (currentDom) {
    this.setState({
      currentDom: currentDom
    })
  }


  outputFormat () {
    localStorage.setItem('saveWorld', JSON.stringify(this.state.currentDom))
    console.log('重置之前。上次的结果已经保存。')
    let json = JSON.parse(JSON.stringify(this.state.currentDom))
    json.classInfo.forEach((oneClass) => {
      let arr = []
      oneClass.styleArr.forEach((oneClass) => {
        if (oneClass.name && oneClass.value) {
          arr.push(oneClass)
        }
      })
    })
    // json.classInfo.styleArr = arr
    // 开始格式化处理
    // json.nodes.forEach((node) => {
    //   this.formatDelete(node)
    // })
    this.setState({
      outputJson: JSON.stringify(json)
    })
  }


  outputClassFormat () {
    let json = JSON.parse(JSON.stringify(this.state.currentDom))
    this.setState({
      outputJson: JSON.stringify(json.classInfo)
    })
  }

  // 如何新增一个顶部节点。如何删除一个顶部节点？

  // 图片和标题是一一对应的。可以点击更换

  jsToVNode () {
    // 保存最后一次数据
    localStorage.setItem('saveWorld', JSON.stringify(this.state.json))
    console.log('重置之前。上次的结果已经保存。')
    let node = comLibrary.newComponent('view')
    this.setState({
      json: node
    })
  }


  resetLast (type) {
    // 导入
    if (type === 1) {
      let json = this.state.inputJson
      this.setState({
        json: JSON.parse(json),
        inputJson: json,
      })
    } else {
      // 还原
      let json = localStorage.getItem('saveWorld')
      this.setState({
        json: JSON.parse(json),
        inputJson: json,
      })
    }
  }

  render () {
    return <div className={'out-out'} >
      <NodeContainer node={this.state.json} changeCurrentDom={this.changeCurrentDom} updateNode={(...e) => {this.updateNode(...e)}} />
      {this.renderUserControl()}
      <style>{`
        * {
          margin: 0
        }
        .flex {
          display: flex;
        }
        .out-out {
          background-color: #e5d6d6;
        }
      `}
      </style>
    </div>
  }
}
