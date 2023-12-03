import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

const getHeaders = () => {
    return {
      headers: {
        'Authorization':  `${localStorage.getItem("USER")}`,
      }
    };
  };

export const GET = async (url, params = {}) => {
    try {
        const resp = await api.get(url, { ...getHeaders(), params });
        return resp.data;
    } catch (error) {
        handleError(error);
    }
}

export const POST = async (url, body) => {
    if(url ==='/login'){
      try{
        const resp = await api.post(url, body,{withCredentials: true},getHeaders());
        console.log(resp,resp.data)
        return resp.data;
      }
      catch(error){
        handleError(error);
        console.error('Full Error Object:', error);
        console.log('Response Data:', error.response.data);
      }
    } else {
    try {
      console.log(url,body)
        const resp = await api.post(url, body, getHeaders() );
        console.log(url,body)
        console.log(resp.data)
        return resp.data;
    } catch (error) {
        handleError(error);
        console.error('Full Error Object:', error);
        console.log('Response Data:', error.response.data);
    }
  }
}

export const PUT = async (url, body) => {
    console.log(body)
    try {
        const resp = await api.put(url, body, getHeaders());
        console.log('PUT ERROR',resp.data)
        return resp.data;
    } catch (error) {
        handleError(error);
    }
}

export const DELETE = async (url, body) => {
  console.log(body)
  try {
      const resp = await api.delete(url, body);
      console.log('DELETE ERROR',resp.data)
      return resp.data;
  } catch (error) {
      handleError(error);
  }
}

const handleError = (error) => {
    if (typeof (error) == 'string') {
        alert('String error',error)
    } if (error.response) {
        console.log('Status Code:', error.response.status);
        console.log('Response Data:', error.response.data);
        console.log('Response Headers:', error.response.headers);
        if (error.response.data && error.response.data.message) {
          alert('Error: ' + error.response.data.message);
        } else {
          alert('An error occurred. Please try again.');
        }
      } else if (error.request) {
        alert('No response received');
      } else {
        alert('error message',error.message);
    }
}