import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Home() {
  const [isPollIdDialog, setIsPollIdDialog] = useState(false);
  function CardCreate() {
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Create Poll
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Create a new poll and share it with your friends.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  function CardView() {
    return (
      <Card>
        <CardActionArea onClick={() => setIsPollIdDialog(true)}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Cast votes
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Enter a poll Id to cast your vote and see the results.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  const handleClose = () => setIsPollIdDialog(false);
  const PollIdDialog = () => {
    return (
      <Dialog open={isPollIdDialog} onClose={handleClose}>
        <DialogTitle>View Poll</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the poll Id to cast votes and view results.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>View</Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      <PollIdDialog />
      <div style={{ display: 'flex' }}>
        <CardCreate />
        <CardView />
      </div>
    </>
  );
}
