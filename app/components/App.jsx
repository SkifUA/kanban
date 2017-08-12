import React from 'react';
import Notes from './Notes';
import uuid from 'uuid';

import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    };
  }

  addNote = () => {

      this.props.NoteActions.create({
          id: uuid.v4(),
          task: 'New task'
      });
  }

  render() {
      const {notes} = this.props;
    return (
      <div>

        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />

      </div>
    );
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    this.props.NoteActions.delete(id);
  }

  activateNoteEdit = (id) => {
    this.props.NoteActions.update({id, editing: true});
  }

  editNote = (id, task) => {
    this.props.NoteActions.update({id, task, editing: false});
  }
}

export default connect(({notes}) => ({
    notes
}), {
    NoteActions
})(App)