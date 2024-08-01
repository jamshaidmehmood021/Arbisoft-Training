import React from "react";

import Task from "./Task"
import Header from "./Header";
import { useSelector } from "react-redux";

const Tasks = () => {
  const tasks = useSelector((state) => state.task)

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
              <Task key={task.id} task={task}/>
            ))) :
              ("No Task to Show")
          }
        </div>
      </div>
    </>
  )

}

export default Tasks;
