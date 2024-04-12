import { useEffect, useState, useContext, useRef } from 'react';
import MainContext from '../context/MainContext';
import { FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, Typography, Paper, Button, Box, IconButton, Stack } from '@mui/material';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './style.css';




function ListTask() {
  const { displayDateRange, tasks, setTasks, editTask, deleteTask, editTaskComplete } = useContext(MainContext);
  const [isHovered, setIsHovered] = useState('');

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };

  const handleMouseLeave = () => {
    setIsHovered('');
  };


  const handleTaskCompletionDirect = (taskId, completed, event) => {
    editTaskComplete(taskId, !completed)
  };

  const handleTaskCompletion = (taskId, event) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleChange = (taskId, event) => {
    const newPriority = event.target.value;

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, priority: newPriority };
      }
      return task;
    });

    setTasks(updatedTasks);
  };


  const handleSave = (id) => {
    editTask(id)
  };

  const handleTaskNameChange = (taskId, event) => {
    const name = event.target.value;

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, name: name };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    deleteTask(id)
  };

  const notifyTaskPriority = (task) => {
    if (task.priority == 1) {
      return "black"
    } else if (task.priority == 2) {
      return "blue"
    } else if (task.priority == 3) {
      return "red"
    } else {
      return "black"
    }
  };

  const renderTasksInRange = () => {
    const { startDate, endDate } = displayDateRange[0];
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.map((date, index) => (
      <Box className="dates" key={index} component="span">
        {
          tasks.length > 0 && tasks
            .filter(task => new Date(task.date).toDateString() === date.toDateString())
            .map((task) => (
              renderAddTaskForm(task, index)
            ))
        }
      </Box>
    ));
  };

  const renderAddTaskForm = (task, index) => {
    return (
      <Box>
        {task.editing &&
          <Paper className="addTask" square={false}>
            <Stack spacing={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Checkbox checked={task.completed} onChange={(event) => handleTaskCompletion(task.id, event)} />
                <TextField
                  size="small"
                  value={task.name}
                  variant="outlined"
                  onChange={(event) => handleTaskNameChange(task.id, event)}
                />
              </Stack>
              <FormControl fullWidth>
                <InputLabel id={`priority-select-label-${task.id}`}>Priority</InputLabel>
                <Select
                  size="small"
                  labelId={`priority-select-label-${task.id}`}
                  id={`priority-select-${task.id}`}
                  value={task.priority}
                  label="Priority"
                  onChange={(event) => handleChange(task.id, event)}
                >
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2} display="flex" justifyContent="space-between">
                <IconButton aria-label="save" onClick={() => handleSave(task.id)}>
                  <CheckIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        }
        {!task.editing &&
          <Paper className="addTask" square={false} onMouseEnter={() => handleMouseEnter(task.id)} onMouseLeave={() => handleMouseLeave(task.id)}>
            <Stack spacing={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Checkbox checked={task.completed} onChange={(event) => handleTaskCompletionDirect(task.id, task.completed, event)} />
                <Box fontSize='10px' size="small" color={notifyTaskPriority(task)}
                  sx={{
                    maxWidth: '70%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >{task.name}</Box>
                {isHovered == task.id && (
                  <IconButton
                    size="small"
                    aria-label="edit"
                    onClick={() => handleSave(task.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </Paper>
        }
      </Box>
    );
  };

  return (
    <Stack display="flex" flexDirection="row">
      <Box className="listDateLeftButton"></Box>
      <Box className="listTasks">
        {renderTasksInRange()}
      </Box>
      <Box className="listDateRightButton"></Box>
    </Stack>
  );
}

export default ListTask;