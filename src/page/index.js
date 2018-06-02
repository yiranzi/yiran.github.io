import React from 'react'

// import AxiosUtil from '../util/axios'

import {LibProvider, Lib} from '../context/componentsLib'

import NodeContainer from '../components/nodeContainer'
export class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      json: undefined,
      currentDom: undefined,
      outputJson: '',
      outputClassJson: ''
    }
    this.changeCurrentDom = this.changeCurrentDom.bind(this)
    this.updateClass = this.updateClass.bind(this)
    this.changeName = this.changeName.bind(this)

  }

  componentWillMount = async () => {
    await this.props.libContext.updateLib('vnode')
    await this.props.libContext.updateLib('class')
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

  outputAll () {
    // this.outputFormat(this.state.json)
    // this.outputClassFormat(this.state.json)
  }

  changeName (e) {
    let {currentDom} = this.state
    currentDom.pageName = e.target.value
    this.setState({
      currentDom: currentDom
    })
  }

  renderUserControl () {
    if (this.state.currentDom) {
      return (
        <div className={""}>
          <div>
            <div style={{display: 'flex'}}><div onClick={() => {this.outputAll()}}>根节点输出小程序</div></div>
            <div style={{display: 'flex'}}><input value={this.state.currentDom.pageName || ''} onChange={this.changeName} /><div onClick={() => {this.outputFormat()}}>当前节点保存vnode</div></div>
            <div style={{display: 'flex'}}><div>vnode：</div><input value={this.state.outputJson} /></div>
            <div style={{display: 'flex'}}><input value={JSON.stringify(this.props.libContext.copyClass)} /><div onClick={() => {this.props.libContext.postLib(this.props.libContext.copyClass, 'class')}}>保存class</div></div>
          </div>
          <div onClick={() => {this.jsToVNode()}}>一键重置</div>
          <div>
            <div style={{display: 'flex'}}>
              <div onClick={() => {this.resetLast(0)}}>还原</div>
              <input value={this.state.inputJson} onChange={(e) => {this.setState({inputJson: e.target.value})}}/>
              <div onClick={() => {this.resetLast(1)}}>导入</div>
              <div onClick={this.updateClass}>净化</div>
            </div>
          </div>
        </div>
      )
    }
  }

  updateClass () {
    const loop = (node) => {
      let {children} = node
      if (node.classInfo) {
        node.classInfo.forEach((item, index) => {
          if (item.name.includes('zao') || item.name.includes('default')) {
            node.classInfo[index] = this.props.libContext.getLib(item.name, 'class') || node.classInfo[index]
          }
        })
      }
      if (children && children.length) {
        children.forEach((node) => {
          loop(node)
        })
      }
    }
    loop(this.state.json)
    this.setState({
      json: this.state.json,
      currentDom: this.state.json
    },() => {
      this.outputFormat()
    })
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


  outputFormat (json = this.state.currentDom) {
    if (this.state.currentDom.pageName) {
      localStorage.setItem('saveWorld', JSON.stringify(this.state.json))
      console.log('重置之前。上次的结果已经保存。')
      json = JSON.parse(JSON.stringify(json))
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
      this.props.libContext.postLib(this.state.currentDom, 'vnode')
    } else {
      console.error('no name')
    }
  }


  outputClassFormat (json = this.state.currentDom) {
    json = JSON.parse(JSON.stringify(json))
    // 遍历
    let arr = [

    ]
    const getClassLoop = (node) => {
      if (node.classInfo) {
        arr = arr.concat(node.classInfo)
      }
      if (node.children) {
        node.children.forEach((item) => {
          getClassLoop(item)
        })
      }
    }
    getClassLoop(json)
    // this.jsonToCss(arr)
    this.setState({
      outputClassJson: JSON.stringify(arr)
    })
    // this.postClassData(arr)
  }

  // postClassData = async (arr) => {
  //   // 准备发起请求。
  //   console.log('try')
  //   let name = arr[0].name
  //   let type = 'class'
  //   let data = JSON.stringify(arr[0])
  //   console.log(data)
  //   // let courseInfo = await AxiosUtil.get(`write?type=${type}&name=${name}&data=${data}`)
  //   let courseInfo = await AxiosUtil.post(`write`, {name, type, data})
  // }

  jsonToCss (jsonArr) {
    let afterUnique = {}
    let string = ''
    // 1 遍历去重
    const unique = (arr) => {
      arr.forEach((item) => {
        afterUnique[item.name] = item.styleArr
      })
    }
    const pipe = (classInnerArr, subString) => {
      classInnerArr.forEach((classInner) => {
        let {name, value} = classInner
        subString += name + ': ' + value + ';'
      })
      return subString
    }
    unique(jsonArr)
    Object.keys(afterUnique).forEach((classNameKey) => {
      let subString = ''
      subString = pipe(afterUnique[classNameKey], subString)
      string += '.' + classNameKey + `{${subString}}`
    })
  }

  // 如何新增一个顶部节点。如何删除一个顶部节点？

  // 图片和标题是一一对应的。可以点击更换

  jsToVNode () {
    // 保存最后一次数据
    localStorage.setItem('saveWorld', JSON.stringify(this.state.json))
    console.log('重置之前。上次的结果已经保存。')
    let node = this.props.libContext.getLib('view', 'vnode')
    this.setState({
      json: node,
      currentDom: node,
    })
  }

  resetLast (type) {
    // 导入
    if (type === 1) {
      let json = this.state.inputJson
      this.setState({
        json: JSON.parse(json),
        currentDom: JSON.parse(json),
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
    return <div className={'out-out'}>
      <div>当前选中的ID：{this.state.currentDom && this.state.currentDom.index}</div>
      <div>当前选中的ID：{this.state.currentDom && this.state.currentDom.pageName}</div>
        {this.state.json && <NodeContainer node={this.state.json} libContext={this.props.libContext} changeCurrentDom={this.changeCurrentDom} updateNode={(...e) => {this.updateNode(...e)}} />}
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

export default function (props) {
  return <LibProvider>
    <Lib.Consumer>
      {libContext => (<Index libContext={libContext} {...props} />)}
    </Lib.Consumer>
  </LibProvider>
}
