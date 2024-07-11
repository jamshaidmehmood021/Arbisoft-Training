import { useContext } from "react"
import { FaTimes, FaEdit } from "react-icons/fa"
import { AppContext } from "../Context/AppContext";
import { useNavigate } from 'react-router-dom'

const Task = ({ task, onDelete, onToggle }) => {
  const { editTask, setEditTask, showAddForm, setShowAddForm, setEditedData } = useContext(AppContext);
  const navigate = useNavigate();

  const handeleOnEditClick = (currData) => {
    setEditTask(!editTask);
    setShowAddForm(!showAddForm)
    setEditedData(currData)

    navigate('/addTask');
  }

  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}>

      <div>
        <h3>
          {task.title} <div> <FaTimes style={{ color: 'red' }}
            cursor='pointer' onClick={() => onDelete(task.id)} />

            <FaEdit style={{ color: 'blue' }} cursor='pointer' onClick={() => handeleOnEditClick(task)} />
          </div>
        </h3>
        <p>{task.day}</p>
      </div>
    </div>
  )
}

export default Task
