import React from "react";

import Task from "./Task"

const Tasks = ({tasks , onDelete , onToggle}) => {
  
    //console.log(tasks)
  return (
    <div>
      <h2>Tasks</h2>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
        ))}
      </div>
    </div>
  )

}

export default Tasks
