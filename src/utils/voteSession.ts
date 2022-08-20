/**
 * Module to check if a user has voted on a poll
 * The voted polls of user are stored in local storage in the format voted:<pollId> = 'true'
 * Example: if pollId is '12345' the local storage key will look like 'voted:12345' with value 'true'
 */
const isVoted = (pollId: string) => {
  const voted = localStorage.getItem(`voted:${pollId}`) || '';
  return voted === 'true';
};

const setVoted = (pollId: string) => {
  localStorage.setItem(`voted:${pollId}`, 'true');
};

export { isVoted, setVoted };
