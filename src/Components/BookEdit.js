import React , {Component} from 'react';
//import logo from './logo.svg';

export default class BookEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: this.props.books,
      book : this.props.book
    };
  }

  onValueChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState((prevState) => {
        prevState.book[name] = value;
        return {
            book: prevState.book
        };
    });
  }

  componentWillReceiveProps = (nextProps) => {
      if(this.state.books !== nextProps.books){
          this.setState({books : nextProps.books});
      }
      if(this.state.book !== nextProps.book){
        this.setState({book : nextProps.book});
    }
  }

  onSubmit = (evt) => {
    //let books = this.state.books;
    //books.push(this.state.book);
    //books = books.map((book, index) => { return book.id == this.state.book.id ? this.state.book : book; });
    this.props.onUpdate(this.state.book);
    //this.setState({books: books, book:{"title":"", "description": "", "author":"", "image":""}});
  }

  onCancel = () => {
    this.props.onCancelEdit();
  }
  

  render() {
    if (!this.props.show) {
        return null;
    }
    return (
     <div> 
      <div>
          <h5>Edit Book</h5>
      </div>
      <div class="add_book_fields">
       <div class="add_book_spacing">
        <label>Title</label>
        <input placeholder="Title" value={this.state.book.title} name="title" onChange={(evt) => {this.onValueChange(evt)}}></input>
       </div>
       <div class="add_book_spacing">
        <label class="label_descrption">Description</label>
        <textarea placeholder="Description" value={this.state.book.description} name="description" onChange={(evt) => {this.onValueChange(evt)}}></textarea>
       </div>
       <div class="add_book_spacing">
        <label>Author</label>
        <input placeholder="Author" value={this.state.book.author} name="author" onChange={(evt) => {this.onValueChange(evt)}}></input>
       </div>
       <div class="add_book_spacing">
        <label>Image</label>
        <input placeholder="Image name" value={this.state.book.image} name="image" onChange={(evt) => {this.onValueChange(evt)}}></input>
       </div>
      </div>
      <div class="edit_buttons">
          <button type="button" className="add_submit" onClick={(evt) => {this.onSubmit(evt)}} disabled={!this.state.book.title || !this.state.book.description || !this.state.book.author}>Update</button>
          <button type="button" className="add_cancel" onClick={(evt) => {this.onCancel(evt)}}>Cancel</button>
      </div>
    </div>
    );
  }
}
