import React , {Component} from 'react';

export default class DeleteModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      book : this.props.book,
      books : this.props.books
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.state.books !== nextProps.books){
        this.setState({books : nextProps.books});
    }
    if(this.state.book !== nextProps.book){
        this.setState({book : nextProps.book});
    }
    if(this.state.show !== nextProps.show){
        this.setState({show : nextProps.show});
    }
  }

  onCancel = (evt) => {
    this.props.cancelDelete();
  }

  onDelete = (evt) => {
    //let booksAfterDelete  = this.state.books.filter(book => book.title !== this.state.title);
    this.props.onDeleteFinal(this.state.book);
  }
  

  render() {
    if (!this.props.show) {
        return null;
    }
    return (
     <div> 
      <div className="overlay">
          <div className="detete_dialog">
              <div>Are you sure about deleting<h4>{this.state.book.title}</h4>?</div>
              <div className="modal_buttons">
                <button onClick={(evt) => {this.onCancel(evt)}}>Cancel</button>
                <button className="delete_ok" onClick={(evt) => {this.onDelete(evt)}}>OK</button>
              </div>
          </div>
          
      </div>
        
    </div>
    );
  }
}
