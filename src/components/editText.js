import React from 'react'
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
  }

  inputChange (e) {
    let value = e.target.value
    this.props.saveToCache()
    this.props.node.text = value
    this.props.updateClassName()
  }

  render () {
    // 循环
    return <div>
      <input style={{width: '300px', height: '30px'}} value={this.props.node.text} onChange={this.inputChange} />
    </div>
  }
}