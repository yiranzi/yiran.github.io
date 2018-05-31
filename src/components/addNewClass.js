import React from 'react'
import classLibrary from '../classData/index'


export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentType: ''
    }
  }

  renderList () {
    let arr = classLibrary.staticIndex.map((className, index) => {
      return <div style={className === this.state.currentType ? {color: 'red'} : {}} key={className} onClick={() => {this.chooseClass(className)}}>{className}</div>
    })
    return <div>
      {arr}
    </div>
  }

  chooseClass (currentType) {

    this.setState({
      currentType: currentType
    })
    // console.log(addClassJson)
    // this.props.setCurrentClass(addClassJson)
  }

  plusClassTo () {
    if (this.state.currentType) {
      let addClassJson = JSON.parse(JSON.stringify(classLibrary.addClass(this.state.currentType)))
      // 去重
      let ifHave = this.props.node.classInfo.find((originClass) => {
        if (addClassJson.name === originClass.name) {
          return true
        }
      })
      if (!ifHave) {
        this.props.saveToCache()
        this.props.node.classInfo.push(addClassJson)
        this.props.updateClassName()
      }
    }
  }

  render () {
    // 循环
    return <div className='choose-class-out'>
      {this.renderList()}
      <div onClick={() => {this.plusClassTo()}}>导入样式</div>
      <style jsx>{`
        .choose-class-out {
          border: 1px solid black;
          display: flex;
          width: 150px;
          justify-content: space-between;
        }
      `}</style>
    </div>
  }
}