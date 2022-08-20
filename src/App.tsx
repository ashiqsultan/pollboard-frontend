import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import AppBar from './components/AppBar';
import Home from './components/Home';
import PollBox from './components/PollBox';

const socket = io('localhost:3000', {
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [pollBox, setPollBox] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('poll_update', (data) => {
      setPollBox(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };
  const joinRoom = (pollId: string) => {
    socket.emit('update_room', { pollId });
  };

  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/poll/:pollId' element={<PollBox />} />
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
