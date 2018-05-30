import React from 'react'
import Block from './startInfoEditor/block'
import comLibrary from '../nodeData/index'

import NodeContainer from '../components/nodeContainer'
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      json: {},
      titleArr: [
        {
          title: '班主任： ',
          img: ' https://xiaozaoresource.xiaozao.org/learning/icon/%E7%8F%AD%E4%B8%BB%E4%BB%BB.png'
        },
        {
          title: '课程形式： ',
          img: ' https://xiaozaoresource.xiaozao.org/learning/icon/%E8%AF%BE%E7%A8%8B%E5%BD%A2%E5%BC%8F.png'
        },
        {
          title: '开课安排： ',
          img: ' https://xiaozaoresource.xiaozao.org/learning/icon/%E5%BC%80%E8%AF%BE%E5%AE%89%E6%8E%92.png'
        },
        {
          title: '上课地址： ',
          img: ' https://xiaozaoresource.xiaozao.org/learning/icon/%E4%B8%8A%E8%AF%BE%E5%9C%B0%E5%9D%80.png'
        },
        {
          title: '学习社群： ',
          img: 'https://xiaozaoresource.xiaozao.org/learning/icon/%E5%AD%A6%E4%B9%A0%E7%A4%BE%E7%BE%A4.png\n'
        },
        {
          title: '课程有效期： ',
          img: ' https://xiaozaoresource.xiaozao.org/learning/icon/%E8%AF%BE%E7%A8%8B%E6%9C%89%E6%95%88%E6%9C%9F.png'
        },
        {
          title: '课前预习： ',
          img: ' https://xiaozaoresource.xiaozao.org/learning/icon/%E8%AF%BE%E5%89%8D%E9%A2%84%E4%B9%A0.png'
        },
        {
          title: '课程福利： ',
          img: ' https://xiaozaoresource.xiaozao.org/learning/icon/%E8%AF%BE%E7%A8%8B%E7%A6%8F%E5%88%A9.png'
        },
        {
          title: '小灶寄语： ',
          img: 'https://xiaozaoresource.xiaozao.org/learning/icon/%E5%B0%8F%E7%81%B6%E5%AF%84%E8%AF%AD.png'
        },
      ],
      currentSelect: 0,
      strongStyle: 'color: red;',
      outputJson: ''
    }
    this.indexCount = 0
    this.defaultPath = '/pages/course/classroom/classroom'
    this.defaultName = '默认课程'
    this.change = this.change.bind(this)
  }



  componentWillMount () {
    this.jsToVNode()
  }

  nodeToEdit (json) {
    return json.nodes.map((item) => {
      return this.renderBlock(item)
    })
  }

  renderBlock (node) {
    // 根据json。设置出来最单纯的block。
    let {name, attrs, children, classInfo} = node
    let attrObj = this.transAttrToReact(attrs, classInfo)
    let {type, text} = node
    if (type === 'text') {
      return text
    } else {
      if (children) {
        let cArr = children.map((node, index) => {
          return this.renderBlock(node)
        })
          return <Block outStyle={attrObj.style} node={node} change={this.change}>{cArr}</Block>
      } else {
        return <Block outStyle={attrObj.style} node={node} change={this.change} />
      }
    }
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

  pushTopNode (item) {
    let a = {}
    a.index = this.indexCount++
    a.myType = 'out-div'
    a.name = 'div'
    a.attrs = {
      class: 'rich-p'
    }
    a.children = []
    a.children.push(this.pushIcon(item))
    a.children.push(this.pushTitle(item))
    return a
  }

  pushIcon (item) {
    let imgNode = {}
    imgNode.index = this.indexCount++
    imgNode.myType = 'img-node'
    imgNode.name = 'img'
    imgNode.attrs = {
      class: 'rich-img',
      src: item.img
    }
    return imgNode
  }

  pushTitle (item) {
    let divNode = {}
    divNode.index = this.indexCount++
    divNode.myType = 'inner-div'
    divNode.name = 'div'
    divNode.attrs = {
      class: 'rich-span',
    }
    divNode.children = []
    divNode.children.push(this.pushContent(item))
    return divNode
  }

  pushContent (item) {
    let divNode = {}
    divNode.index = this.indexCount++
    if (item) {
      divNode.myType = 'content-arr'
      divNode.name = 'span'
      divNode.attrs = {
        class: '',
      }
      divNode.children = [{
        type: 'text',
        text: item.title
      }]
    } else {
      divNode.myType = 'br-arr'
      divNode.name = 'br'
      divNode.attrs = {
        class: 'br-block',
      }
    }

    return divNode
  }

  // 遍历树 查找到目标
  getNode (nodes, findIndex) {
    let fakeNodes
    if (nodes.nodes && nodes.nodes.length > 0) {
      fakeNodes = nodes.nodes
    } else {
      fakeNodes = nodes.children
    }
    let findIt = false
    fakeNodes.every((item, index) => {
      if (item.index === findIndex) {
        findIt = {
          findNode: nodes,
          findPos: index,
        }
        return false
      } else if (item.children) {
        let result = this.getNode(item, findIndex)
        if (result) {
          findIt = result
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    })
    return findIt
  }

  outputFormat () {
    localStorage.setItem('saveWorld', JSON.stringify(this.state.json))
    console.log('重置之前。上次的结果已经保存。')
    let json = JSON.parse(JSON.stringify(this.state.json))
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
    let json = JSON.parse(JSON.stringify(this.state.json))
    this.setState({
      outputJson: JSON.stringify(json.classInfo)
    })
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
        let {type, text} = node
        if (type === 'text') {
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

  renderTitleArr () {
    let {titleArr} = this.state
    let arr = titleArr.map((item, index) => {
      return <div className={'block'} onClick={() => {this.chooseTitle(index)}}>
        <span>{item.title}</span>
        <img src={item.img}/>
        <style jsx>
          {`
            .block {
              border: 1px solid black;
            }
          `}
        </style>
        </div>
    })
    return (<div className={'fix-top'}>
        {arr}
      <style jsx>{`
          .fix-top {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 9999;
            background-color: blue;
          }
        `}</style>
      </div>)
  }

  chooseTitle (index) {
    this.setState({
      currentSelect: index,
    }, () => {
      this.change(4, this.state.currentNodeIndex)
    })
  }

  changeSetting (e, type) {
    if (type === 1) {
      let value = e.target.value
      let json = this.state.json
      json.path = value
      this.setState({
        json: json
      })
    } else {
      let value = e.target.value
      let json = this.state.json
      json.name = value
      this.setState({
        json: json
      })
    }
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

  change(type, index, content) {
    // 遍历json 获得节点 并且根据命令进行修改
    this.setState({
      currentNodeIndex: index
    })
    let result
    result = this.getNode(this.state.json, index)
    // 增加或者删除节点
    let {findNode, findPos} = result
    switch (type) {
      case -1:
        if (findNode.nodes) {
          findNode.nodes.splice(findPos, 1)
        } else {
          findNode.children.splice(findPos, 1)
        }
        break;
      case 1:
        // 判断节点类型。进行同级新增。
        let nodeType = findNode.myType
        switch (nodeType) {
          case 'out-father':
            findNode.nodes.splice(findPos+1, 0, this.pushTopNode(this.state.titleArr[this.state.currentSelect]))
            break
          case 'inner-div':
            findNode.children.splice(findPos+1, 0, this.pushContent({title: ''}))
            break
        }
        break;
      case 0:
        // 判断节点类型。进行同级新增。
        console.log('test')
        findNode.children.splice(findPos+1, 0, this.pushContent())
        findNode.children.splice(findPos+2, 0, this.pushContent({title: ''}))
        break;
      case 2:
        // 修改样式
        if (findNode.children[findPos].attrs.style) {
          findNode.children[findPos].attrs.style = ''
        } else {
          findNode.children[findPos].attrs.style = this.state.strongStyle
        }
        break
      case 3:
        // 修改内容
        findNode.children[findPos].children[0].text = content
        break
      case 4:
        if (this.state.showChoose) {
          let {currentSelect, titleArr} = this.state
          let {img, title} =  titleArr[currentSelect]
          // 更改标题 图片
          findNode.nodes[findPos].children[0].attrs.src = img
          findNode.nodes[findPos].children[1].children[0].children[0].text = title
        }
        this.setState({
          showChoose: !this.state.showChoose
        })

        break
    }
    this.setState({
      json: this.state.json
    })
  }

  renderSettingDiv () {
    return (
      <div>
        <h1>课程名称：<input style={{width: '400px'}} value={this.state.json.name} onChange={(e) => {this.changeSetting(e, 2)}} /></h1>
        <h1>课程路径：<input style={{width: '400px'}} value={this.state.json.path} onChange={(e) => {this.changeSetting(e, 1)}} /></h1>
        <div>强调样式设置：<input value={this.state.strongStyle} onChange={(e) => {this.setState({strongStyle: e.target.value})}} /></div>
      </div>
    )
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

  addView () {
    let json = this.state.json
    let vnode = {}
    vnode.index = 2
    vnode.nodeType = 'wx-view'
    vnode.name = 'div'
    vnode.attrs = {
      class: 'baby'
    }
    vnode.classInfo = [{name: 'classname', styleArr: [{name: 'background-color', value: 'red'}]}]
    vnode.children = [json]
    console.log(vnode)
    this.setState({
      json: vnode
    })
  }

  updateNode (node) {
    this.setState({
      json: node
    })
  }

  render () {
    return <div className={'out-out'} >
      {/*{this.renderSettingDiv()}*/}
      {/*{this.nodeToEdit(this.state.json)}*/}
      <NodeContainer node={this.state.json} updateNode={(...e) => {this.updateNode(...e)}} />
      {this.renderUserControl()}
      {/*{this.state.showChoose && this.renderTitleArr()}*/}
      <style>{`
        .flex {
          display: flex;
        }
        .out-out {
          background-color: #e5d6d6;
        }
        .flex > div {
          margin-right: 30px;
        }
        * {
          margin: 0
        }
        .rich-p {
          fontSize: 14px;
          color: #333333;
          line-height: 24px;
          margin: 20px auto;
        }
        .rich-img {
          height: 20px;
          height: 20px;
          vertical-align: top;
          margin-right: 10px;
        }
        .rich-span {
          vertical-align: top;
          display: inline-block;
          width: 78%
        }
      `}
      </style>
    </div>
  }
}
