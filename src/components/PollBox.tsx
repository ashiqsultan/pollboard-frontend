import { useParams } from 'react-router-dom';
const PollBox = () => {
  let { pollId } = useParams();
  return <>Poll Box pollId {pollId}</>;
};
export default PollBox;
