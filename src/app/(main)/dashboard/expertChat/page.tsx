"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { useSearchParams } from "next/navigation";

import {
  io,
  type Socket,
} from "socket.io-client";

import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { FaPaperclip } from "react-icons/fa";

type ChatMessage = {
  id?: number;
  sender: "farmer" | "expert";
  senderId: string;
  message: string;
  imageUrl?: string | null;
  conversationId?: number;
  createdAt?: string;
};

export default function ExpertChat() {
  const searchParams = useSearchParams();

  const { data: session, isPending } = useSession();

  const socketRef = useRef<Socket | null>(null);

  const [socketConnected, setSocketConnected] = useState(false);

 const [preview, setPreview] = useState<string | null>(null);
       
   const [imageFile, setImageFile] = useState<File | null>(null);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const farmerId = searchParams.get("farmerId");

  const expertId = session?.user?.id;

  const roomId =
    farmerId && expertId
      ? [farmerId, expertId]
          .sort()
          .join("-")
      : null;
      const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
                 const file = e.target.files?.[0];
                 if (file) {
                     setImageFile(file);
                     setPreview(URL.createObjectURL(file));
                 }
             };  

 useEffect(() => {
  if (!farmerId || !expertId) {
    return;
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/${farmerId}/${expertId}/messages`
      );

      const data = await response.json();

      if (data.success) {
        setMessages(
          data.messages.map((msg: any) => ({
            id: msg.id,
            sender: msg.sender_role,
            senderId: msg.sender_id,
            message: msg.message,
            imageUrl: msg.image_url,
            createdAt: msg.created_at,
          }))
        );
      }
    } catch (error) {
      console.error(
        "Failed to load messages:",
        error
      );
    }
  };

  fetchMessages();
}, [farmerId, expertId]);     

  useEffect(() => {
    if (!farmerId || !expertId || !roomId) {
      return;
    }

    const newSocket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL
    );

    socketRef.current = newSocket;

    newSocket.on(
  "receive_message",
  (data) => {
    setMessages((prev) => {
      const exists = prev.some(
        (msg) => msg.id === data.id
      );

      if (exists) {
        return prev;
      }

      return [...prev, data];
    });
  }
);
    newSocket.on("connect", () => {
      setSocketConnected(true);

      console.log(
        "Expert connected:",
        newSocket.id
      );

      console.log(
        "Expert ID:",
        expertId
      );

      console.log(
        "Farmer ID:",
        farmerId
      );

      console.log(
        "Room ID:",
        roomId
      );

      newSocket.emit("join_room", {
  roomId,
  farmerId,
  expertId,
});
    });

    newSocket.on("disconnect", () => {
      setSocketConnected(false);

      console.log(
        "Expert disconnected"
      );
    });

    return () => {
      socketRef.current = null;
      newSocket.disconnect();
    };
  }, [farmerId, expertId, roomId]);

  const sendMessage = async () => {
  if (!socketRef.current || !roomId || !session?.user?.id) {
    return;
  }

  if (!message.trim() && !imageFile) {
    toast.error("Please type a message or select an image");
    return;
  }

  let imageUrl = "";

  if (imageFile) {
    try {
      imageUrl = await uploadImage(imageFile);
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed!");
      return;
    }
  }

  const messageData = {
    roomId,
    sender:  "expert",
    senderId: session.user.id,
    message: message.trim(),
    image: imageUrl,
  };

  socketRef.current.emit("send_message", messageData);

  setMessage("");
  setImageFile(null);
  setPreview(null);
};

  if (isPending) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6">
        Please login first.
      </div>
    );
  }

  if (!farmerId) {
    return (
      <div className="p-6">
        No farmer selected.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Expert Chat
      </h1>

      <div className="mb-4 text-sm text-gray-500">
        Connected:{" "}
        {socketConnected
          ? "Online 🟢"
          : "Connecting..."}
      </div>

      {/* Messages */}

      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">

        {messages.length === 0 ? (
          <p className="text-gray-500">
            No messages yet
          </p>
        ) : (
          messages.map(
            (msg) => (
          <div
  key={msg.id}
  className={`mb-4 ${
    msg.sender === "expert"
      ? "text-right"
      : "text-left"
  }`}
>
  <div
    className={`inline-block max-w-[80%] rounded-2xl px-4 py-3 ${
      msg.sender === "farmer"
        ? "bg-green-600 text-white"
        : "bg-gray-100 text-gray-900"
    }`}
  >
    {/* Sender */}
    <p className="text-xs font-semibold mb-2 opacity-70">
      {msg.sender}
    </p>

    {/* Image */}
    {msg.imageUrl && (
      <img
        src={msg.imageUrl}
        alt="Chat attachment"
        className="w-64 max-h-64 object-cover rounded-lg mb-2"
      />
    )}

    {/* Text */}
    {msg.message && (
      <p className="break-words">
        {msg.message}
      </p>
    )}

    {/* Time */}
    {msg.createdAt && (
      <p className="text-[11px] opacity-60 mt-2">
       { new Date(msg.createdAt).toLocaleString(
  "en-BD",
  {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }
)}
      </p>
    )}
  </div>
</div>
       ))
        )}

      </div>

      {/* Input */}

      <div className="flex gap-2 relative">
 {preview && (
  <div className="mb-3 relative inline-block">
    <img
      src={preview}
      alt="Selected image"
      className="w-24 h-24 object-cover rounded-lg border"
    />

    <button
      type="button"
      onClick={() => {
        setPreview(null);
        setImageFile(null);
      }}
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
    >
      ×
    </button>
  </div>
)}
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type your reply..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
<label htmlFor="image" className="absolute right-19 text-[#2F5943] p-2 cursor-pointer">
                                <FaPaperclip size={18} />
                            </label>
                      
                        <input
                            name="image"
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
        <button
          onClick={sendMessage}
          disabled={!socketConnected}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          Send
        </button>

      </div>

    </div>
  );
}