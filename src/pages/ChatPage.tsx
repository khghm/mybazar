import { useState } from 'react';
import { Page } from '../App';
import { chatConversations } from '../data/mockData';

interface ChatPageProps {
  navigate: (page: Page) => void;
}

export default function ChatPage({ navigate }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState(chatConversations[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'سلام، وقت بخیر. آگهی آیفون ۱۵ پرو مکس شما رو دیدم.', sender: 'other', time: '۱۰:۲۵' },
    { id: 2, text: 'سلام! بله، خوش آمدید. سوالی دارید؟', sender: 'me', time: '۱۰:۲۷' },
    { id: 3, text: 'سلام، هنوز موجوده؟', sender: 'other', time: '۱۰:۳۰' },
    { id: 4, text: 'بله موجوده. کاملاً سالم و با جعبه.', sender: 'me', time: '۱۰:۳۱' },
    { id: 5, text: 'امکانش هست قیمت رو کمی پایین‌تر بدید؟', sender: 'other', time: '۱۰:۳۳' },
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">پیام‌ها</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full md:w-80 border-l border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <input
                type="text"
                placeholder="جستجو در پیام‌ها..."
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm outline-none border border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {chatConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                    selectedChat.id === conv.id ? 'bg-emerald-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 text-sm">{conv.user}</span>
                        <span className="text-xs text-gray-400">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{conv.adTitle}</p>
                      <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-lg">
                  {selectedChat.avatar}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-sm">{selectedChat.user}</h3>
                  <p className="text-xs text-gray-500">درباره: {selectedChat.adTitle}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title="تماس VoIP">📞</button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title="اطلاعات">ℹ️</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-emerald-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-emerald-200' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">📎</button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">📷</button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">📍</button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1 px-4 py-2 bg-gray-50 rounded-xl text-sm outline-none border border-gray-200 focus:border-emerald-500"
                />
                <button
                  onClick={handleSend}
                  className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                🔒 تمام پیام‌ها رمزنگاری شده‌اند. شماره تماس فقط با رضایت طرفین نمایش داده می‌شود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
