import { useState } from "react"
import Header from "./Header"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

function AddTask({onAdd}) {
    const [title , setTitle]=useState("")
    const [day , setDay]=useState(new Date().toLocaleString())
    const [reminder , setReminder]=useState(false)


    const onSubmitHandler = (e) => {
        e.preventDefault()

        if(!title)
        {
            alert("Please enter the value of Task")
        }
        if(!day)
        {
            alert("Please enter the value of Day")
        }

        onAdd({title, day, reminder})

        setTitle("")
        setDay("")
        setReminder(false)

    }

  return (
    <>
    <div>
        <Header title="Task Tracker"/>
    </div>
    <div>
    <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="form-control">
            <label>Task</label>
            <input type="text" 
            placeholder="Add Task Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label>Date</label>
            {/* the reason of using .toLocaleString() is that 
            react doesn't now hownto display the date object hence causeing issue */}
            <DatePicker selected={day} onChange={(date) => setDay(date.toLocaleString())} />
        </div>
        <div className="form-control form-control-check">
            <label>Reminder</label>
            <input type="checkbox" 
            //this line is because if this line is not added then it will not clear the reminder check box to unchc
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
            />
        </div>

        <input type="submit"  className="btn btn-block" value="Add Task" />
    </form>
    </div>
    </>
  )
}

export default AddTask
