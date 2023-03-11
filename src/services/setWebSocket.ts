import { chatsActions } from '../actions/ChatsActions';
import Store from '../services/Store';
import { WebsocketService } from '../services/WebsocketService';

const webSocketsList: Record<number, WebsocketService> = {};
const WS_ENDPOINT = 'wss://ya-praktikum.tech/ws/chats/';

export const setWebSocket = async (chatId: number) => {
  if (!chatId) {
    return new Error('Ошибка WS соединения');
  }

  if (webSocketsList && webSocketsList[chatId]) {
    await webSocketsList[chatId]!.getSocket().getOldMessages();
    return webSocketsList[chatId]!.getSocket();
  }

  const token = await chatsActions.getToken(chatId);

  if (!token) {
    return new Error('Ошибка WS соединения');
  }

  const state = Store.getState();

  if (!('user' in state)) return new Error('Ошибка WS соединения');
  const userId = state.user?.id;

  const wsURL = `${WS_ENDPOINT}/${userId}/${chatId}/${token}`;

  const webSocket = await new WebsocketService(wsURL);

  const getMessagesOfChat = (data: any) => {
    chatsActions.getMessagesOfChat(data);
  };

  const deleteSoket = () => {
    return delete webSocketsList[chatId];
  };

  webSocket.on(WebsocketService.EVENTS.GET_MESSAGE, (data) => getMessagesOfChat(data));
  webSocket.on(WebsocketService.EVENTS.CLOSE, () => { deleteSoket(); });

  webSocketsList[chatId] = webSocket;

  return webSocketsList[chatId]!.getSocket();
};
