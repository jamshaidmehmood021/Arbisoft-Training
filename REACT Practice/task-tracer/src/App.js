import './App.css';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import ApiData from './Components/ApiData';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toggleAddForm, toggleApiData} from "./Store/appSlice";
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  const { showAddForm, showApiData} = useSelector((state) => state.app);
  
  return (
    <div className="container">
      
        <BrowserRouter>
          <Routes>
            <Route path="/"
              element={<Header title="Task Tracker"
                onAddForm={(() =>
                  dispatch(toggleAddForm())
                )}
                showAddForm={showAddForm}
                onShowApiData={() => dispatch(toggleApiData())} />}
            />
            <Route path="/addTask"
              element={showAddForm && <AddTask />} />

            <Route path="/tasks"
              element={
                <Tasks/>}
            />

            <Route path="/showData"
              element={showApiData && <ApiData />} />


          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
