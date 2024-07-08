import { useState } from "react"

function AddTask({onAdd}) {
    const [title , setTitle]=useState("")
    const [day , setDay]=useState("")
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
            <label>Day & Time</label>
            <input type="text" 
            placeholder="Add Day &Time" 
            value={day}
            onChange={(e) => setDay(e.target.value)}
            />
        </div>
        <div className="form-control form-control-check">
            <label>Reminder</label>
            <input type="checkbox" 
            //this line is because if this line is not added then 
            //it will not clear the reminder check box to unchecked
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
            />
        </div>

        <input type="submit"  className="btn btn-block" value="Add Task" />
    </form>
  )
}

export default AddTask
