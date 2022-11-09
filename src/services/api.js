const getApi = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = response.json();
  return data;
};

export default getApi;
