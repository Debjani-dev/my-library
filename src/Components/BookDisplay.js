import React , {Component} from 'react';
import book1 from '../book1.png';
import book2 from '../book2.png';
import book3 from '../book3.png';
import book4 from '../book4.png';
import book6 from '../book6.png';
import book7 from '../book7.png';
import book8 from '../book8.png';
import book9 from '../book9.jpeg';
import bookdefault from '../bookdefault.png';
//import logo from './logo.svg';

export default class BookDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      //books: this.props.books,
      book : this.props.book
    };
  }

  componentWillReceiveProps = (nextProps) => {
      if(this.state.book !== nextProps.book){
          this.setState({book : nextProps.book});
      }
  }

  render() {
    if (!this.props.show) {
        return null;
    }

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
    let imgSrc = imgList[this.state.book.image];
    if(this.state.book.image === ""){
        imgSrc = bookdefault;
    }
    
    return ( <div className="book_display">{this.state.book.title !== "" ?
     (<div> 
      <div>
          <h5>Book Details</h5>
      </div>
      <div class="add_book_fields">
       <div className="item_image"><img src={imgSrc} alt={this.state.book.title} className="App-logo"/></div>
       <div className="item_details">
       <div class="add_book_spacing">
        <label>Title</label>
        <div className="book_display_title">{this.state.book.title}</div>
       </div>
       <div class="add_book_spacing">
        <label>Author</label>
        <div className="book_display_title">{this.state.book.author}</div>
       </div>
       </div>
       <div class="add_book_spacing">
        <label>About the book</label>
        <div>{this.state.book.description}</div>
       </div>
      </div>
      
    </div>
     )
     :
     <div>Select a book to see details</div>
  }
  </div>

    );
  }
}
