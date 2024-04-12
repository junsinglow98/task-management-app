import { useState, useContext } from 'react';
import { DateRange } from 'react-date-range';
import MainContext from '../context/MainContext';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

function CustomDatePicker() {
    const { selectedDateRange, setSelectedDateRange } = useContext(MainContext)

    return (
        <DateRange
            editableDateInputs={true}
            onChange={item => setSelectedDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={selectedDateRange}
    />
  );
}

export default CustomDatePicker;
