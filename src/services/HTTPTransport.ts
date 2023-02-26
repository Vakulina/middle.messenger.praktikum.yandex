const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export type RequestOptionsType = {
  method?: string,
  data?: Record<string, unknown> | FormData,
  isFormData?: boolean,
  headers?: Record<string, string>,
  timeout?: number
};
export type ErrorType = {
  message: string, status: number
}

function queryStringify(data: Record<string, unknown>) {
  if (!data) {
    return false;
  }
  const keys = Object.keys(data);
  return Object.keys(data).reduce(
    (acc, key, index) => `${acc}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?'
  );
}


export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected url: string;

  constructor(endpoint: string) {

    this.url = `${HTTPTransport.API_URL}${endpoint}`;

  }

  get = async (url: string, options = {}): Promise<unknown> => {
    return await this.request(url, { ...options, method: METHODS.GET });
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
    console.log(options)
    const {
      method = METHODS.GET,
      data,
      headers,
      isFormData = false,
    } = options;

    // Если метод GET и передана data, трансформировать data в query запрос
    const query = (data && (method === METHODS.GET)) ? queryStringify(data) : '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, this.url + url + query);

      if (headers && Object.keys(headers).length) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);

        });
      }
      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }


      xhr.onload = function () {
        if (xhr.status === 500) {
          reject({ message: "Ошибка сервера!", status: xhr.status })
        }
        if ((xhr.status !== 500) && (xhr.status >= 400)) {
          reject({ message: xhr.response.reason, status: xhr.status })
        }
        else {
          resolve(xhr.response);
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ message: xhr.response.reason, status: xhr.response.status });
      xhr.ontimeout = () => reject({ reason: 'timeout' });


      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else if (options?.isFormData) {
        console.log(data)
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
