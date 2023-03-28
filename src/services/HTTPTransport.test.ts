import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport', () => {
  const requests: SinonFakeXMLHttpRequest[] = [];
  const client = new HTTPTransport('/auth');
  let xhr: SinonFakeXMLHttpRequestStatic;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // @ts-ignore
    global.XMLHttpRequest = xhr;
    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });
  });

  it('.get() должен отправлять GET запрос', () => {
    client.get('/user');
    const [request] = requests;
    expect(request.method).to.eq('GET');
  });
  it('.post() должен отправлять POST запрос', () => {
    client.post('/chats');
    const [request] = requests;
    expect(request.method).to.eq('POST');
  });
  it('.put() должен отправлять PUT запрос', () => {
    client.put('/chats');
    const [request] = requests;
    expect(request.method).to.eq('PUT');
  });
  it('.delete() должен отправлять DELETE запрос', () => {
    client.delete('/chat/id');
    const [request] = requests;
    expect(request.method).to.eq('DELETE');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });
});
