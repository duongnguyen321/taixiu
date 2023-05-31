const API_SERVER = process.env.REACT_APP_API_SERVER;
const API = {
  game: (number) => {
    return `${API_SERVER}/game/${number}`;
  },
  data: (number) => {
    return `${API_SERVER}/data/${number}`;
  },
};
export default API;
