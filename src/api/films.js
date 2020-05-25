import axios from 'axios'


const Is404Image = (url) => { axios.get(url)
  .catch((error) => {
    if (error.response) {
      return error.response.status
    }
  });
}

export default Is404Image
