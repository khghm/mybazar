import { useState } from 'react';
import { Page } from '../App';
import { chatConversations } from '../data/mockData';
import { Icons } from '../components/Icons';

interface ChatPageProps {
  navigate: (page: Page) => void;
}

export default function ChatPage({ navigate }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState(chatConversations[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'سلام، وقت بخیر. آگهی آیفون ۱۵ پرو مکس شما رو دیدم.', sender: 'other' as const, time: '۱۰:۲۵' },
    { id: 2, text: 'سلام! بله، خوش آمدید. سوالی دارید؟', sender: 'me' as const, time: '۱۰:۲۷' },
    { id: 3, text: 'سلام، هنوز موجوده؟', sender: 'other' as const, time: '۱۰:۳۰' },
    { id: 4, text: 'بله موجوده. کاملاً سالم و با جعبه.', sender: 'me' as const, time: '۱۰:۳۱' },
    { id: 5, text: 'امکانش هست قیمت رو کمی پایین‌تر بدید؟', sender: 'other' as const, time: '۱۰:۳۳' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-fadeIn">
      <h1 className="text-2xl font-black text-gray-900 mb-6">پیام‌ها</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '580px' }}>
        <div className="flex h-full">
          {/* Conversations */}
          <div className="w-full md:w-80 border-l border-gray-100 flex flex-col">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="جستجو در پیام‌ها..." className="w-full pr-9 pl-3 py-2 bg-gray-50 rounded-lg text-sm outline-none border border-gray-200 focus:border-emerald-500" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chatConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`p-3 border-b border-gray-50 cursor-pointer transition-colors ${
                    selectedChat.id === conv.id ? 'bg-emerald-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={conv.avatar} alt={conv.user} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 text-sm">{conv.user}</span>
                        <span className="text-[10px] text-gray-400">{conv.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{conv.adTitle}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-600 truncate flex-1">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mr-2">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedChat.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-medium text-gray-800 text-sm">{selectedChat.user}</h3>
                  <p className="text-[11px] text-gray-500">{selectedChat.adTitle}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title="تماس">
                  <Icons.Phone size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title="اطلاعات">
                  <Icons.MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-emerald-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-emerald-200' : 'text-gray-400'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Icons.Paperclip size={18} /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Icons.Camera size={18} /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Icons.Location size={18} /></button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none border border-gray-200 focus:border-emerald-500"
                />
                <button onClick={handleSend} className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors">
                  <Icons.Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
                <Icons.Lock size={10} />
                تمام پیام‌ها رمزنگاری شده‌اند
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
