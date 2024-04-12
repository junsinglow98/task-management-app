import { Box } from '@mui/material';
import { DataProvider } from './context/MainContext';
import CustomDatePicker from './components/date-picker';
import ListDate from './components/list-date';

import './style.css';

function App() {

  return (
    <DataProvider>
      <Box className="main">
        <Box padding={2} className="datePicker">
          <CustomDatePicker/>
        </Box>
        <Box padding={2} className="listDate" >
          <ListDate/>
        </Box>
      </Box>
    </DataProvider>
  );
}

export default App;
