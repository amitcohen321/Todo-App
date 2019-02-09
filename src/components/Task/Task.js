import React from "react"
import classes from "./Task.css"

const task = props => {
  const text = props.isCompleted ? (
    <p>
      <strike>{props.taskText}</strike>
    </p>
  ) : (
    <p>{props.taskText}</p>
  )

  const textbox = (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={props.onTextChangeHandler}
        />
        <div className="input-group-append">
          <button
            onClick={props.updateTaskText}
            className="input-group-text"
            id="basic-addon2"
          >
            OK
          </button>
        </div>
      </div>
    </>
  )

  return (
    <li>
      <div className={classes.TaskCont}>
        {props.isEditMode ? textbox : text}
        {props.isEditMode ? null : (
          <div className="BtnCont">
            <i onClick={props.taskEditFunc} className="icon fas fa-edit" />
            <i
              onClick={props.taskDeleteFunc}
              className="icon far fa-times-circle"
            />
            <i
              onClick={props.taskCompleteFunc}
              className={
                props.isCompleted
                  ? "icon far fa-square"
                  : "icon far fa-check-square"
              }
            />
          </div>
        )}
      </div>
    </li>
  )
}

export default task
