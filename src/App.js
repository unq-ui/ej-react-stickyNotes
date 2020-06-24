import React from 'react';
import './App.css';

import stickyNotes from './stickyNotes.json';
import StickyNote from './StickyNote';
import Modal from './Modal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: stickyNotes,
      showModal: false,
      selectedNote: null,
    };
  }

  removeNote = id => {
    const newNotes = this.state.notes.filter(note => note.id !== id);
    this.setState({ notes: newNotes });
  }

  addNote = note => {
    let newNotes;

    if(note.id) {
      newNotes = this.state.notes.map(n => {
        if (n.id === note.id) {
          return { ...note }
        }
        return n;
      });
    } else {
      newNotes = [{ ...note, id: this.state.notes.length + 1 }, ...this.state.notes];
    }
    this.setState({ notes: newNotes, selectedNote: null });
  }

  openModal = () => {
    this.setState({ showModal: true });    
  }

  closeModal = () => {
    this.setState({ showModal: false });    
  }

  editNote = note => {
    this.setState({
      selectedNote: note,
      showModal: true,
    })
  }

  render() {
    const { notes, showModal, selectedNote } = this.state; 
    return (
      <>
        <div className="container">
          {notes.map(note => <StickyNote key={note.id} note={note} removeNote={this.removeNote} editNote={() => this.editNote(note)} />)}
        </div>
        <div className="btn-add-note">
          <img src="./img/add.svg" alt="add new note" className="icon--add" onClick={this.openModal} />
        </div>
        {showModal && <Modal closeModal={this.closeModal} addNote={this.addNote} selectedNote={selectedNote} />}
      </>
    );
  }
}

export default App;
