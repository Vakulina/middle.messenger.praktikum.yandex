import { ChatsDTOType } from '~src/api/ChatsApi';
import parseDate from '~src/utiles/parseDate';
import { getChatItem } from '../chatItem';
import { Image } from '../image';
import avatar from '../../../static/avatar.jpg';

export const getChatList = (items: Partial<ChatsDTOType>[], activeChat?: ChatsDTOType | null) => {
  return items.map((item) => {
    const isActive = Number(activeChat?.id) === Number(item.id);
    return getChatItem(
      {
        name: item.title || '',
        text: item.last_message?.content || '',
        time: item.last_message?.time ? parseDate(item.last_message?.time) : '',
        avatar: new Image({ alt: 'аватар', stylePrefix: 'chatItems', src: item.avatar || avatar }),
        count: isActive || (item.unread_count === 0) ? null : item.unread_count,
        chatId: item.id as number,
        isActive,
      },
    );
  });
};
