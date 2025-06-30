import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnectection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/contants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [receiverImgURL, setReceiverImgURL] = useState("");
  const [lastSeen, setLastSeen] = useState(null);

  const currentUser = useSelector((store) => store.user);
  const ref = useRef(null);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
          withCredentials: true,
        });

        if (chat?.data?.chat?.receiver) {
          setReceiverName(
            `${chat.data.chat.receiver.firstName || ""} ${
              chat.data.chat.receiver.lastName || ""
            }`
          );
        }

        const chatMessages = chat?.data?.chat?.messages.map((msg) => {
          return {
            senderId: msg.senderId,
            firstName: msg.senderId?.firstName,
            lastName: msg.senderId?.lastName,
            message: msg.message,
            timestamp:
              msg.createdAt ||
              msg.timestamp ||
              msg.timeStamp ||
              new Date().toISOString(),
          };
        });

        setMessages(chatMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [targetUserId]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString([], {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "";
    }
  };

  const getUserName = async () => {
    const userName = await axios.get(BASE_URL + "/chat/user/" + targetUserId);
    setReceiverName(
      `${userName?.data?.User?.firstName || ""} ${
        userName?.data?.User?.lastName || ""
      }`
    );
    setReceiverImgURL(userName?.data?.User?.imgURL || "");
    setLastSeen(formatTimestamp(userName?.data?.User?.lastSeen) || null);
    console.log("Receiver info:", userName?.data?.User);
  };

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const newSocket = createSocketConnectection();
    setSocket(newSocket);
    newSocket.emit("joinChat", { userId, targetUserId });

    newSocket.on(
      "messageRecived",
      ({ message, firstName, lastName, senderId, timeStamp }) => {
        setMessages((prevMessages) => {
          const existingMessageIndex = prevMessages.findIndex(
            (msg) =>
              msg.message === message &&
              msg.senderId === senderId &&
              msg.isLocal === true
          );

          if (existingMessageIndex !== -1) {
            const updatedMessages = [...prevMessages];
            updatedMessages[existingMessageIndex] = {
              message,
              senderId,
              firstName,
              lastName,
              timestamp: timeStamp || new Date().toISOString(),
            };
            return updatedMessages;
          }

          return [
            ...prevMessages,
            {
              message,
              senderId,
              firstName,
              lastName,
              timestamp: timeStamp || new Date().toISOString(),
            },
          ];
        });
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    if (!socket || !message.trim()) return;

    const currentTime = new Date().toISOString();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message,
        senderId: userId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        timestamp: currentTime,
        isLocal: true,
      },
    ]);

    socket.emit("sendMessage", {
      message,
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      timeStamp: currentTime,
    });

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl shadow-purple-500/10 overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      receiverImgURL || "https://placeimg.com/192/192/people"
                    }
                    alt="User avatar"
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-purple-500/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-white">
                    {receiverName || "Chat"}
                  </h2>
                  <p className="text-xs lg:text-sm text-purple-300">
                    {lastSeen ? `Last seen: ${lastSeen}` : "Online"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4"
            ref={ref}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#6B46C1 #374151",
            }}
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  No messages yet
                </h3>
                <p className="text-gray-400">
                  Start the conversation by sending a message
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isOwn = msg.senderId === userId;
                const time = formatTimestamp(msg.timestamp);

                return (
                  <div
                    key={index}
                    className={`flex ${
                      isOwn ? "justify-end" : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`flex ${
                        isOwn ? "flex-row-reverse" : "flex-row"
                      } items-end gap-2 max-w-[80%]`}
                    >
                      <img
                        src={isOwn ? currentUser.imgURL : receiverImgURL}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-600"
                      />
                      <div className="group relative">
                        <div
                          className={`px-4 py-2 rounded-2xl shadow-lg ${
                            isOwn
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md"
                              : "bg-gray-700/50 text-gray-100 rounded-bl-md border border-gray-600/50"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <div
                          className={`text-xs text-gray-500 mt-1 ${
                            isOwn ? "text-right" : "text-left"
                          } opacity-0 group-hover:opacity-100`}
                        >
                          {time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Chat Input */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-700/30 border border-gray-600/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white p-3 rounded-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
