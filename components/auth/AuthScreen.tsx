"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { loginAccount, registerAccount } from "@/lib/auth";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";

const ZALO_URL = "https://zalo.me/84908095693";

const TABS: { key: Mode; label: string }[] = [
  { key: "login", label: "Đăng nhập" },
  { key: "register", label: "Đăng ký" },
];

const inputClass =
  "w-full rounded-xl bg-surface px-3.5 py-3 text-base text-slate-800 outline-none ring-1 ring-black/[0.07] placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary-400";

function Field({ id, label, aside, children }: { id: string; label: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-primary-700">
          {label}
        </label>
        {aside}
      </div>
      {children}
    </div>
  );
}

function PasswordInput({
  id,
  value,
  onChange,
  autoComplete,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(inputClass, "pr-12")}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-400"
      >
        {show ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>
  );
}

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setPassword("");
    setConfirm("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (mode === "register" && password !== confirm) {
      setError("Hai mật khẩu chưa trùng khớp.");
      return;
    }
    setBusy(true);
    try {
      const result =
        mode === "login"
          ? await loginAccount(identifier, password)
          : await registerAccount({ name, phone, email, password });
      if (!result.ok) setError(result.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell>
      <div className="rounded-3xl bg-white p-5 shadow-card-lg">
        <div
          role="tablist"
          aria-label="Đăng nhập hoặc đăng ký"
          className="grid grid-cols-2 gap-1 rounded-2xl bg-surface p-1"
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={mode === t.key}
              onClick={() => switchMode(t.key)}
              className={cn(
                "rounded-xl py-2.5 text-sm font-bold transition-colors",
                mode === t.key ? "bg-primary-500 text-white shadow-card" : "text-slate-500"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.form
            key={mode}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="mt-5 flex flex-col gap-4"
          >
            <div>
              <h2 className="text-lg font-bold text-primary-700">
                {mode === "login" ? "Chào mừng bạn quay lại" : "Tạo tài khoản mới"}
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                {mode === "login"
                  ? "Đăng nhập để tiếp tục học và tra cứu."
                  : "Điền thông tin bên dưới để bắt đầu sử dụng."}
              </p>
            </div>

            {mode === "login" ? (
              <>
                <Field id="login-id" label="Email hoặc số điện thoại">
                  <input
                    id="login-id"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="ten@email.com hoặc 09xx xxx xxx"
                    className={inputClass}
                  />
                </Field>
                <Field
                  id="login-pw"
                  label="Mật khẩu"
                  aside={
                    <a
                      href={ZALO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-semibold text-accent-500"
                    >
                      Quên mật khẩu?
                    </a>
                  }
                >
                  <PasswordInput
                    id="login-pw"
                    value={password}
                    onChange={setPassword}
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu"
                  />
                </Field>
              </>
            ) : (
              <>
                <Field id="reg-name" label="Họ và tên">
                  <input
                    id="reg-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Nguyễn Văn A"
                    className={inputClass}
                  />
                </Field>
                <Field id="reg-phone" label="Số điện thoại">
                  <input
                    id="reg-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="09xx xxx xxx"
                    className={inputClass}
                  />
                </Field>
                <Field id="reg-email" label="Email">
                  <input
                    id="reg-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="ten@email.com"
                    className={inputClass}
                  />
                </Field>
                <Field id="reg-pw" label="Mật khẩu">
                  <PasswordInput
                    id="reg-pw"
                    value={password}
                    onChange={setPassword}
                    autoComplete="new-password"
                    placeholder="Tối thiểu 6 ký tự"
                  />
                </Field>
                <Field id="reg-pw2" label="Nhập lại mật khẩu">
                  <PasswordInput
                    id="reg-pw2"
                    value={confirm}
                    onChange={setConfirm}
                    autoComplete="new-password"
                    placeholder="Nhập lại mật khẩu"
                  />
                </Field>
              </>
            )}

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-sm leading-snug text-accent-700 ring-1 ring-accent-200"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 py-3.5 text-base font-bold text-white shadow-card active:scale-[0.98] disabled:opacity-60"
            >
              {busy && <Loader2 size={18} className="animate-spin" />}
              {mode === "login" ? "Đăng nhập" : "Đăng ký & vào học"}
            </button>
          </motion.form>
        </AnimatePresence>

        <p className="mt-4 text-center text-sm text-slate-500">
          {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(mode === "login" ? "register" : "login")}
            className="font-bold text-accent-500"
          >
            {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </p>
        <p className="mt-3 text-center text-[13px] text-slate-400">Thông tin chỉ được lưu trên thiết bị này.</p>
      </div>
    </AuthShell>
  );
}
