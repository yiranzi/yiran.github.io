import React from 'react'
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
  }
  delete () {
    this.props.change(-1, this.props.node.index)
  }

  add () {
    this.props.change(1, this.props.node.index)
  }

  addBr () {
    this.props.change(0, this.props.node.index)
  }

  addStyle () {
    this.props.change(2, this.props.node.index)
  }

  inputChange (e) {
    console.log(e.target.value)
    this.props.change(3, this.props.node.index, e.target.value)
  }

  changeImage () {
    console.log('changeImage')
    this.props.change(4, this.props.node.index)
  }

  renderByType (myType) {
    switch (myType) {
      case 'content-arr':
        return <div>
          <div className={'button'} onClick={() => {this.addStyle()}}>样式</div>
          <input style={{color: 'inherit'}} value={this.props.children} onChange={this.inputChange} />
          <div className={'button'} onClick={() => {this.addBr()}}>换行</div>
        </div>
        break
      case 'br-arr':
        return <div>
          <div>换行</div>
        </div>
        break
      default:
        return this.props.children
    }
  }


  render () {
    let myType = this.props.node.myType
    let outStyle = this.props.outStyle

    switch (myType) {
      case 'inner-div':
        return this.props.children
        break
      case 'img-node':
        return <img src={this.props.node.attrs.src}/>
        break
      case 'out-div':
        return (
          <div style={outStyle} className={'out'}>
            <div className={"out-flex"}>
              <div className={'button'} onClick={() => {this.delete()}}>-</div>
              <div className={'button'} onClick={() => {this.add()}}>+</div>
              <div className={'button'} onClick={() => {this.changeImage()}}>换</div>
            </div>
            {this.renderByType(myType)}
          </div>
          )
        break
      default:
        return <div style={outStyle} className={'out'}>
          <div className={'button'} onClick={() => {this.delete()}}>-</div>
          {this.renderByType(myType)}
          <div className={'button'} onClick={() => {this.add()}}>+</div>
          <style jsx global>{`
          .block-br {

          }
          .out-flex {
            display: flex;
            flex-direction: column;
            justify-content: centerl
          }
        .out {
          display: flex;
          border: 1px solid black;
          align-items: center;
        }
        .content {
          display: flex;
          border: 1px solid green;
          align-items: center;
        }
        .button {
        border: 1px solid red;
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
        }
      `}</style>
        </div>
    }
  }
}