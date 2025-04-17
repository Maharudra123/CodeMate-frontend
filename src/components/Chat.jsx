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
            // Check for all possible timestamp fields
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

  // Socket connection setup
  useEffect(() => {
    if (!userId) {
      console.log("No user ID found");
      return;
    }

    const newSocket = createSocketConnectection();
    setSocket(newSocket);
    console.log("Socket connected", newSocket);
    newSocket.emit("joinChat", { userId, targetUserId });

    newSocket.on(
      "messageRecived",
      ({ message, firstName, lastName, senderId, timeStamp }) => {
        console.log("Message received:", message, firstName, "at", timeStamp);

        setMessages((prevMessages) => {
          // Check if this is a duplicate of a local message
          const existingMessageIndex = prevMessages.findIndex(
            (msg) =>
              msg.message === message &&
              msg.senderId === senderId &&
              msg.isLocal === true
          );

          if (existingMessageIndex !== -1) {
            // Replace the local message with the server-confirmed one
            const updatedMessages = [...prevMessages];
            updatedMessages[existingMessageIndex] = {
              message,
              senderId,
              firstName,
              lastName,
              timestamp: timeStamp || new Date().toISOString(),
              // Remove the isLocal flag or set to false
            };
            return updatedMessages;
          }

          // If no duplicate found, add as new message
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

    // Add message to local state immediately for display
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

    // Send message to socket
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

  // Format timestamp for display

  return (
    <div className="flex flex-col h-[40rem] md:h-[32rem] bg-base-200 max-w-full lg:max-w-[75vw] mx-auto border-1 border-base-content/10 rounded-lg shadow-lg overflow-scroll">
      {/* Chat header */}
      <div className="navbar bg-base-300 shadow-lg ">
        <div className="flex-1 flex items-center gap-4">
          <div className="avatar online">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={receiverImgURL || "https://placeimg.com/192/192/people"}
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold">{receiverName || "Chat"}</h2>
            <p className="text-xs opacity-70">Last seen: {lastSeen}</p>
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-base-200 scroll-smooth"
        ref={ref}
      >
        {messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">
              Start the conversation by sending a message
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            // Check if this message is from the current user
            const isOwnMessage =
              msg.senderId === userId ||
              (msg.firstName === user.firstName &&
                msg.lastName === user.lastName);

            // Get formatted timestamp
            const formattedTime = formatTimestamp(msg.timestamp);

            return (
              <div
                key={index}
                className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar placeholder">
                  <div
                    className={`w-10 rounded-full ${
                      isOwnMessage ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    <span className="text-white text-xs">
                      <img
                        src={isOwnMessage ? currentUser.imgURL : receiverImgURL}
                      />
                    </span>
                  </div>
                </div>

                <div
                  className={`chat-bubble ${
                    isOwnMessage
                      ? "chat-bubble-primary"
                      : "chat-bubble-secondary"
                  } shadow-sm`}
                >
                  {msg.message}
                </div>
                <div className="chat-footer opacity-50 mt-0.5">
                  {formattedTime && (
                    <time className="text-xs opacity-50 ml-1">
                      {formattedTime}
                    </time>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Message input */}
      <div className="p-4 bg-base-300">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered join-item flex-grow focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="btn btn-primary join-item"
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
  );
};

export default Chat;
