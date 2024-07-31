import { useContext, useState } from "react"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

import Header from "./Header"
import { AppContext } from "../Context/AppContext"

function AddTask({ onAdd }) {
    const [day, setDay] = useState(new Date().toLocaleString());
    const { editTask } = useContext(AppContext);
    const { editedData } = useContext(AppContext);
    const [title, setTitle] = useState(editedData.title);
    const [reminder, setReminder] = useState(editedData.reminder);
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (!title) {
            alert("Please enter the value of Task")
        }
        if (!day) {
            alert("Please enter the value of Day")
        }

        onAdd({ id: editedData.id, title, day, reminder })

        setTitle("")
        setDay("")
        setReminder(false)

    }

    return (
        <>
            <div>
                <Header title="Task Tracker" />
            </div>
            <div>
                <form className="add-form" onSubmit={onSubmitHandler}>
                    <div className="form-control">
                        <label>Task</label>
                        <input type="text"
                            placeholder={editTask ? editedData.title : "Add Task Title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Date</label>
                        {/* the reason of using .toLocaleString() is that 
            react doesn't now hownto display the date object hence causeing issue */}
                        <DatePicker selected={editTask ? editedData.day : day} onChange={(date) => setDay(date.toLocaleString())} />
                    </div>
                    <div className="form-control form-control-check">
                        <label>Reminder</label>
                        <input type="checkbox"
                            //this line is because if this line is not added then it will not clear the reminder check box to unchchecked
                            checked={reminder}
                            value={reminder}
                            onChange={(e) => setReminder(e.currentTarget.checked)}
                        />
                    </div>

                    <input type="submit" className="btn btn-block" value={editTask ? "Edit Task" : "Add Task"} />
                </form>
            </div>
        </>
    )
}

export default AddTask;
