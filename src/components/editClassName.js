import React from 'react'
export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  nameChange (e, classNameIndex, classIndex) {
    this.change(e.target.value, 'name', classNameIndex, classIndex)
  }

  valueChange (e, classNameIndex, classIndex) {
    this.change(e.target.value, 'value', classNameIndex, classIndex)
  }

  classNameChange (e, classNameIndex) {
    this.change(e.target.value, 'class', classNameIndex)
  }

  classNameDelete (classNameIndex, classIndex) {
    this.change('', 'delete', classNameIndex, classIndex)
  }

  classNameAdd (classNameIndex) {
    this.change('', 'add', classNameIndex)
  }
  classNameAdd2 (classNameIndex) {
    this.change('', 'add2', classNameIndex)
  }

  classNameDelete2 (classNameIndex) {
    this.change('', 'delete2', classNameIndex)
  }

  change (value, ...a) {
    console.log('change')
    this.props.EditClassNameChange(value, ...a)
  }

  renderOneClass (className, classNameIndex) {
    let arr = className.map((oneClass, classIndex) => {
      return <div className={'out'} key={classIndex}>
        <input onChange={(e) => {this.nameChange(e, classNameIndex, classIndex)}} value={oneClass.name} />
        <input onChange={(e) => {this.valueChange(e, classNameIndex, classIndex)}} value={oneClass.value} />
        <div style={{marginLeft: '30px'}} onClick={() => {this.classNameDelete(classNameIndex, classIndex)}}>delete</div>
        <style jsx>{`
          .out {
            display: flex;
            width: 400px;
          }
        `}</style>
      </div>
    })
    return arr

  }

  renderClassNamesCard (classNames) {
    let arr = classNames.map((className, classNameIndex) => {
      return (<div key={classNameIndex} className='class-edit-div'>
        <div className='class-name'>
          <input onChange={(e) => {this.classNameChange(e, classNameIndex)}} value={className.name}/>
          <div onClick={() => {this.classNameAdd2(classNameIndex)}}>add</div>
          <div onClick={() => {this.classNameDelete2(classNameIndex)}}>delete</div>
        </div>
        {this.renderOneClass(className.styleArr, classNameIndex)}
        <div onClick={() => {this.classNameAdd(classNameIndex)}}>add</div>
        <style jsx>{`
          .class-name {
            width: 400px;
            border: 1px solid red;
            padding: 10px;
            display: flex;
            color: red;
            justify-content: space-between;
          }
        `}</style>
      </div>)
    })
    return arr
  }

  render () {
    let {classNameArr} = this.props
    console.log(classNameArr)
    // 循环
    return <div>
      {this.renderClassNamesCard(classNameArr)}
    </div>
  }
}