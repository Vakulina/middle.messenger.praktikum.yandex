import {MessageType } from '../../services/Store';
import { parseDate } from '../../utiles/parseDate';
import { MessageItem } from './MessageItem';

export const getMessageList = (items:MessageType[]) => {
  return items.map((item) => {
    return new MessageItem(
      {
        id: item.id,
        chat_id: item.chat_id,
        content: item.content,
        is_read: item.is_read,
        time: parseDate(item.time),
        user_id: item.user_id,
      },
    );
  });
};
