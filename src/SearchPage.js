import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchPage extends Component {
  shelfChange(book, e) {
    this.props.onShelfChange(book, e.target.value)
  }
  handleChange = (e) => {
    this.props.onSearch(e.target.value)
  }

  render() {
    return (
    	<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input onChange={this.handleChange} type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.props.books === [] ? (<div> </div>) : this.props.books.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover"
                            style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(e) => this.shelfChange(book, e)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
    )
  }
}

export default SearchPage