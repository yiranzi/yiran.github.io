import React from 'react'
import AxiosUtil from '../util/axios'
import ToolsUtil from '../util/tools'

export const Lib = React.createContext()

export class LibProvider extends React.Component {
  constructor (props) {
    super(props)
    this.updateLib = async (type) => {
      let res = await AxiosUtil.get(`/getListData?type=${type}`)
      switch (type) {
        case 'vnode':
          this.vnodeFilter(res)
          break
        case 'class':
          this.setState({
            classLibrary: res
          })
          break
      }
      return res
    }

    this.postLib = async (data, type) => {
      let name
      if (type === 'vnode') {
        name = data.pageName
        let afterUpdateList = await AxiosUtil.post(`write`, {name, type, data})
        this.vnodeFilter(afterUpdateList)
      } else {
        name = data.name
        let afterUpdateList = await AxiosUtil.post(`write`, {name, type, data})
        this.setState({
          classLibrary: afterUpdateList
        })
      }
    }

    this.getLib = (name, type) => {
      switch (type) {
        case 'vnode':
          // 判断
          if (name.includes('page')) {
            return this.beforeAddNode(this.state.pageLibrary[name])
          } else {
            return this.beforeAddNode(this.state.vnodeLibrary[name])
          }
          break
        case 'class':
          return ToolsUtil.getClone(this.state.classLibrary[name])
          break
      }
    }

    this.changeCopyClass = (copyClass) => {
      this.setState({
        copyClass: copyClass
      })
    }

    this.state = {
      classLibrary: {}, // 课程列表
      vnodeLibrary: undefined, // 课程列表
      pageLibrary: {}, // 课程列表
      copyClass: {},
      getLib: this.getLib, // 获取
      updateLib: this.updateLib, // 更新
      postLib: this.postLib, // 更新
      changeCopyClass: this.changeCopyClass // 更新
    }
    this.vnodeFilter = this.vnodeFilter.bind(this)
  }
  // 内部使用的。
  /**
   * 为原始数据，增加上课程状态。
   * over 结束
   * finish 已完成
   * doing 正在做
   * @param originCourseList
   * @returns {*}
   */

  vnodeFilter (res) {
    // 1筛选。
    let pageObj = {}
    let componentsObj = {}
    Object.keys(res).forEach((name) => {
      if (name.includes('page')) {
        pageObj[name] = res[name]
      } else {
        componentsObj[name] = res[name]
      }
    })
    // 2 分类保存
    this.setState({
      vnodeLibrary: componentsObj,
      pageLibrary: pageObj
    })
  }

  beforeAddNode (node) {
    let nodeShadow = ToolsUtil.getClone(node)
    this.vNodeToDom(nodeShadow)
    return nodeShadow
  }

  // 引入前需要重新
  vNodeToDom (node) {
    // 根据json。设置出来最单纯的block。
    node.index = ToolsUtil.uuid(8, 16)
    if (node.children && node.children.length > 0) {
      node.children.forEach((node) => {
        return this.vNodeToDom(node)
      })
    }
  }

  render () {
    return (
      <Lib.Provider value={this.state}>
        {this.props.children}
      </Lib.Provider>
    )
  }
}
