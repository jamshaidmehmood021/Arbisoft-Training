import { FaTimes, FaEdit } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import {toogle,remove } from "../Store/taskSlice";
import {toogleEditTask, setEditedData, toggleAddForm} from "../Store/appSlice"


const Task = ({ task}) => {
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handeleOnEditClick = (currData) => {
    
    dispatch(toogleEditTask())
    dispatch(setEditedData(currData))
    dispatch(toggleAddForm())
    navigate('/addTask');
  }

  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => dispatch(toogle(task.id))}>

      <div>
        <h3>
          {task.title} <div> <FaTimes style={{ color: 'red' }}
            cursor='pointer' onClick={() => dispatch(remove(task.id))} />

            <FaEdit style={{ color: 'blue' }} cursor='pointer' onClick={() => handeleOnEditClick(task)} />
          </div>
        </h3>
        <p>{task.day}</p>
      </div>
    </div>
  )
}

export default Task
