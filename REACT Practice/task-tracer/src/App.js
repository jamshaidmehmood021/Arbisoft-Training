import { useState , useContext } from 'react';
import './App.css';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import ApiData from './Components/ApiData';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AppContext } from './Context/AppContext';

function App() {

  const { showAddForm, showApiData, setShowAddForm, setShowApiData } = useContext(AppContext);


  const [tasks , setTask ] = useState(
  [{
    id: 1,
    title: "Meeting at arbisoft",
    day: "Mon July 8, 10:30 AM",
    reminder: true
  },
  {
    id: 2,
    title: "REACT Crash Course Completions",
    day: "Mon July 8, 7:00 PM",
    reminder: true
  },
  {
    id: 3,
    title: "Lunch",
    day: "Mon July 8, 1:00 PM",
    reminder: false
  } 
])


// add task
const addTask = (task) => {
  console.log(task)

  // console.log(tasks)

  // fetch the id of last element in the array and add 1 to it for new id
  const id = tasks[tasks.length - 1].id + 1;
  const newTask = { id, ...task };

  setTask([...tasks, newTask]);
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
  <BrowserRouter>
      <Routes>
          <Route path="/" 
          element={ <Header title="Task Tracker" 
          onAddForm={(() => 
            setShowAddForm(!showAddForm)  
          )}
          showAddForm={showAddForm}
          onShowApiData = {() => setShowApiData(!showApiData)}/>} 
          />
          <Route path="/addTask" 
          element={showAddForm && <AddTask onAdd={addTask}/>} />

          <Route path ="/tasks"
          element = {    
            <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggle}/> }
            />

          <Route path = "/showData" 
          element = {showApiData && <ApiData/>} />

          
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
