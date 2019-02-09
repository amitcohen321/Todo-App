import React, { Component } from "react"
import TasksList from "../TasksList/TasksList"
import classes from "./Main.module.css"
import TaskInput from "../../components/TaskInput/TaskInput"
import axios from "axios"

class Main extends Component {
  state = {
    tasks: [
      {
        id: 1,
        taskText: "visit parents1",
        isCompleted: false,
        isEditMode: false
      }
    ],
    isInAddTaskMode: false,
    textBoxInput: null,
    isLoading: true,
    filter: "all" // /"completed"/"notcompleted"
  }

  // METHODS
  onTextChangeHandler = e => {
    const taskText = e.target.value
    this.setState({ textBoxInput: taskText })
  }
  taskAddHandler = e => {
    const taskObj = {
      id: Math.floor(Math.random() * 1000),
      taskText: this.state.textBoxInput,
      isCompleted: false
    }
    const arr = [...this.state.tasks]
    arr.push(taskObj)
    this.updateDB(arr)
    this.setState({ tasks: arr, textBoxInput: null, isInAddTaskMode: false })
  }

  taskCompletedHandler = id => {
    const arr = [...this.state.tasks]
    arr.forEach((el, i) => {
      if (el.id === id) {
        arr[i].isCompleted = !arr[i].isCompleted
      }
    })
    this.setState({ tasks: arr })
  }

  taskDeleteHandler = id => {
    const arr = [...this.state.tasks]
    let indexToDelete = arr.findIndex(task => task.id === id)
    arr.splice(indexToDelete, 1)
    this.updateDB(arr)
    this.setState({ tasks: arr })
  }

  addTaskHandler = () => {
    this.setState({ isInAddTaskMode: true })
  }

  editTaskHandler = id => {
    const arr = [...this.state.tasks]
    let taskObj = arr.find(task => task.id === id)
    taskObj.isEditMode = !taskObj.isEditMode
    this.setState({ tasks: arr })
  }
  updateTaskText = id => {
    const arr = [...this.state.tasks]
    let taskObj = arr.find(task => task.id === id)
    taskObj.taskText = this.state.textBoxInput
    taskObj.isEditMode = false
    this.setState({ tasks: arr })
  }

  filterHandler = filterStatus => {
    console.log(filterStatus)
    this.setState({ filter: filterStatus })
  }

  // FIREBASE
  updateDB = tasks => {
    axios
      .delete("https://todo-app-6e07c.firebaseio.com/tasks.json")
      .then(res => {
        console.log("[DB]: tasks deleted from db")
        axios
          .post("https://todo-app-6e07c.firebaseio.com/tasks.json", tasks)
          .then(response => {
            console.log("[DB : tasks posted to db")
          })
          .catch(error => console.log(error))
      })
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    axios
      .get("https://todo-app-6e07c.firebaseio.com/tasks.json")
      .then(res => {
        console.log("[DB]: tasks retrieved")
        this.setState({
          tasks: res.data[Object.keys(res.data)[0]],
          isLoading: false
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    // const filterBtnClasses = classes.filterItem + " " + classes.active
    // console.log(filterBtnClasses)

    return (
      <div className={classes.Container}>
        <h1
          style={{
            textAlign: "center",
            borderBottom: "1px solid black",
            padding: "20px 20px 20px 20px",
            margin: "0px"
          }}
        >
          Todo
        </h1>
        <div className={classes.FilterCont}>
          <div
            className={
              classes.filterItem +
              " " +
              (this.state.filter === "all" ? classes.active : "")
            }
            onClick={() => this.filterHandler("all")}
          >
            All
          </div>
          <div
            className={
              classes.filterItem +
              " " +
              (this.state.filter === "completed" ? classes.active : "")
            }
            onClick={() => this.filterHandler("completed")}
          >
            Completed
          </div>
          <div
            className={
              classes.filterItem +
              " " +
              (this.state.filter === "notcompleted" ? classes.active : "")
            }
            onClick={() => this.filterHandler("notcompleted")}
          >
            Not Completed
          </div>
        </div>
        <TasksList
          tasksList={this.state.tasks}
          filter={this.state.filter}
          taskDeleteFunc={this.taskDeleteHandler}
          taskCompleteFunc={this.taskCompletedHandler}
          taskEditFunc={this.editTaskHandler}
          onTextChangeHandler={this.onTextChangeHandler}
          updateTaskText={this.updateTaskText}
          isLoading={this.state.isLoading}
        />
        <TaskInput
          isInAddTaskMode={this.state.isInAddTaskMode}
          textChanged={this.onTextChangeHandler}
          taskAdded={this.taskAddHandler}
        />
        <button className={classes.BtnAdd} onClick={this.addTaskHandler}>
          +
        </button>
      </div>
    )
  }
}

export default Main
