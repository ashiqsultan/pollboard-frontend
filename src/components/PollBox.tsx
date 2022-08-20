import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import constants from '../constants';
import { isVoted, setVoted } from '../utils/voteSession';

const { POLL_UPDATE, UPDATE_ROOM, LEAVE_ALL_ROOM } = constants.SOCKET_EVENTS;

type Props = {
  socket: any;
};
const PollBox = (props: Props) => {
  let { pollId } = useParams();
  const [pollBox, setPollBox] = useState(null);
  const { socket } = props;
  const joinRoom = (pollId: string) => {
    socket.emit(UPDATE_ROOM, { pollId });
  };
  useEffect(() => {
    if (pollId) {
      joinRoom(pollId);
      if (isVoted(pollId)) {
        // TODO: Get pollBox data from API
      }
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
      Poll Box
      <div>{JSON.stringify(pollBox)}</div>
    </>
  );
};
export default PollBox;
