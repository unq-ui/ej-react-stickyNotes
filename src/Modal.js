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
            <h2 className="header">Sticky Note</h2>
            <div className="colors">
              {colors.map(c => (
                <div key={c} className={`color color--${c}`} onClick={() => this.setState({ color: c })}>
                  <img className={`check ${c === color && 'check--showIcon'}`} src="img/check.svg" alt="check" />
                </div>
              ))}
            </div>
          </div>
          <div className="modal__content">
            <div className={`textarea__container color--${color}`}>
              <textarea type="text" value={text} onChange={this.updateText} maxLength="248" rows="7" />
            </div>
            <div className="btns">
              <div className="btn-modal" type="submit" onClick={closeModal}>Cancel</div>
              <div className="btn-modal" type="submit" onClick={this.addNote}>Save</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;