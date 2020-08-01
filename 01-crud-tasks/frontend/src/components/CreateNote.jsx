import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    // para saber si se esta editando
    editing: false,
    _id: "",
  };
  componentDidMount() {
    this.getUsers();
    let id = this.props.match.params.id;
    if (id) {
      this.getUser(id);
    }
  }
  async getUser(id) {
    try {
      const res = await axios.get("http://localhost:4000/api/notes/" + id);
      let noteReceived = res.data.note;
      this.setState({
        title: noteReceived.title,
        content: noteReceived.content,
        date: new Date(noteReceived.date),
        userSelected: noteReceived.author,
        _id: noteReceived._id,
        editing: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getUsers() {
    try {
      let res = await axios.get("http://localhost:4000/api/users");
      this.setState({
        users: res.data.users.map((user) => user.username),
        userSelected: res.data.users[0].username,
      });
      console.log(this.state.userSelected);
      //console.log(this.state.stateResponse);
    } catch (err) {
      console.log(err);
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    let note = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.userSelected,
      date: this.state.date,
    };
    if (this.state.editing) {
      this.updateNote(note);
    } else {
      this.saveNote(note);
      this.cleanState();
    }
    window.location.href = "/";
  };

  // saved note
  async saveNote(newNote) {
    try {
      let res = await axios.post("http://localhost:4000/api/notes", newNote);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  // updated note
  async updateNote(updatedNote) {
    try {
      let res = await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id,
        updatedNote
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  cleanState() {
    this.setState({
      title: "",
      content: "",
      author: "",
      date: "",
    });
  }

  // capturar el cambio dentro del select
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // puso el mismo nombre de select en el state
  };
  // personalizado para cambiar la fecha
  onChangeDate = (date) => {
    this.setState({ date });
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          <form onSubmit={this.onSubmit}>
            {/* SELECT USERS */}
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.userSelected}
                onChange={this.onInputChange}
                name="userSelected"
                required
              >
                {this.state.users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            {/* Note Title */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                onChange={this.onInputChange}
                name="title"
                value={this.state.title}
                required
              />
            </div>
            {/* Note Content */}
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Content"
                name="content"
                onChange={this.onInputChange}
                value={this.state.content}
                required
              ></textarea>
            </div>
            {/* Note Date */}
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateNote;
