import React from "react"
import classes from "./TaskInput.module.css"

const taskInput = props => {
  const addTaskPart = props.isInAddTaskMode ? (
    <div className={classes.AddTaskCont}>
      <input type="text" className="someclass" onChange={props.textChanged} />
      <button onClick={props.taskAdded} value="click">
        Add
      </button>
    </div>
  ) : null

  return addTaskPart
}
export default taskInput
