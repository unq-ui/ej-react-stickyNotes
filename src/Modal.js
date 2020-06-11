import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.selectedNote ? props.selectedNote.color : 'yellow',
      text: props.selectedNote ? props.selectedNote.text : '',
      id: props.selectedNote ? props.selectedNote.id : undefined,
    };
    this.colors = ['orange', 'blue', 'yellow', 'pink', 'green'];
  }

  updateText = ev => {
    this.setState({ text: ev.target.value });
  }

  addNote = () => {
    const { addNote, closeModal } = this.props;
    const { color, text, id } = this.state;
    addNote({ color, text, id });
    closeModal();
  }

  render() {
    const { colors } = this;
    const { color, text } = this.state;
    const { closeModal } = this.props;

    return (
      <div className="background">
        <div className="modal">
          <div className="modal__header">
            <img src="./img/delete.svg" alt="edit" className="icon" onClick={closeModal}/>
          </div>
          <div className="modal__content">
            <div className="colors">
              {colors.map(c => <div className={`color color--${c} ${c === color && 'color--active'}`} onClick={() => this.setState({ color: c })} />)}
            </div>
            <textarea type="text" value={text} onChange={this.updateText} maxlength="248" rows="7" />
            <div class="btn-modal" type="submit" onClick={this.addNote}>Save</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;