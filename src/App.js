import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

// class Todos extends React.Component {
//   render() {
//     const { toDoList } = this.props;

//     return (
//       <ul className='todo-list'>
//         {toDoList.map((todo, index) => (
//           <li className='todo-items' key={index}>
//                {todo.content}
//                <input className="checkbox" type="checkbox" />
//                <FontAwesomeIcon className='close-icon' style={{color: '#eb9e67'}} icon={faXmark} />
//             </li>
//         ))}
//       </ul>
//     )
//   }
// }

function Todos({ toDoList, onDone }) {
  console.log("whole", toDoList);
  return (
    <ul className="todo-list">
      {toDoList.map((todo, index) => {
        console.log("single item", todo, index);
        return (
          <li
            className={"todo-items " + (todo.isDone ? "check" : "uncheck")}
            key={index}
          >
            {todo.content}
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.isDone}
              onChange={(event) => {
                const isDone = event.target.checked;
                onDone(isDone, todo, index);
              }}
            />
            <FontAwesomeIcon
              className="close-icon"
              style={{ color: "#eb9e67" }}
              icon={faXmark}
            />
          </li>
        );
      })}
    </ul>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: [
        {
          content: "sleeping",
          isDone: true,
        },
        {
          content: "rthrththth",
          isDone: true,
        },
        {
          content: "bgrbrgb",
          isDone: false,
        },
      ],
      textInput: "",
    };
  }

  handleIsDoneCheck = (isDone, todo, index) => {
    console.log(isDone, todo, index);
    const oldTodos = this.state.toDos;
    const newTodos = [...oldTodos];
    newTodos[index] = {
      ...todo,
      isDone
    };
    this.setState({toDos: newTodos})
  };

  handleInput = (event) => {
    const preText = event.target.value;
    this.setState({ textInput: preText });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const preText = this.state.textInput;
    const { toDos } = this.state;
    const newTodos = [
      {
        content: preText,
        isDone: false,
      },
      ...toDos,
    ];
    this.setState({ toDos: newTodos, textInput: "" });
  };

  render() {
    return (
      <div className="container">
        <h1>
          <span style={{ color: "#6db07e" }}>T</span>
          <span style={{ color: "#e38686" }}>O</span>
          <span style={{ color: "#eb9e67" }}>D</span>
          <span style={{ color: "#6db07e" }}>O</span>
          <span> </span>
          <span style={{ color: "#eb9e67" }}>L</span>
          <span style={{ color: "#e38686" }}>I</span>
          <span style={{ color: "#6db07e" }}>S</span>
          <span style={{ color: "#eb9e67" }}>T</span>
        </h1>
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              id="todo"
              name="todo"
              placeholder="What needs to be done?"
              value={this.state.textInput}
              onChange={this.handleInput}
              required
            />
            <FontAwesomeIcon
              className="icon"
              style={{ color: "#eb9e67" }}
              icon={faPlus}
            />
          </div>
          <Todos toDoList={this.state.toDos} onDone={this.handleIsDoneCheck} />
        </form>
      </div>
    );
  }
}

export default App;
