import { ChatsDTOType } from "~src/api/Chats"
import parseDate from "~src/utiles/parseDate"
import { ChatItem } from "../chatItem"
import { Image } from "../image"
import avatar from '~src/static/avatar.jpg';

export const getChatList = (items: Partial<ChatsDTOType>[]) => {
  return items.map((item) => new ChatItem(
    {
      name: item.title || '',
      text: item.last_message?.content || '',
      time: item.last_message?.time ? parseDate(item.last_message?.time) : '',
      avatar: new Image({ alt: 'аватар', stylePrefix: 'chatItems', src: item.avatar || avatar }),
      count: item.unread_count,
      id: item.id as number, 
    },
  ))
}
