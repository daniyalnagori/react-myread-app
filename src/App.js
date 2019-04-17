import React from 'react'
import BooksList from './BooksList'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  shelfChanger = (book, shelf) => {
    BooksAPI.update(book, shelf).then((book) => {
      BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books
          }))
        })
    })
  }
  booksSearch = (query) => {
    if(query === '') {
      this.setState(() => ({
        searchedBooks: []
      }))
    }
    BooksAPI.search(query).then((b) => {
      if(Array.isArray(b)){
        this.setState(() => ({
          searchedBooks: b
        }))
      }
    })
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BooksList
            books={this.state.books}
            onShelfChange={this.shelfChanger}
          />
        )}
        />
        <Route exact path='/search' render={() => (
          <SearchPage
            books={this.state.searchedBooks}
            onSearch={this.booksSearch}
            onShelfChange={this.shelfChanger} />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
