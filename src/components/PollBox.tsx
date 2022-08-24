import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import constants from '../constants';
import { getPoll } from '../api';
import Poll from './Poll';
import PollChart from './PollChart';
import { getVote } from '../utils/voteSession';

const { POLL_UPDATE, UPDATE_ROOM, LEAVE_ALL_ROOM } = constants.SOCKET_EVENTS;

type Props = {
  socket: any;
};
const PollBox = (props: Props) => {
  let { pollId } = useParams();
  const [pollBox, setPollBox] = useState({});
  const [poll, setPoll] = useState({ name: '', options: [] });
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState([]);
  const { socket } = props;
  const joinRoom = (pollId: string) => {
    socket.emit(UPDATE_ROOM, { pollId });
  };
  useEffect(() => {
    const getPollData = async () => {
      try {
        const pollData = await getPoll(pollId!);
        if (pollData && pollData.data) {
          setPollBox(pollData.data.pollBox);
          setPoll(pollData.data.poll);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (pollId) {
      joinRoom(pollId);
      getPollData();
    }
    socket.on(POLL_UPDATE, (data: any) => {
      if (data.entityId && data.entityId === pollId) {
        setPollBox(data.pollBox);
      }
    });
    // unmount
    return () => {
      socket.emit(LEAVE_ALL_ROOM);
    };
  }, []);

  useEffect(() => {
    if (pollBox && Object.keys(pollBox).length > 0) {
      setOptions(Object.keys(pollBox));
      setVotes(Object.values(pollBox));
    }
  }, [pollBox]);
  return (
    <>
      <div style={{ padding: '20px' }}>
        <Card>
          <CardContent>
            <div style={{ padding: '10px' }}>
              {pollId && (
                <div>
                  <Poll
                    pollId={pollId}
                    name={poll.name}
                    options={poll.options}
                  />
                </div>
              )}
              {getVote(pollId || '') && (
                <div>
                  <PollChart options={options} votes={votes} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default PollBox;
