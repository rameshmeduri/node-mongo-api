import axios from 'axios';

export default class Ajax {
  constructor(baseOptions) {
    this.requestInstance = axios.create(baseOptions);

    this.postHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return {
      // POST endpoints
      postRequest: (url, obj) => {
        const options = {
          method: 'post',
          url,
          headers: this.postHeaders,
          data: obj,
        };

        return this.requestInstance(options);
      },

      // PUT endpoints
      putRequest: (url, obj) => {
        const options = {
          method: 'put',
          url,
          headers: this.postHeaders,
          data: obj,
        };

        return this.requestInstance(options);
      },

      // DELETE endpoints
      deleteRequest: (url, params) => {
        const options = {
          method: 'delete',
          url,
          headers: { 'Content-Type': 'x-www-form-encoded' },
          params,
        };

        return this.requestInstance(options);
      },

      // GET endpoints
      getRequest: (url) => {
        const options = {
          method: 'get',
          url,
        };

        return this.requestInstance(options);
      },
    };
  }
}
