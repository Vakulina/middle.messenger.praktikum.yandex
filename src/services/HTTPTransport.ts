const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export type RequestOptionsType = {
  method?: string,
  data?: Record<string, unknown>,
  isFormData?: boolean,
  headers?: Record<string, string>,
  timeout?: number
};

function queryStringify(data: Record<string, unknown>) {
  if (!data) return '';
  return Object.entries(data).reduce((acc, [key, value], index, arr) => {
    return `${acc}${key}=${value}${index < arr.length - 1 ? '&' : ''}`;
  }, '?');
}

export abstract class HTTPTransport {
  get = (url: string, options = {}): Promise<unknown> => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (url: string, options = {}): Promise<unknown> => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url: string, options = {}): Promise<unknown> => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };


  delete = (url: string, options = {}): Promise<unknown> => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: RequestOptionsType): Promise<unknown> => {
    const {
      method = METHODS.GET,
      headers = {},
      data,
      timeout = 5000,
    } = options;

    // Если метод GET и передана data, трансформировать data в query запрос
    const query = (data && (method === METHODS.GET)) ? queryStringify(data) : '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url + query);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
