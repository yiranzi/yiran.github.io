import React from 'react'
import EditClassName from '../components/editClassName'
import NodeToDom from '../components/nodeToDom'

// 这是方舟。他是node的控制工厂。

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.resetArr = []
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

  renderClassArray (node) {
    let {name, attrs, children, classInfo} = node
    console.log('renderClassArray')
    if (children) {
      let cArr = children.map((node, index) => {
        console.log(index)
        return this.renderClassArray(node)
      }) || []
      if (node.classInfo) {
        cArr.unshift(<EditClassName EditClassNameChange={(...e) => {this.EditClassNameChange(node, ...e)}} classNameArr={node.classInfo} />)
      }
        return cArr
    } else {
      if (node.classInfo) {
        console.log('haha')
        return <EditClassName EditClassNameChange={(...e) => {this.EditClassNameChange(node, ...e)}} classNameArr={node.classInfo} />
      }
    }
  }

  getClick () {
    console.log('getClick')
  }


  render () {
    let {node} = this.props
    // 循环
    return <div>
      <NodeToDom node={node}/>
      {this.renderClassArray(node)}
      <div onClick={() => {this.cacheReset()}}>还原</div>
    </div>
  }
}