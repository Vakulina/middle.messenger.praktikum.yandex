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

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected url: string;

  constructor(endpoint: string) {
    this.url = `${HTTPTransport.API_URL}${endpoint}`;
  }

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


      if (Object.entries(headers).length === 0) xhr.setRequestHeader('Content-Type', 'application/json');
      //??? Для аватара тип заголовка указать в объекте heaers
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });


      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
