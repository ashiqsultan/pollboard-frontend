import { useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Typography } from '@mui/material';

export default function CreatePoll() {
  const [pollTitle, setPollTitle] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const onItemClear = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    console.log(newOptions);
    setOptions(newOptions);
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      if (event.target.value) {
        setOptions([...options, String(event.target.value)]);
      } // Clear event
      event.target.value = '';
    }
  };
  return (
    <div>
      <div>
        <TextField
          id='text-input-poll-title'
          label='Poll Title'
          variant='standard'
          onChange={(event) => setPollTitle(event.target.value)}
          value={pollTitle}
        />
      </div>
      <div>
        <TextField
          id='text-input-poll-option'
          label='Poll Option'
          helperText='Hit Enter key to add Poll options'
          variant='standard'
          onKeyPress={handleKeyPress}
        />
      </div>
      <div>
        <Typography variant='h3'>{pollTitle}</Typography>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {options.map((item, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  <IconButton onClick={() => onItemClear(index)}>
                    <CloseOutlinedIcon />
                  </IconButton>
                  {item}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}