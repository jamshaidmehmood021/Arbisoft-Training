import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
    name: 'task',
    initialState:[
        { id: 1, title: "Meeting at arbisoft", day: "Mon July 8, 10:30 AM", reminder: true },
        { id: 2, title: "REACT Crash Course Completions", day: "Mon July 8, 7:00 PM", reminder: true },
        { id: 3, title: "Lunch", day: "Mon July 8, 1:00 PM", reminder: false }
      ],

    reducers: {
        add(state, action){
            if(action.payload.type === 'insert'){
                const existingProduct = state.find(product => product.id === action.payload.data.id);
                // checking if the product already exsist
                if (!existingProduct) {
                    state.push(action.payload.data);
                }
            }
            else if (action.payload.type === 'edit') {
                const index = state.findIndex(product => product.id === action.payload.data.id);
                if (index !== -1) {
                    state[index] = {
                        ...state[index],
                        ...action.payload.data
                    };
                }
            }
        },
        remove(state, action){
            return state.filter((item) => item.id !== action.payload) 
        },
        toogle(state, action){
            return state.map((item) =>
                item.id === action.payload ? { ...item, reminder: !item.reminder } : item
              );
        },
    }
})

export const {add, remove,toogle,statusMaintainer} = taskSlice.actions; 
export default taskSlice.reducer;