import { useEffect, useState, useContext } from 'react';
import MainContext from '../context/MainContext';
import { Paper, Button, Box, IconButton, Stack } from '@mui/material';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import ListTask from './list-task';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './style.css';



function ListDate() {
  const { selectedDateRange, selectedIndex, setSelectedIndex, getTasks, addTask, displayDateRange, setDisplayDateRange } = useContext(MainContext);

  const [displayLeftButton, setDisplayLeftButton] = useState(false);
  const [displayRightButton, setDisplayRightButton] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePreviousDay = () => {
    const newStartDate = new Date(displayDateRange[0].startDate)
    newStartDate.setDate(newStartDate.getDate() - 1);
    const newEndDate = new Date(displayDateRange[0].endDate);
    newEndDate.setDate(newEndDate.getDate() - 1);
    setDisplayDateRange([{ startDate: newStartDate, endDate: newEndDate, key: 'selection' }]);

    if (selectedDateRange[0].startDate >= newStartDate) {
      setDisplayLeftButton(false);
    } else {
      setDisplayLeftButton(true);
    }
  };

  const handleNextDay = () => {
    const newStartDate = new Date(displayDateRange[0].startDate)
    newStartDate.setDate(newStartDate.getDate() + 1);
    const newEndDate = new Date(displayDateRange[0].endDate);

    newEndDate.setDate(newEndDate.getDate() + 1);
    setDisplayDateRange([{ startDate: newStartDate, endDate: newEndDate, key: 'selection' }]);
    setSelectedIndex(selectedIndex + 1)
  };


  const limitDateRange = () => {
    const startDate = selectedDateRange[0].startDate;
    const endDate = selectedDateRange[0].endDate;
    const differenceInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    if (differenceInDays >= 5) {
      const newStartDate = new Date(startDate);
      const newEndDate = new Date(startDate);
      if (isMobile) {
        newEndDate.setDate(startDate.getDate()); 
      } else {
        newEndDate.setDate(startDate.getDate() + 4);
      }
      setDisplayDateRange([{ startDate, endDate: newEndDate, key: 'selection' }]);
      getTasks(newStartDate, newEndDate)
    } else {
      const newStartDate = new Date(startDate);
      const newEndDate = new Date(startDate);
      if (isMobile) {
        newEndDate.setDate(startDate.getDate()); 
        setDisplayDateRange([{ startDate, endDate: newEndDate, key: 'selection' }]);
        getTasks(newStartDate, newEndDate)
      } else {
        setDisplayDateRange(selectedDateRange)
      }
    }
  };

  useEffect(() => {
    if (displayDateRange[0].startDate > selectedDateRange[0].startDate) {
      setDisplayLeftButton(true);
    } else {
      setDisplayLeftButton(false);
    }

    if (displayDateRange[0].endDate >= selectedDateRange[0].endDate) {
      setDisplayRightButton(false);
    } else {
      setDisplayRightButton(true);
    }
  }, [displayDateRange]);

  useEffect(() => {
    limitDateRange()
  }, [selectedDateRange, isMobile]);

  const handleAddTask = (index) => {
    addTask(index)
  };


  const renderDatesInRange = () => {
    const { startDate, endDate } = displayDateRange[0];
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.map((date, index) => (
      <>
        <Box className="dates" key={index} component="span">
          <Stack  display="flex" flexDirection="column">
            <h3>{formatDay(date)}</h3>
            <body>{formatDate(date)}</body>
          </Stack>
          <Paper  className="addTask" square={false}>
            <Button size="small" onClick={() => handleAddTask(index)} startIcon={<AddCircleOutlineIcon />}>
              Add a Task
            </Button>
          </Paper>
        </Box>
      </>
    ));
  };



  const formatDay = (date) => {
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Stack display="flex" flexDirection="row">
        <Box className="listDateLeftButton">
          {displayLeftButton && <IconButton size="small" onClick={handlePreviousDay}>
            <ArrowCircleLeftIcon />
          </IconButton>
          }
        </Box>
        <Box className="listDates">
          {renderDatesInRange()}
        </Box>
        <Box className="listDateRightButton">
          {displayRightButton && <IconButton size="small" onClick={handleNextDay}><ArrowCircleRight /></IconButton>}
        </Box>
      </Stack>
      <ListTask/>
    </>
  );
}

export default ListDate;


