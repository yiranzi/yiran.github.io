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

  addImg () {
    this.props.change(5, this.props.node.index)
  }

  addStyle () {
    this.props.change(2, this.props.node.index)
  }

  inputChange (e) {
    this.props.change(3, this.props.node.index, e.target.value)
  }

  imgChange (e) {
    this.props.change(6, this.props.node.index, e.target.value)
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
          <div className={'button'} onClick={() => {this.addImg()}}>加图</div>
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

  renderByType2 (src) {
    return <div>
      <div className={'button'} onClick={() => {this.addStyle()}}>样式</div>
      <input style={{color: 'inherit'}} value={src} onChange={(e) => {this.imgChange(e)}} />
      <div className={'button'} onClick={() => {this.addBr()}}>换行</div>
      <div className={'button'} onClick={() => {this.addImg()}}>加图</div>
    </div>
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
      case 'img-node-inner':
        return (
          <div style={outStyle} className={'out'}>
          <div className={'button'} onClick={() => {this.delete()}}>-</div>
          {this.renderByType2(this.props.node.attrs.src)}
          <div className={'button'} onClick={() => {this.add()}}>+</div>
          </div>
          )
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