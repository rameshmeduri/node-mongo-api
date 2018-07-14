import axios from 'axios';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const baseOptions = {
  baseURL: '/api/v1/',
  timeout: 10000,
};

const request = axios.create(baseOptions);

// POST endpoints
const postRequest = (url, obj) => {
  const options = {
    method: 'post',
    url,
    headers,
    data: obj,
  };

  return request(options);
};

// PUT endpoints
const putRequest = (url, obj) => {
  const options = {
    method: 'put',
    url,
    headers,
    data: obj,
  };

  return request(options);
};

// DELETE endpoints
const deleteRequest = (url, params) => {
  const options = {
    method: 'delete',
    url,
    headers: { 'Content-Type': 'x-www-form-encoded' },
    params,
  };

  return request(options);
};

// GET endpoints
const getRequest = (url) => {
  const options = {
    method: 'get',
    url,
  };

  return request(options);
};

export { postRequest, getRequest, putRequest, deleteRequest };
