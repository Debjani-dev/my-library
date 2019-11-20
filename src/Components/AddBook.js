import React , {Component} from 'react';
//import logo from './logo.svg';

export default class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      //books: this.props.books,
      book : {"title":"", "description": "", "author":"", "image":""}
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
  }

  onSubmit = (evt) => {
    let books = this.state.books;
    //books.push(this.state.book);
    this.props.onAdd(this.state.book);
    this.setState({books: books, book:{"title":"", "description": "", "author":"", "image":""}});
  }

  onCancel = () => {
    this.props.cancelAdd();
  }
  

  render() {
    if (!this.props.show) {
        return null;
    }
    return (
     <div class="add_book"> 
      <div class="add_book_header">
          <h5>Add a New Book</h5>
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
      <div>
          <button type="button" className="add_submit" onClick={(evt) => {this.onSubmit(evt)}} disabled={!this.state.book.title || !this.state.book.description || !this.state.book.author}>Submit</button>
          <button type="button" className="add_cancel" onClick={(evt) => {this.onCancel(evt)}}>Cancel</button>
      </div>
    </div>
    );
  }
}
