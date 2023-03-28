import { ChatsDTOType } from '../../api/ChatsApi';
import { parseDate } from '../../utiles/parseDate';
import { getChatItem } from '../ChatItem';
import { Image } from '../Image';
import avatar from '../../../static/avatar.jpg';
import { API_BASE_URL } from '../../utiles/constants';

export const getChatList = (items: Partial<ChatsDTOType>[], activeChat?: ChatsDTOType | null) => {
  return items.map((item) => {
    const isActive = Number(activeChat?.id) === Number(item.id);
    const srcItem = item.avatar ? `${API_BASE_URL}/resources${item.avatar}` : avatar;
    return getChatItem(
      {
        name: item.title || '',
        text: item.last_message?.content || '',
        time: item.last_message?.time ? parseDate(item.last_message?.time) : '',
        avatar: new Image({ alt: 'аватар', stylePrefix: 'chatItems', src: srcItem }),
        count: isActive || (item.unread_count === 0) ? null : item.unread_count,
        chatId: item.id as number,
        isActive,
      },
    );
  });
};
