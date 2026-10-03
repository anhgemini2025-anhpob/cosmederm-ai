"use client";

import { useEffect, useState, type ReactNode } from "react";
import TopNav, { TOP_NAV_HEIGHT } from "@/components/ui/TopNav";
import AuthScreen from "@/components/auth/AuthScreen";
import ExpiredScreen from "@/components/auth/ExpiredScreen";
import SplashScreen from "@/components/auth/SplashScreen";
import { AUTH_EVENT, getStatus, type AuthStatus } from "@/lib/auth";

export default function AuthGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus | "checking">("checking");

  useEffect(() => {
    const sync = () => setStatus(getStatus());
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    document.addEventListener("visibilitychange", sync);
    const timer = window.setInterval(sync, 60_000);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
      document.removeEventListener("visibilitychange", sync);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [status]);

  if (status === "checking") return <SplashScreen />;
  if (status === "none") return <AuthScreen />;
  if (status === "expired") return <ExpiredScreen />;

  return (
    <>
      <TopNav />
      <div
        className="mx-auto min-h-screen max-w-2xl bg-soft pb-10 lg:max-w-5xl xl:max-w-6xl"
        style={{ paddingTop: TOP_NAV_HEIGHT }}
      >
        {children}
      </div>
    </>
  );
}
