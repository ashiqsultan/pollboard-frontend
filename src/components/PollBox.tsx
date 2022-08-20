import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import constants from '../constants';
import { isVoted, setVoted } from '../utils/voteSession';
import { getPoll, updatePoll } from '../api';
import Poll from './Poll';

const { POLL_UPDATE, UPDATE_ROOM, LEAVE_ALL_ROOM } = constants.SOCKET_EVENTS;

type Props = {
  socket: any;
};
const PollBox = (props: Props) => {
  let { pollId } = useParams();
  const [pollBox, setPollBox] = useState({});
  const [poll, setPoll] = useState({ name: '', options: [] });
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
  return (
    <>
      <Poll name={poll.name} options={poll.options} />
      <div>{JSON.stringify(poll)}</div>
      <div>{JSON.stringify(pollBox)}</div>
    </>
  );
};
export default PollBox;
