import { chatsActions } from "../actions/ChatsActions";
import Store from "~src/services/Store";
import { WebsocketService } from "~src/services/WebsocketService";

const webSocketsList: Record<number, WebsocketService> = {};
const WS_ENDPOINT = 'wss://ya-praktikum.tech/ws/chats/'

export const  setWebSocket = async (chatId: number) => {
  if (!chatId) {
    return;
  }

  if (webSocketsList&&webSocketsList[chatId]) {
    return webSocketsList[chatId].getSocket();
  }

  const token = await chatsActions.getToken(chatId);

  if (!token) {
    return;
  }

  const state = Store.getState()

  if (!('user' in state)) return
  const userId = state.user?.id;

  const wsURL = `${WS_ENDPOINT}/${userId}/${chatId}/${token}`;

  const webSocket = await new WebsocketService(wsURL);

  webSocket.on(WebsocketService.EVENTS.GET_MESSAGE, (data) => getMessagesOfChat(data ))
  webSocket.on(WebsocketService.EVENTS.CLOSE, () => {deleteSoket()});

  const getMessagesOfChat = (data: any) => {
    chatsActions.getMessagesOfChat( data, chatId );
  };

  const deleteSoket = () => {
    return delete webSocketsList[chatId];
  };

  webSocketsList[chatId] = webSocket;

  return webSocketsList[chatId].getSocket();
};
