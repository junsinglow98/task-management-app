import { createContext, useState, useEffect, useRef, useReducer, useMemo } from "react";
import axios from 'axios';

const MainContext = createContext({});


export const DataProvider = ({ children }) => {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 4);

  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }
  ]);

  const [displayDateRange, setDisplayDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };  

  const addTask = (index) => {
    const { startDate, endDate } = displayDateRange[0];
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const selectedDate = dates[index];

    axios.post('http://localhost:3001/tasks', { 
      date: selectedDate
    })
    .then(response => {
      setTasks(response.data);
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const editTask = (id, directEdit) => {
    const task = tasks.find(task => task.id === id)
    console.log(task)
    axios.put(`http://localhost:3001/tasks/${id}`, { 
      name: task.name,
      completed: task.completed,
      priority: task.priority,
      directEdit: directEdit
      })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });

  };

  const editTaskComplete = (id, completed) => {
    axios.put(`http://localhost:3001/tasks/completed/${id}`, { 
      completed: completed
    })
    .then(response => {
      setTasks(response.data);
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
  };

  return (
    <MainContext.Provider value={{
      // contains all the shared states needed across the application
      selectedDateRange, setSelectedDateRange,
      displayDateRange, setDisplayDateRange,
      selectedIndex, setSelectedIndex,
      tasks, setTasks,
      getTasks, addTask,
      editTask, deleteTask,
      editTaskComplete
    }}>
      {children}
    </MainContext.Provider>
  )
}

export default MainContext;