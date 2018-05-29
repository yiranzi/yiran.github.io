import React from 'react'
import EditClassName from '../components/editClassName'
import NodeToDom from '../components/nodeToDom'
import AddComponent from '../components/addComponent'

// container 承载了最顶层的node的增减修改大权。所有node属性修改都在这里完成。其他组件来担负渲染而已。

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.resetArr = []
    this.state = {
      currentDomIndex: 0
    }
    this.onSelectDom = this.onSelectDom.bind(this)
    this.updateNode = this.updateNode.bind(this)
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

  EditClassNameChange (node, value, type, classNameIndex, classIndex) {
    let classInfo = node.classInfo
    this.cachePush(this.props.node)
    switch (type) {
      case 'class':
        classInfo[classNameIndex].name = value;
        break;
      case 'name':
        classInfo[classNameIndex].styleArr[classIndex].name = value;
        break;
      case 'value':
        classInfo[classNameIndex].styleArr[classIndex].value = value;
        break;
      case 'delete':
        classInfo[classNameIndex].styleArr.splice(classIndex, 1);
        break;
      case 'add':
        classInfo[classNameIndex].styleArr.push({name: '', value: ''})
        break;
      case 'add2':
        classInfo.splice(classNameIndex + 1, 0, {name: 'no-name', styleArr: [{name: '', value: ''}]});
        break;
      case 'delete2':
        classInfo.splice(classNameIndex, 1);
        break;
    }
    this.props.updateNode(this.props.node)
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
        cArr.unshift(<EditClassName EditClassNameChange={(...e) => {this.EditClassNameChange(node, ...e)}} classNameArr={node.classInfo} />)
      }
        return cArr
    } else {
      if (node.classInfo) {
        return <EditClassName EditClassNameChange={(...e) => {this.EditClassNameChange(node, ...e)}} classNameArr={node.classInfo} />
      }
    }
  }

  onSelectDom (index) {
    this.setState({
      currentDomIndex: index
    })
  }


  updateNode (nextNode) {
    console.log(nextNode)
    this.saveToCache()
    this.props.updateNode(nextNode)
  }

  // 从组建库中添加组建。
  // 实现外部内部的删减。

  render () {
    let {node} = this.props
    // 循环
    return <div>
       <div>{this.state.currentDomIndex}</div>
      <NodeToDom onSelectDom={this.onSelectDom} node={node} />
      <AddComponent currentDomIndex={this.state.currentDomIndex} updateNode={this.updateNode} node={node}/>
      {this.renderClassArray(node)}
      <div onClick={() => {this.cacheReset()}}>还原</div>
    </div>
  }
}