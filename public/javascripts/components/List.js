import React from 'react'

class List extends React.Component {
  render () {
    let items = this.props.items
    let itemNodes = items.map(function (item) {
      return (
        <div key={item.title}>
          <h2>{item.title}</h2>
          <p>{item.data}</p>
        </div>
      )
    })

    return (
      <div className='list'>
        {itemNodes}
      </div>
    )
  }
}

export default List
