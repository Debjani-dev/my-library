import React , {Component} from 'react';
import AddBook from './AddBook';
import DeleteModal from './DeleteModal';
import BookDisplay from './BookDisplay';
import BookEdit from './BookEdit';
import book1 from '../book1.png';
import book2 from '../book2.png';
import book3 from '../book3.png';
import book4 from '../book4.png';
import book6 from '../book6.png';
import book7 from '../book7.png';
import book8 from '../book8.png';
import book9 from '../book9.jpeg';
import bookdefault from '../bookdefault.png';
import axios from "axios";


export default class Books extends Component {
  constructor(props){
    super(props);
    this.state = {
      books : [],
      showAddBook: false,
      showDeleteModal: false,
      showDisplay: true,
      showEdit: false,
      deleteTitle: "",
      deleteBook: {},
      shownBook: {"title":"", "description": "", "author":"", "image":""}
    };
  }
  onAddNewBook = (evt) => {
      this.setState({showAddBook: true})
  }

  componentWillMount() {
    let book= this.state.shownBook;
    let type= "get";
    this.getData(book, type);
  }

  getData = (book, type) => {
    let url = "http://localhost:3001/books"
    fetch(url)
      .then(resp =>  resp.json())
      .then(data => {
        
        let showDisplay = data.length > 0 ? true : false;
        this.setState({books: data, showDisplay: showDisplay});
        let shownBook = {};
        if(type === "add"){
            shownBook  = data.find((item) => { 
                return item.title === book.title ;
            });
        }else if (type === "update"){
            shownBook  = book;
        }else if(type === "get"){
            shownBook = data[0];
        }else if(type === "delete"){
            
            shownBook = this.state.shownBook.id === book.id ? data[0] : this.state.shownBook;
        }
        console.log(shownBook);
        //let shownBook = data.find((book) => { return !book.id : book});
        this.setState({shownBook: shownBook});
      });
  }

  displayBooks = () => {
    let booksList  = [];
    let imgList = {
        "book1" : book1,
        "book2" : book2,
        "book3" : book3,
        "book4" : book4,
        "book6" : book6,
        "book7" : book7,
        "book8" : book8,
        "book9" : book9,
        "bookdefault" : bookdefault
    };
    if(this.state.books.length > 0){
        booksList  = this.state.books.map((book, index) => {
            let style = {
                highlightShownBook : this.state.shownBook.title === book.title ? { 'background-color': '#dddddd' } :{'background-color': '#ffffff' }
            }; 
            
            let imgSrc = imgList[book.image];
            if(book.image === ""){
                imgSrc = bookdefault;
            }
            return (
            <div className="book_item" key={index}>
            <div className="item_image"> <img src={imgSrc} className="App-logo" alt={book.title} onClick={(evt) => this.onShowBook(book)}/></div>
             <div className="item_details" style={style.highlightShownBook}>
              <h5 className="book_title" onClick={(evt) => this.onShowBook(book)}>{book.title}</h5>
              <p className="book_author">Written By: {book.author}</p>
              <div className="book_delete" onClick={(evt) => this.onDeleteBook(book)}>Delete</div>
              </div>
            </div>
            )
          
        });
        return booksList;
    }else{
        return (<div>No books</div>);
    }
    
  }

  onAdd = (book) => {
    // this.setState({books: books, showAddBook: false});
    axios.post('http://localhost:3001/books', book).then(() => {
        let type = "add";
        this.getData(book, type);
        this.setState({showAddBook: false});    
    }).catch(error => {
        console.log(error);
    }); 
  }

  onDeleteBook = (book) => {
      this.setState({showDeleteModal : true, deleteBook: book})
  
  }

  onDeleteFinal = (book) => {
    /*if(this.state.deleteTitle == this.state.shownBook.title){
        this.setState({shownBook: {"title":"", "description": "", "author":"", "image":""}});
    }*/
    let id = book.id;
    let url = 'http://localhost:3001/books/'+id;
    let type= "delete";
    axios.delete(url).then(() => {
        this.getData(book, type);
        this.setState({showDeleteModal: false});    
    }).catch(error => {
        console.log(error);
    }); 
    //this.setState({books: books, showDeleteModal: false});
  }

  cancelDelete = () => {
      this.setState({showDeleteModal: false , deleteBook: {}});

  }

  onShowBook = (book) => {
    this.setState({shownBook: book});
  }

  cancelAdd = () => {
    this.setState({showAddBook: false});
  }

  onEditBook = () => {
    this.setState({showEdit: true, showDisplay: false});
  }

  onUpdate = (book, update) => {
    let id = book.id;
    let url = 'http://localhost:3001/books/'+id;
    let type= "update";
    axios.put(url, book).then(() => {
        this.getData(book, type);
        this.setState({showEdit: false, showDisplay: true});    
    }).catch(error => {
        console.log(error);
    }); 
      //this.setState({books: books, shownBook: book, showEdit: false, showDisplay: true});

  }

  onCancelEdit = () => {
    this.setState({showEdit: false, showDisplay: true});
  }

  render() {
    let style = {
        hideShowEditText: this.state.showDisplay ? { display: 'block' } : {display: 'none' }
    }; 
    return (
      <div className="book_list">
        <div className="row">
        
        <div className="col-8"> 
         <div className="row">
            <div className="col-12"><h3>List of Books</h3></div>
            <div className="col-6 books_list">
                {this.displayBooks()}
            </div>
            <div className="col-6 book_details">
              <div className="book_edit" onClick={(evt) => this.onEditBook()} style={style.hideShowEditText}>Edit Book</div>
              <BookDisplay
                book={this.state.shownBook}
                show={this.state.showDisplay}
              />
              <BookEdit
                book={this.state.shownBook}
                show={this.state.showEdit}
                onUpdate={this.onUpdate}
                onCancelEdit={this.onCancelEdit}
                books={this.state.books}
              />
            </div>
          </div>
        </div>
        <div className="book_add col-4">
            <div onClick={(evt) => this.onAddNewBook()}><h3>Add Book</h3></div>
        </div>
        </div>
        <AddBook
          show={this.state.showAddBook}
          onAdd = {this.onAdd}
          books={this.state.books}
          cancelAdd={this.cancelAdd}
        />
        <DeleteModal
          show={this.state.showDeleteModal}
          book={this.state.deleteBook}
          books={this.state.books}
          onDeleteFinal={this.onDeleteFinal}
          cancelDelete={this.cancelDelete}
        />
     </div>
    );
  }
}
