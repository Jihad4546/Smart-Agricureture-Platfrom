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
import { uploadImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";
import { FaPaperclip } from "react-icons/fa";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type ChatMessage = {
  id?: number;
  sender: "farmer" | "expert";
  senderId: string;
  message: string;
  imageUrl?: string | null;
  conversationId?: number;
  createdAt?: string;
};

export default function FarmerChat() {
  const searchParams = useSearchParams();

  const { data: session, isPending } = useSession();
 const [expertOnline, setExpertOnline] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
      
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [socketConnected, setSocketConnected] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const expertId = searchParams.get("expertId");

  const farmerId = session?.user?.id;

  const roomId = farmerId && expertId ? [farmerId, expertId].sort().join("-"): null;
  const {lang} = useLanguage();
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
      console.error("Failed to load messages:", error);
    }
  };

  fetchMessages();
}, [farmerId, expertId]);     

useEffect(() => {
  if (!expertId) return;

  const checkStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${expertId}/status`,
        { cache: "no-store" }
      );
      const data = await response.json();
      if (data.success) {
        setExpertOnline(Boolean(data.online));
      }
    } catch (error) {
      console.error("Failed to check expert status:", error);
    }
  };

  checkStatus();
}, [expertId]);

 useEffect(() => {
  if (
    !farmerId ||
    !expertId ||
    !roomId
  ) {
    return;
  }

  const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

  socketRef.current = newSocket;

  newSocket.on("connect", () => {
    setSocketConnected(true);

    console.log("Farmer connected:", newSocket.id);

    console.log("Farmer ID:", farmerId);

    console.log("Expert ID:", expertId);

    console.log("Room ID:", roomId);

    newSocket.emit(
      "join_room",
      {
        roomId,
        farmerId,
        expertId,
        userId: farmerId,
        role: "farmer",
      }
    );
  });

newSocket.on(
  "user_status",
  (data) => {

    console.log(
      "User status:",
      data
    );
    if (
      data.userId === expertId
    ) {
      setExpertOnline(
        data.status === "online"
      );
    }
  }
);
  newSocket.on(
    "receive_message",
    (data) => {
      console.log(
        "Farmer received:",
        data
      );

      setMessages((prev) => {
        const exists = prev.some(
          (msg) =>
            msg.id === data.id
        );

        if (exists) {
          return prev;
        }

        return [
          ...prev,
          data,
        ];
      });
    }
  );
 newSocket.on(
  "message_deleted",
  (data) => {
    setMessages((prev) =>
      prev.filter(
        (msg) => msg.id !== data.messageId
      )
    );
  }
);
  newSocket.on(
    "disconnect",
    () => {
      setSocketConnected(false);

      console.log("Farmer disconnected");
    });

  return () => {
    socketRef.current = null;
    newSocket.disconnect();
  };

}, [
  farmerId,
  expertId,
  roomId,
]);
  const sendMessage = async () => {
  if (
    !socketRef.current ||
    !roomId ||
    !farmerId
  ) {
    return;
  }

  if (!message.trim() && !imageFile) {
    toast.error("Please type a message or select an image");
    return;
  }

  let imageUrl = "";

  if (imageFile) {
    try {
      imageUrl =
        await uploadImage(imageFile);
    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      toast.error(
        "Image upload failed!"
      );

      return;
    }
  }

  const messageData = {
    roomId,
    sender: "farmer",
    senderId: farmerId,
    message: message.trim(),
      image:imageUrl,
  };

  socketRef.current.emit(
    "send_message",
    messageData
  );

  
  setMessage("");
  setImageFile(null);
  setPreview(null);
};
const deleteMessage = () => {
  if (
    !selectedMessage?.id ||
    !socketRef.current ||
    !roomId
  ) {
    return;
  }

  socketRef.current.emit(
    "delete_message",
    {
      messageId: selectedMessage.id,
      roomId,
    }
  );

  setShowDeleteModal(false);
  setSelectedMessage(null);
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

  if (!expertId) {
    return (
      <div className="p-6">
        No expert selected.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
<Link href={"/dashboard/farmerHome"} 
className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]">
  <ArrowLeft size={16} />
  {lang === "bn" ? "ফিরে যান" : "Go Back"}
</Link>
      <h1 className="text-2xl font-bold mb-6">
        {lang === 'bn' ? 'কৃষকের বার্তা' : 'Farmer Chat'}
      </h1>
<div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
  <span
    className={`w-3 h-3 rounded-full ${
      expertOnline
        ? "bg-green-500"
        : "bg-gray-400"
    }`}
  />

  <span>
    {expertOnline
      ? "Online"
      : "Offline"}
  </span>
</div>

      {/* Messages */}

      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">

        {messages.length === 0 ? (
          <p className="text-gray-500">
    {lang === 'bn' ? "এখানে কোন বার্তা নেই" : 'No messages yet'}
          </p>
        ) : (messages.map(
            (msg) => (
          <div
  key={msg.id}
  onClick={() => {
    if (msg.senderId === farmerId) {
      setSelectedMessage(msg);
      setShowDeleteModal(true);
    }
  }}
  className={`mb-4 ${
    msg.sender === "farmer"
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
       )))}

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
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 cursor-pointer"
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
          placeholder="Type your message..."
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
          className="bg-green-600 text-white px-5 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
        >
          {lang === 'bn' ? 'পাঠান' : 'Send'}
        </button>
      </div>
{showDeleteModal && selectedMessage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div className="w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-xl">

      <h2 className="text-lg font-semibold text-gray-900">
  {lang === 'bn' ? 'বার্তা মুছতে চান?' : 'Delete message?'}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
{lang === 'bn' ? 'আপনি কি নিশ্চিতভাবে বার্তাটি মুছতে চান?' : 'Are you sure you want to delete this message?'}
      </p>

      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedMessage(null);
          }}
          className="rounded-lg border px-4 py-2 text-gray-700 cursor-pointer"
        >
  {lang === 'bn' ? 'বাদ দিন' : 'Cancel'}
        </button>

        <button
          onClick={deleteMessage}
          className="rounded-lg bg-red-600 px-4 py-2 text-white cursor-pointer"
        >
          {lang === 'bn' ? 'মুছুন' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}