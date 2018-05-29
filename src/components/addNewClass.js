import React from 'react'
import classLibrary from '../classData/index'


export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentType: 'center'
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
    let addClassJson = classLibrary.addClass(currentType)
    console.log(addClassJson)
    this.props.setCurrentClass(addClassJson)
  }

  render () {
    // 循环
    return <div className='choose-class-out'>
      {this.renderList()}
      {this.state.currentType }
      <style jsx>{`
        .choose-class-out {
          border: 1px solid black;
          display: flex;
          width: 300px;
          justify-content: space-between;
        }
      `}</style>
    </div>
  }
}