import React from "react";

import Task from "./Task"
import Header from "./Header";

const Tasks = ({ tasks, onDelete, onToggle, onEdit }) => {

  // sconsole.log(tasks)
  return (
    <>
      <div>
        <Header title="Task Tracker" />
      </div>
      <div>
        <h2>Tasks</h2>
        <div>
          {
            tasks.length > 0 ? (tasks.map((task) => (
              <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))) :
              ("No Task to Show")
          }
        </div>
      </div>
    </>
  )

}

export default Tasks
