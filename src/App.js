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
        this.setState({ books })
      })
  }
  shelfChanger = (book, shelf) => {
    BooksAPI.update(book, shelf).then((book) => {
      BooksAPI.getAll()
        .then((books) => {
          this.setState({ books })
        })
    }).catch((e) => console.log(e))
  }

  BookShelfFind(id) {
    let shelve = this.state.books.filter((book) => book.id === id)
    
    return (shelve.length !== 0) ? shelve[0].shelf : 'none'
  }

  booksSearch = (query) => {
    (query) ? BooksAPI.search(query)
      .then((books) => {
        if(books.error) {
          this.setState({
            searchedBooks: []
          })
          return
        }
        let newBooks = books.map((book) => {
          book.shelf = this.BookShelfFind(book.id)
          return book
        })
        this.setState({ searchedBooks: newBooks })
      }).catch((e) => {
        console.log('Error')
      })
      : this.setState({
        searchedBooks: []
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
