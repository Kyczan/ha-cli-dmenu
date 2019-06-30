import axios from 'axios';

const getUrl = (value: string) =>
  `https://maker.ifttt.com/trigger/${value}/with/key/${process.env.API_KEY}`;

const sendRequest = async (webhook: string) => {
  try {
    await axios.get(getUrl(webhook));
    return {
      payload: 'Congratulations! Request has been successfully sent.',
      status: 'ok',
    };
  } catch (error) {
    return { status: 'error', payload: error.message };
  }
};

export default sendRequest;
