import Image from "next/image";
import Link from "next/link";

export default function Messages() {
  // Mock conversation data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      online: true,
      lastMessage: "That sounds great! Let me know when you're free",
      time: "2m ago",
      unread: 2
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      online: false,
      lastMessage: "The project files have been updated",
      time: "1h ago",
      unread: 0
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      online: true,
      lastMessage: "Perfect, thanks for the quick response!",
      time: "3h ago",
      unread: 1
    }
  ];

  // Mock messages data
  const messages = [
    {
      id: 1,
      type: "received",
      sender: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      message: "Hi! How are you doing? I was wondering if you had time to review the latest designs?",
      time: "10:23 AM"
    },
    {
      id: 2,
      type: "sent",
      message: "Hey Sarah! I'm good, thanks. Yes, I've looked at them and they look great! Just had a couple of small suggestions.",
      time: "10:25 AM"
    },
    {
      id: 3,
      type: "received",
      sender: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      message: "That's great to hear! What suggestions did you have in mind?",
      time: "10:26 AM"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-[380px] bg-white border-r border-zinc-200 flex flex-col">
          {/* Header Section */}
          <div className="px-6 py-5 border-b border-zinc-200">
            <h2 className="text-xl font-semibold text-zinc-900 mb-5">Messages</h2>
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl
                focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/10 text-sm transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 py-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="px-3 py-3.5 hover:bg-zinc-50 rounded-xl cursor-pointer transition-all 
                  duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={conversation.avatar}
                        alt={conversation.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      {conversation.online && (
                        <span className="absolute bottom-0.5 right-0.5 block h-3 w-3 rounded-full 
                        bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-zinc-900 truncate group-hover:text-blue-600 
                        transition-colors">
                          {conversation.name}
                        </p>
                        <p className="text-xs text-zinc-500 tabular-nums pl-4">
                          {conversation.time}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="ml-3 inline-flex items-center justify-center h-5 w-5 rounded-full 
                          bg-blue-600 shadow-sm">
                            <span className="text-xs font-medium text-white">
                              {conversation.unread}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="px-8 py-5 bg-white border-b border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <Image
                    src={conversations[0].avatar}
                    alt={conversations[0].name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <span className="absolute bottom-0.5 right-0.5 block h-3 w-3 rounded-full 
                  bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-zinc-900">
                    {conversations[0].name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <p className="text-sm text-zinc-500">Online</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="p-2.5 text-zinc-500 hover:text-zinc-600 hover:bg-zinc-50 
                rounded-xl transition-all duration-200">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </button>
                <button className="p-2.5 text-zinc-500 hover:text-zinc-600 hover:bg-zinc-50 rounded-xl transition-all duration-200">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button className="p-2.5 text-zinc-500 hover:text-zinc-600 hover:bg-zinc-50 rounded-xl transition-all duration-200">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 bg-gradient-to-b from-zinc-50/50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-end max-w-[70%] gap-3 ${
                  message.type === "sent" ? "flex-row-reverse" : ""
                }`}>
                  {message.type === "received" && (
                    <Image
                      src={message.avatar}
                      alt={message.sender}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                  )}
                  <div className={`px-5 py-3 rounded-2xl shadow-sm ${
                    message.type === "sent"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-zinc-200/80"
                  }`}>
                    <p className="text-[15px] leading-relaxed">{message.message}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === "sent"
                        ? "text-blue-100"
                        : "text-zinc-500"
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="px-8 py-5 bg-white border-t border-zinc-200">
            <div className="flex items-center gap-4 bg-zinc-50 p-2 rounded-xl border border-zinc-200/80">
              <button className="p-2.5 text-zinc-500 hover:text-zinc-600 hover:bg-white 
              rounded-lg transition-all duration-200">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-0 focus:ring-0 text-[15px] py-2.5 px-2"
              />
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-zinc-500 hover:text-zinc-600 hover:bg-white 
                rounded-lg transition-all duration-200">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button className="px-6 py-2.5 text-[15px] font-semibold rounded-lg text-white 
                bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
