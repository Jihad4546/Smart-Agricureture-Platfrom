"use client";

import SideBar from "@/components/SideBar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useSession } from "@/lib/auth-client";

import {
  io,
  type Socket,
} from "socket.io-client";

import type { ReactNode } from "react";
import {
  useEffect,
  useRef,
} from "react";


export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

  const {
    data: session,
    isPending,
  } = useSession();


  const socketRef =
    useRef<Socket | null>(null);


  const userId =
    session?.user?.id;

  const role =
    session?.user?.role;

  useEffect(() => {
  if (isPending) return;
  if (!userId) return;

  const socket = io(
    process.env.NEXT_PUBLIC_SOCKET_URL
  );

  socketRef.current = socket;

  socket.on("connect", () => {
    console.log(
      "Global presence connected:",
      socket.id
    );

    console.log(
      "Logged in user:",
      userId
    );

    console.log(
      "Role:",
      role
    );

    socket.emit("user_online", {
      userId,
      role,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(
      "Global presence disconnected:",
      reason
    );
  });

  return () => {
    console.log(
      "Logging out / cleaning presence:",
      userId
    );

    socket.emit("user_logout");

    socketRef.current = null;
  };
}, [
  userId,
  role,
  isPending,
]);

  return (
    <div>
      <main className="flex p-6 overflow-y-auto">
        <LanguageProvider>
          <SideBar />
          {children}
        </LanguageProvider>
      </main>
    </div>
  );
}