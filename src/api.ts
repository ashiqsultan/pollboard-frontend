import axios from 'axios';

const apiUrl = 'http://localhost:7000';

interface AppRes {
  data: any;
  isError: boolean;
  errMsg?: string;
}

interface PollResData extends AppRes {
  data: {
    poll: {
      name: string;
      options: string[];
      isClosed: boolean;
    };
    pollBox: object;
  };
}

const getPoll = async (pollId: string): Promise<PollResData> => {
  try {
    const response = await axios.get(`${apiUrl}/poll/${pollId}`);
    return response.data as PollResData;
  } catch (error) {
    throw error;
  }
};

const updatePoll = async (
  pollId: string,
  option: string
): Promise<PollResData> => {
  try {
    const data = { option };
    const config = {
      method: 'patch',
      url: `${apiUrl}/poll-box/${pollId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios(config);
    console.log(response.data);
    return response.data as PollResData;
  } catch (error) {
    throw error;
  }
};

export { getPoll, updatePoll };
