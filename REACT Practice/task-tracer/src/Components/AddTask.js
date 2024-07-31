import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";


import Header from "./Header";

import { add } from "../Store/taskSlice";
import {toogleEditTask} from "../Store/appSlice"

const AddTask = () => {
    const dispatch = useDispatch();
    const { editTask, editedData } = useSelector((state) => state.app);

    const [title, setTitle] = useState("");
    const [day, setDay] = useState(new Date().toLocaleString());
    const [reminder, setReminder] = useState(false);

    useEffect(() => {
        if (editTask && editedData) {
            setTitle(editedData.title);
            setDay(editedData.day);
            setReminder(editedData.reminder);
        }
    }, [editTask, editedData]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!title) {
            alert("Please enter the value of Task");
            return;
        }
        if (!day) {
            alert("Please enter the value of Day");
            return;
        }

        if (!editTask) {
            const newTask = { id: Date.now(), title, day, reminder };
            dispatch(add({ type: 'insert', data: newTask }));
        } else {
            const updatedTask = { id: editedData.id, title, day, reminder };
            dispatch(add({ type: 'edit', data: updatedTask }));
        }

        dispatch(toogleEditTask())
        setTitle("");
        setDay(new Date().toLocaleString());
        setReminder(false);
    };

    return (
        <>
            <div>
                <Header title="Task Tracker" />
            </div>
            <div>
                <form className="add-form" onSubmit={onSubmitHandler}>
                    <div className="form-control">
                        <label>Task</label>
                        <input
                            type="text"
                            placeholder="Add Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Date</label>
                        <DatePicker
                            selected={new Date(day)}
                            onChange={(date) => setDay(date.toLocaleString())}
                        />
                    </div>
                    <div className="form-control form-control-check">
                        <label>Reminder</label>
                        <input
                            type="checkbox"
                            checked={reminder}
                            value={reminder}
                            onChange={(e) => setReminder(e.currentTarget.checked)}
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-block"
                        value={editTask ? "Edit Task" : "Add Task"}
                    />
                </form>
            </div>
        </>
    );
}

export default AddTask;
