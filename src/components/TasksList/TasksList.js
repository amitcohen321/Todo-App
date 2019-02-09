import React from "react"
import Task from "../Task/Task"
import classes from "./TasksList.module.css"

const tasksList = props => {
  let filteredTasksList = []

  if (props.filter === "completed") {
    filteredTasksList = props.tasksList.filter(
      task => task.isCompleted === true
    )
    console.log(filteredTasksList)
  } else if (props.filter === "notcompleted") {
    filteredTasksList = props.tasksList.filter(
      task => task.isCompleted === false
    )
    console.log(filteredTasksList)
  } else filteredTasksList = props.tasksList

  const tasks = filteredTasksList.map(task => {
    return (
      <Task
        taskText={task.taskText}
        isCompleted={task.isCompleted}
        isEditMode={task.isEditMode}
        taskDeleteFunc={() => props.taskDeleteFunc(task.id)}
        taskCompleteFunc={() => props.taskCompleteFunc(task.id)}
        onTextChangeHandler={props.onTextChangeHandler}
        taskEditFunc={() => props.taskEditFunc(task.id)}
        updateTaskText={() => props.updateTaskText(task.id)}
        key={task.id}
      />
    )
  })

  return props.isLoading ? (
    <div className={classes.Loader} />
  ) : (
    <ul className={classes.TasksList}>{tasks}</ul>
  )
}

export default tasksList
