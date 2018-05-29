import React from 'react'
import EditClassName from '../components/editClassName'
import NodeToDom from '../components/nodeToDom'
import AddComponent from '../components/addComponent'
import AddNewClass from '../components/addNewClass'

// container 承载了最顶层的node的增减修改大权。所有node属性修改都在这里完成。其他组件来担负渲染而已。

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.resetArr = []
    this.state = {
      currentDomIndex: 0,
      currenEditeDom: this.props.node,
      currentClassJson: []
    }
    this.onSelectDom = this.onSelectDom.bind(this)
    this.updateNode = this.updateNode.bind(this)
    this.saveToCache = this.saveToCache.bind(this)
    this.updateClassName = this.updateClassName.bind(this)
    this.setCurrentClass = this.setCurrentClass.bind(this)
  }

  cachePush (node) {
    let cacheNode = JSON.parse(JSON.stringify(node))
    if (this.resetArr.length >= 30) {
      this.resetArr.shift()
    }
    this.resetArr.push(cacheNode)
  }

  cacheReset () {
    if (this.resetArr.length > 0) {
      this.props.updateNode(this.resetArr.pop())
    } else {
      console.log('最多还原 x 步')
    }
  }

  saveToCache () {
    this.cachePush(this.props.node)
  }


  renderClassArray (node) {
    let {name, attrs, children, classInfo} = node
    if (children) {
      let cArr = children.map((node, index) => {
        return this.renderClassArray(node)
      }) || []
      if (node.classInfo) {
        cArr.unshift(<EditClassName EditClassNameChange={(...e) => {this.EditClassNameChange(node, ...e)}} classNameArr={node.classInfo} updateNode={this.updateNode} node={node} />)
      }
        return cArr
    } else {
      if (node.classInfo) {
        return <EditClassName EditClassNameChange={(...e) => {this.EditClassNameChange(node, ...e)}} classNameArr={node.classInfo} updateNode={this.updateNode} node={node} />
      }
    }
  }

  onSelectDom (node) {
    console.log('haha')
    this.setState({
      currentDomIndex: node.index,
      currenEditeDom: node
    })
  }


  updateNode (nextNode) {
    console.log(nextNode)
    this.saveToCache()
    this.props.updateNode(nextNode)
  }

  updateClassName () {
    console.log(this.props.node)
    this.props.updateNode(this.props.node)
  }

  setCurrentClass (classJson) {
    console.log(classJson)
    this.setState({
      currentClassJson: classJson
    })
  }

  // 从组建库中添加组建。
  // 实现外部内部的删减。

  render () {
    let {node} = this.props
    // 循环
    return <div>
       <div>当前选中的ID：{this.state.currentDomIndex}</div>
      <div onClick={() => {this.cacheReset()}}>还原</div>
      <NodeToDom onSelectDom={this.onSelectDom} node={node} />
      <EditClassName currentClassJson={this.state.currentClassJson} node={this.state.currenEditeDom} saveToCache={this.saveToCache} updateClassName={this.updateClassName} />
      <AddComponent currentDomIndex={this.state.currentDomIndex} updateNode={this.updateNode} node={node}  />
      <AddNewClass setCurrentClass={this.setCurrentClass} />
    </div>
  }
}