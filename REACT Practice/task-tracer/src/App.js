import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';

function App() {
  const [showAddForm , setShowAddForm] = useState(false)

  const [tasks , setTask ] = useState([
    {
        id : 1,
        title : "Meeting at arbisoft",
        day : "Mon july 8 , 10:30 AM",
        reminder : true
    },
    {
        id : 2,
        title : "REACT Crash Course Completions",
        day : "Mon july 8 , 7:00 PM",
        reminder : true
    },
    {
        id : 3,
        title : "Lunch",
        day : "Mon july 8 , 1:00 PM",
        reminder : false
    }
])

// add task
const addTask = (task) =>{
  //console.log(task)

  // fetch the id of last element in the array and add 1 to it for new id
  const id = tasks[tasks.length - 1].id +1
   
  //console.log(tasks)
  //console.log(id)
  const newTask = {id, ...task}
  //console.log(newTask)
  setTask([...tasks, newTask])
}
// for deleting the items in the array
const deleteTask = (id) =>{
  //console.log("in delete function present in app.js", id)
  setTask(tasks.filter( (task) => task.id !== id))

}

// for toggling the list 
const toggle = (id)=>{
  //console.log("in the toggle function" , id)
  setTask(tasks.map( (task) => task.id === id ? 
  {...task , reminder: !task.reminder} 
  : task ))
}

  return (
    <div className="container">
      <Header title="Task Tracker" 
      onAddForm={(() => setShowAddForm(!showAddForm))}
      showAddForm={showAddForm}/>
      {showAddForm && <AddTask onAdd={addTask}/>}
      { tasks.length > 0  ? 
      (<Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggle}/>) 
      : ("No Task to Show") }
    </div>
  );
}

export default App;
