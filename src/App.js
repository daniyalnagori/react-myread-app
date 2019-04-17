import React from 'react'
import BooksList from './BooksList'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
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
              <SearchPage />
            )}
			/>
        </div>
    )
  }
}

export default BooksApp
