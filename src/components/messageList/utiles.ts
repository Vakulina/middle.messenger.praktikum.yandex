import { messageType } from '~src/services';
import { parseDate } from '~src/utiles/parseDate';
import { MessageItem } from './messageItem';

export const getMessageList = (items: messageType[]) => {
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
