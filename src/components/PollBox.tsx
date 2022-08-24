import { useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import constants from '../constants';
import { getPoll } from '../api';
import Poll from './Poll';
import PollChart from './PollChart';
import { getVote } from '../utils/voteSession';

const { POLL_UPDATE, UPDATE_ROOM, LEAVE_ALL_ROOM } = constants.SOCKET_EVENTS;

interface State {
  poll: { name: string; options: string[] };
  pollBox: object;
  isVoted: boolean;
}
interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  poll: { name: '', options: [] },
  pollBox: {},
  isVoted: false,
};

const ACTIONS = {
  POLL_UPDATED: 'poll_updated',
  POLL_BOX_UPDATED: 'poll_box_updated',
  VOTED: 'voted',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.POLL_UPDATED:
      return {
        ...state,
        poll: action.payload.poll,
        pollBox: action.payload.pollBox,
      };
    case ACTIONS.POLL_BOX_UPDATED:
      return { ...state, pollBox: action.payload.pollBox };
    case ACTIONS.VOTED:
      return { ...state, isVoted: true };
    default:
      console.log('default action');
      return state;
  }
}

type Props = {
  socket: any;
};
const PollBox = (props: Props) => {
  let { pollId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { socket } = props;

  const joinRoom = (pollId: string) => {
    socket.emit(UPDATE_ROOM, { pollId });
  };
  const getVotes = (pollBox: object): Array<number> => {
    if (pollBox && Object.keys(pollBox).length > 0) {
      return Object.values(pollBox);
    }
    return [];
  };
  useEffect(() => {
    const getPollData = async () => {
      try {
        const pollData = await getPoll(pollId!);
        if (pollData && pollData.data) {
          const action = {
            type: ACTIONS.POLL_UPDATED,
            payload: {
              poll: pollData.data.poll,
              pollBox: pollData.data.pollBox,
            },
          };
          dispatch(action);
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
        const action = {
          type: ACTIONS.POLL_BOX_UPDATED,
          payload: { pollBox: data.pollBox },
        };
        dispatch(action);
      }
    });
    // unmount
    return () => {
      socket.emit(LEAVE_ALL_ROOM);
    };
  }, []);

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
                    name={state.poll.name}
                    options={state.poll.options}
                  />
                </div>
              )}
              {getVote(pollId || '') && (
                <div>
                  <PollChart
                    options={state.poll.options}
                    votes={getVotes(state.pollBox)}
                  />
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
