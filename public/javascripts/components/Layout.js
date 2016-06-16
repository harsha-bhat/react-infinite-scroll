import React from 'react'
import List from './List'
import Sidebar from './Sidebar'
import 'whatwg-fetch'

var articleHeight = 100;
var sidebarHeight = 800;

class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      loading: false,
      articles: [],
      top: 0
    }
  }

  scrollListener(e) {
    var scrollTop = e.srcElement.scrollingElement.scrollTop;
    if (window.innerHeight + scrollTop >= sidebarHeight) {
      this.setState({top: scrollTop + window.innerHeight - sidebarHeight})
    } else {
      this.setState({top: scrollTop})
    }
    if (this.state.index*articleHeight < scrollTop) {
      if (!this.state.loading) {
        this.state.loading = true
        this.loadNextItem((function(){
          this.state.loading = false
        }).bind(this))
      }
    }
  }

  loadNextItem(callback) {
    fetch('/api?index=' + this.state.index)
    .then(function(res) {
      return res.json();
    }).then((function(json) {
      var articles = this.state.articles
      articles.push(json)
      var index = this.state.index + 1
      this.setState({articles: articles, index:index})
      if (callback) {
        callback()
      }
    }).bind(this))
  }

  componentDidMount() {
    var that = this
    that.loadNextItem(function() {
      that.loadNextItem(function() {
        that.loadNextItem()
      })
    })
    window.addEventListener('scroll', this.scrollListener.bind(that))
  }

  render () {
    return (
      <div className='layout'>
        <List items={this.state.articles}></List>
        <Sidebar top={this.state.top}></Sidebar>
      </div>
    )
  }
}

export default Layout
