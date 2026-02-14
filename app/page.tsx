"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  ClipboardCheck,
  FileSearch,
  Zap,
  Lock,
  LogIn,
  LogOut,
  User,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Mail,
  KeyRound,
  RefreshCcw,
} from "lucide-react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Aussie Verify — Single-file React site with REAL auth + forgot password + Supabase DB
 *
 * ✅ What’s included
 * - Supabase Auth: sign up, login, logout
 * - Forgot password: email reset link + update password (recovery mode)
 * - Portal: profile + verification flow persisted to Supabase tables
 * - Green & gold accents throughout; brand wordmark stays WHITE
 *
 * 🧩 Setup (Supabase)
 * 1) Create a Supabase project.
 * 2) Add env vars:
 *    - VITE_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL
 *    - VITE_SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 3) Create tables (SQL below) and enable RLS policies.
 */

const BRAND = {
  name: "Aussie Verify",
  tagline: "Confidence checks for contractors and trades — in one place.",
  subtle: "Verify key business signals and keep a simple, auditable record.",
};

// ---------------------
// Supabase (SAFE init)
// ---------------------
// The runtime error you hit was caused by calling createClient("", ""). Supabase requires a URL.
// Fix: only create the client when env vars are present.


const SUPABASE_URL =
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : "") || "";
const SUPABASE_ANON_KEY =
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "") || "";
const HAS_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const supabase: SupabaseClient | null = HAS_SUPABASE
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function assertSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_* for Next.js)."
    );
  }
  return supabase;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// ---------------------
// Lightweight self-tests
// ---------------------
// No formal test runner in this single-file setup, but these assertions catch regressions during dev.
(function selfTests() {
  // Basic helpers
  console.assert(cx("a", false, "b") === "a b", "cx() should join truthy classes");
  console.assert(typeof formatDateTime(new Date().toISOString()) === "string", "formatDateTime should return string");
})();

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950" />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-100 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <span>Verification portal for trades & procurement</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {BRAND.name}
            </h1>
            <p className="mt-4 text-lg text-zinc-200">{BRAND.tagline}</p>
            <p className="mt-3 text-zinc-300">{BRAND.subtle}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#login"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-emerald-400"
              >
                Login to your portal
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-white/10"
              >
                How it works
                <ClipboardCheck className="h-4 w-4 text-amber-300" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-zinc-200 sm:max-w-md">
              <Stat label="Checks recorded" value="Audit-ready" accent="emerald" />
              <Stat label="Workflow" value="Simple" accent="amber" />
              <Stat label="Coverage" value="AU focus" accent="emerald" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-amber-300" />
                <div className="text-sm font-medium text-white">Example verification</div>
              </div>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-zinc-200">Preview</span>
            </div>

            <div className="mt-4 grid gap-3">
              <CardRow icon={<User className="h-4 w-4" />} label="Business" value="North Shore Plumbing Co." />
              <CardRow
                icon={<ClipboardCheck className="h-4 w-4" />}
                label="Status"
                value={
                  <span className="inline-flex items-center gap-1 text-emerald-200">
                    <CheckCircle2 className="h-4 w-4" /> Verified signals
                  </span>
                }
              />
              <CardRow
                icon={<FileSearch className="h-4 w-4" />}
                label="Checks"
                value="ABN • Insurance • Licences • References"
              />
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl bg-white/10 p-2">
                    <Zap className="h-4 w-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Keep it consistent</div>
                    <p className="mt-1 text-sm text-zinc-200">
                      Run the same checklist every time, attach notes, and export a record for your files.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "emerald" | "amber";
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-3 shadow-sm">
      <div className="text-[11px] text-zinc-200">{label}</div>
      <div
        className={cx(
          "mt-1 text-sm font-semibold",
          accent === "emerald" ? "text-emerald-200" : "text-amber-200"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function CardRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-zinc-200">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
          {icon}
        </span>
        <span className="font-medium text-white">{label}</span>
      </div>
      <div className="text-sm text-zinc-200">{value}</div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-14">
      <div className="max-w-3xl">
        <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">{eyebrow}</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      icon: <ClipboardCheck className="h-5 w-5" />,
      title: "Standardised checks",
      body: "Create a repeatable verification flow for trades and suppliers — no more ad-hoc screenshots and inbox archaeology.",
      accent: "emerald",
    },
    {
      icon: <FileSearch className="h-5 w-5" />,
      title: "Evidence & notes",
      body: "Attach notes, links, and outcomes so your team has a clear record of why a contractor was approved or flagged.",
      accent: "amber",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Better risk hygiene",
      body: "Reduce the chance of engaging the wrong provider and improve consistency in onboarding decisions.",
      accent: "emerald",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Secure portal",
      body: "Real authentication with password reset. Database-backed records with row-level security.",
      accent: "amber",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {features.map((f) => (
        <div key={f.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                f.accent === "emerald" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
              )}
            >
              {f.icon}
            </span>
            <div className="text-base font-semibold text-zinc-900">{f.title}</div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Sign up or login",
      body: "Create an account, confirm your email, and access your secure portal.",
      icon: <LogIn className="h-5 w-5" />,
      accent: "emerald",
    },
    {
      title: "Run a verification",
      body: "Enter contractor details, record checklist outcomes, and save evidence notes.",
      icon: <Search className="h-5 w-5" />,
      accent: "amber",
    },
    {
      title: "Store outcomes & export",
      body: "Maintain a clear record for future reference and procurement assurance.",
      icon: <BadgeCheck className="h-5 w-5" />,
      accent: "emerald",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span
              className={cx(
                "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                s.accent === "emerald" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
              )}
            >
              {s.icon}
            </span>
            <span className="text-xs text-zinc-500">Step {i + 1}</span>
          </div>
          <div className="mt-4 text-base font-semibold text-zinc-900">{s.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      note: "Proof of concept",
      features: ["Secure login", "Password reset", "Up to 25 verifications"],
      cta: "Start free",
      accent: "emerald",
    },
    {
      name: "Team",
      price: "$99",
      note: "per month",
      features: ["Unlimited verifications", "Exports", "Team roles (next)"],
      cta: "Request access",
      highlight: true,
      accent: "amber",
    },
    {
      name: "Enterprise",
      price: "Custom",
      note: "Talk to us",
      features: ["SSO / RBAC", "Integrations", "Custom workflows"],
      cta: "Contact sales",
      accent: "emerald",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={cx(
            "rounded-3xl border bg-white p-6 shadow-sm",
            t.highlight ? "border-zinc-900" : "border-zinc-200"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-zinc-900">{t.name}</div>
            {t.highlight ? (
              <span className="rounded-full bg-zinc-900 px-2 py-1 text-xs text-white">Recommended</span>
            ) : null}
          </div>
          <div className="mt-3 flex items-end gap-2">
            <div className="text-3xl font-semibold text-zinc-900">{t.price}</div>
            <div className="pb-1 text-sm text-zinc-500">{t.note}</div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {t.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle2
                  className={cx(
                    "h-4 w-4",
                    t.accent === "emerald" ? "text-emerald-600" : "text-amber-700"
                  )}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <a
            href="#login"
            className={cx(
              "mt-6 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium shadow-sm",
              t.highlight
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : t.accent === "emerald"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                : "border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100"
            )}
          >
            {t.cta}
          </a>
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-zinc-600">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a className="text-zinc-600 hover:text-emerald-700" href="#how">
            How it works
          </a>
          <a className="text-zinc-600 hover:text-amber-800" href="#features">
            Features
          </a>
          <a className="text-zinc-600 hover:text-emerald-700" href="#pricing">
            Pricing
          </a>
          <a className="text-zinc-600 hover:text-amber-800" href="#login">
            Login
          </a>
        </div>
      </div>
    </footer>
  );
}

function TopNav({ onOpenLogin }: { onOpenLogin: () => void }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/75 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-zinc-950 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            {/* Keep font WHITE for Aussie Verify */}
            <div className="text-sm font-semibold text-white">{BRAND.name}</div>
            <div className="text-[11px] text-zinc-300">Contractor verification portal</div>
          </div>
        </a>

        <div className="hidden items-center gap-5 text-sm sm:flex">
          <a className="text-zinc-200 hover:text-emerald-300" href="#how">
            How it works
          </a>
          <a className="text-zinc-200 hover:text-amber-300" href="#features">
            Features
          </a>
          <a className="text-zinc-200 hover:text-emerald-300" href="#pricing">
            Pricing
          </a>
          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-amber-300"
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
        </div>

        <button
          onClick={onOpenLogin}
          className="sm:hidden inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-amber-300"
        >
          <LogIn className="h-4 w-4" />
          Login
        </button>
      </div>
    </div>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-zinc-900">{title}</div>
                <div className="mt-1 text-xs text-zinc-500">Secure portal access</div>
              </div>
              <button
                onClick={onClose}
                className="rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-50"
                aria-label="Close"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-zinc-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none focus:border-emerald-600"
      />
    </label>
  );
}

function Toast({
  kind = "info",
  title,
  body,
  onClose,
}: {
  kind?: "info" | "success" | "error";
  title: string;
  body?: string;
  onClose: () => void;
}) {
  const icon =
    kind === "success" ? (
      <CheckCircle2 className="h-5 w-5" />
    ) : kind === "error" ? (
      <XCircle className="h-5 w-5" />
    ) : (
      <AlertTriangle className="h-5 w-5" />
    );

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2">
      <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl bg-zinc-100 p-2 text-zinc-900">{icon}</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-zinc-900">{title}</div>
            {body ? <div className="mt-1 text-sm text-zinc-600">{body}</div> : null}
          </div>
          <button
            onClick={onClose}
            className="rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-50"
            aria-label="Close"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------
// Supabase DB helpers
// ---------------------

type ProfileRow = {
  user_id: string;
  org_name: string;
  role: string;
  phone: string;
  state: string;
  updated_at?: string;
};

type VerificationOutcome = "verified" | "review" | "flagged";

type VerificationRow = {
  id: string;
  user_id: string;
  created_at: string;
  contractor_name: string;
  trade: string;
  abn: string;
  licence: string;
  insurance: string;
  notes: string;
  outcome: VerificationOutcome;
};

async function dbUpsertProfile(userId: string, profile: ProfileRow) {
  const sb = assertSupabase();
  const { error } = await sb.from("profiles").upsert({
    user_id: userId,
    org_name: profile.org_name,
    role: profile.role,
    phone: profile.phone,
    state: profile.state,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

async function dbGetProfile(userId: string): Promise<ProfileRow> {
  const sb = assertSupabase();
  const { data, error } = await sb
    .from("profiles")
    .select("user_id, org_name, role, phone, state, updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return (
    data || {
      user_id: userId,
      org_name: "",
      role: "",
      phone: "",
      state: "NSW",
      updated_at: new Date().toISOString(),
    }
  );
}

async function dbListVerifications(userId: string): Promise<VerificationRow[]> {
  const sb = assertSupabase();
  const { data, error } = await sb
    .from("verifications")
    .select("id, user_id, created_at, contractor_name, trade, abn, licence, insurance, notes, outcome")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

async function dbCreateVerification(
  userId: string,
  v: Omit<VerificationRow, "id" | "created_at" | "user_id">
) {
  const sb = assertSupabase();
  const { error } = await sb.from("verifications").insert({
    user_id: userId,
    contractor_name: v.contractor_name,
    trade: v.trade,
    abn: v.abn,
    licence: v.licence,
    insurance: v.insurance,
    notes: v.notes,
    outcome: v.outcome,
  });
  if (error) throw error;
}

async function dbDeleteVerification(userId: string, id: string) {
  const sb = assertSupabase();
  const { error } = await sb.from("verifications").delete().eq("id", id).eq("user_id", userId);
  if (error) throw error;
}

function PortalHeader({ email, onLogout }: { email: string; onLogout: () => void }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/75 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-zinc-950 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <div className="text-sm font-semibold text-white">{BRAND.name} Portal</div>
            <div className="text-[11px] text-zinc-300">
              Signed in as <span className="font-medium text-amber-200">{email}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-amber-300"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

function PortalNavButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full rounded-2xl px-4 py-3 text-left text-sm font-medium",
        active
          ? "bg-emerald-500 text-zinc-950"
          : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

function MiniStat({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  accent: "emerald" | "amber";
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-white">{title}</div>
        <span
          className={cx(
            "inline-flex h-8 w-8 items-center justify-center rounded-2xl",
            accent === "emerald"
              ? "bg-emerald-500/20 text-emerald-200"
              : "bg-amber-400/20 text-amber-200"
          )}
        >
          {icon}
        </span>
      </div>
      <div
        className={cx(
          "mt-2 text-2xl font-semibold",
          accent === "emerald" ? "text-emerald-200" : "text-amber-200"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function outcomeMeta(outcome: VerificationOutcome) {
  if (outcome === "verified")
    return {
      label: "Verified",
      icon: <CheckCircle2 className="h-4 w-4" />,
      cls: "text-emerald-200",
    };
  if (outcome === "flagged")
    return {
      label: "Flagged",
      icon: <XCircle className="h-4 w-4" />,
      cls: "text-rose-200",
    };
  return {
    label: "Needs review",
    icon: <AlertTriangle className="h-4 w-4" />,
    cls: "text-amber-200",
  };
}

(function outcomeMetaTests() {
  const a = outcomeMeta("verified");
  const b = outcomeMeta("review");
  const c = outcomeMeta("flagged");
  console.assert(a.label === "Verified", "outcomeMeta verified label");
  console.assert(b.label === "Needs review", "outcomeMeta review label");
  console.assert(c.label === "Flagged", "outcomeMeta flagged label");
})();

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">{label}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}

function CheckCard({ c, onDelete }: { c: VerificationRow; onDelete: (id: string) => void }) {
  const meta = outcomeMeta(c.outcome);
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-base font-semibold text-white">{c.contractor_name}</div>
          <div className="mt-1 text-sm text-zinc-300">
            {c.trade ? <span>{c.trade}</span> : <span className="italic">No trade/category</span>} •{" "}
            {formatDateTime(c.created_at)}
          </div>
        </div>
        <div
          className={cx(
            "inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm",
            meta.cls
          )}
        >
          {meta.icon}
          <span className="font-medium">{meta.label}</span>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-zinc-200 sm:grid-cols-2">
        <InfoLine label="ABN" value={c.abn || "—"} />
        <InfoLine label="Licence" value={c.licence || "—"} />
        <InfoLine label="Insurance" value={c.insurance || "—"} />
      </div>

      {c.notes ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-200">
          <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">Notes</div>
          <div className="mt-2 whitespace-pre-wrap leading-relaxed">{c.notes}</div>
        </div>
      ) : null}

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onDelete(c.id)}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/10"
        >
          <XCircle className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}

function OutcomeButton({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-3xl border px-4 py-4 text-left shadow-sm",
        active
          ? "border-emerald-400 bg-emerald-500 text-zinc-950"
          : "border-white/10 bg-white/5 text-white hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cx(
            "inline-flex h-9 w-9 items-center justify-center rounded-2xl",
            active ? "bg-black/10" : "bg-black/20"
          )}
        >
          {icon}
        </span>
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className={cx("mt-0.5 text-xs", active ? "text-zinc-950/80" : "text-zinc-300")}>{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

function Portal({
  userId,
  email,
  onLogout,
  setToast,
}: {
  userId: string;
  email: string;
  onLogout: () => void;
  setToast: (t: { kind: "success" | "error" | "info"; title: string; body?: string } | null) => void;
}) {
  const [tab, setTab] = useState<"dashboard" | "new" | "history" | "profile">("dashboard");
  const [profile, setProfile] = useState<ProfileRow>({
    user_id: userId,
    org_name: "",
    role: "",
    phone: "",
    state: "NSW",
  });
  const [checks, setChecks] = useState<VerificationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCheck, setNewCheck] = useState({
    contractor_name: "",
    trade: "",
    abn: "",
    licence: "",
    insurance: "",
    notes: "",
    outcome: "verified" as VerificationOutcome,
  });

  const [filter, setFilter] = useState("");

  async function refreshAll() {
    setLoading(true);
    try {
      const [p, v] = await Promise.all([dbGetProfile(userId), dbListVerifications(userId)]);
      setProfile(p);
      setChecks(v);
    } catch (e: any) {
      setToast({ kind: "error", title: "Couldn’t load data", body: e?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function saveProfileClick() {
    try {
      await dbUpsertProfile(userId, profile);
      setToast({ kind: "success", title: "Profile saved" });
    } catch (e: any) {
      setToast({ kind: "error", title: "Couldn’t save profile", body: e?.message || "Unknown error" });
    }
  }

  async function addCheck() {
    if (!newCheck.contractor_name.trim()) {
      setToast({ kind: "error", title: "Missing contractor name", body: "Add a contractor/business name." });
      return;
    }
    try {
      await dbCreateVerification(userId, newCheck);
      setToast({ kind: "success", title: "Verification saved" });
      setNewCheck({
        contractor_name: "",
        trade: "",
        abn: "",
        licence: "",
        insurance: "",
        notes: "",
        outcome: "verified",
      });
      await refreshAll();
      setTab("history");
    } catch (e: any) {
      setToast({ kind: "error", title: "Couldn’t save verification", body: e?.message || "Unknown error" });
    }
  }

  async function removeCheck(id: string) {
    try {
      await dbDeleteVerification(userId, id);
      setToast({ kind: "success", title: "Deleted" });
      await refreshAll();
    } catch (e: any) {
      setToast({ kind: "error", title: "Couldn’t delete", body: e?.message || "Unknown error" });
    }
  }

  function exportJson() {
    const payload = { userId, email, profile, verifications: checks };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aussie-verify-export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredChecks = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return checks;
    return checks.filter((c) =>
      [c.contractor_name, c.trade, c.abn, c.licence, c.insurance, c.notes, c.outcome]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [checks, filter]);

  const counts = useMemo(() => {
    const v = checks.filter((c) => c.outcome === "verified").length;
    const f = checks.filter((c) => c.outcome === "flagged").length;
    const r = checks.filter((c) => c.outcome === "review").length;
    return { verified: v, flagged: f, review: r, total: checks.length };
  }, [checks]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <PortalHeader email={email} onLogout={onLogout} />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">Portal</div>
            <div className="mt-1 text-base font-semibold text-white">Your workspace</div>

            <div className="mt-4 grid gap-2">
              <PortalNavButton active={tab === "dashboard"} onClick={() => setTab("dashboard")}>
                Dashboard
              </PortalNavButton>
              <PortalNavButton active={tab === "new"} onClick={() => setTab("new")}>
                New verification
              </PortalNavButton>
              <PortalNavButton active={tab === "history"} onClick={() => setTab("history")}>
                Verification history
              </PortalNavButton>
              <PortalNavButton active={tab === "profile"} onClick={() => setTab("profile")}>
                Profile
              </PortalNavButton>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Quick export</div>
              <p className="mt-1 text-sm text-zinc-300">Download your checks + profile as JSON.</p>
              <button
                onClick={exportJson}
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-amber-300"
              >
                Export
              </button>
            </div>

            <div className="mt-4 text-xs text-zinc-400">{loading ? "Syncing with database…" : "Database synced"}</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <AnimatePresence mode="wait">
              {tab === "dashboard" ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">Overview</div>
                    <div className="mt-1 text-2xl font-semibold text-white">Dashboard</div>
                    <div className="mt-1 text-sm text-zinc-300">Track outcomes and keep your workflow consistent.</div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <MiniStat
                      title="Total"
                      value={counts.total}
                      icon={<ClipboardCheck className="h-4 w-4" />}
                      accent="emerald"
                    />
                    <MiniStat
                      title="Verified"
                      value={counts.verified}
                      icon={<CheckCircle2 className="h-4 w-4" />}
                      accent="emerald"
                    />
                    <MiniStat
                      title="Needs review"
                      value={counts.review}
                      icon={<AlertTriangle className="h-4 w-4" />}
                      accent="amber"
                    />
                    <MiniStat
                      title="Flagged"
                      value={counts.flagged}
                      icon={<XCircle className="h-4 w-4" />}
                      accent="amber"
                    />
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">Recent verifications</div>
                        <div className="mt-1 text-sm text-zinc-300">Your last few checks appear here.</div>
                      </div>
                      <button
                        onClick={() => setTab("new")}
                        className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-emerald-400"
                      >
                        New verification
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {checks.slice(0, 3).length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-sm text-zinc-200">
                          No checks yet. Create your first verification.
                        </div>
                      ) : (
                        checks.slice(0, 3).map((c) => <CheckCard key={c.id} c={c} onDelete={removeCheck} />)
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : null}

              {tab === "new" ? (
                <motion.div
                  key="new"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">Workflow</div>
                    <div className="mt-1 text-2xl font-semibold text-white">New verification</div>
                    <div className="mt-1 text-sm text-zinc-300">Enter details and save to the database.</div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Contractor / business name"
                      value={newCheck.contractor_name}
                      onChange={(v) => setNewCheck((s) => ({ ...s, contractor_name: v }))}
                      placeholder="e.g., North Shore Plumbing Co."
                    />
                    <TextField
                      label="Trade / category"
                      value={newCheck.trade}
                      onChange={(v) => setNewCheck((s) => ({ ...s, trade: v }))}
                      placeholder="e.g., Plumbing"
                    />
                    <TextField
                      label="ABN (optional)"
                      value={newCheck.abn}
                      onChange={(v) => setNewCheck((s) => ({ ...s, abn: v }))}
                      placeholder="e.g., 12 345 678 901"
                    />
                    <TextField
                      label="Licence / registration (optional)"
                      value={newCheck.licence}
                      onChange={(v) => setNewCheck((s) => ({ ...s, licence: v }))}
                      placeholder="e.g., QBCC 123456"
                    />
                    <TextField
                      label="Insurance (optional)"
                      value={newCheck.insurance}
                      onChange={(v) => setNewCheck((s) => ({ ...s, insurance: v }))}
                      placeholder="e.g., Public liability $20m"
                    />

                    <label className="grid gap-1 md:col-span-2">
                      <span className="text-xs font-medium text-zinc-300">Notes</span>
                      <textarea
                        value={newCheck.notes}
                        onChange={(e) => setNewCheck((s) => ({ ...s, notes: e.target.value }))}
                        placeholder="Add notes, links, reference checks, or rationale..."
                        className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-sm outline-none placeholder:text-zinc-400 focus:border-emerald-400"
                      />
                    </label>

                    <div className="grid gap-2 md:col-span-2">
                      <div className="text-xs font-medium text-zinc-300">Outcome</div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        <OutcomeButton
                          active={newCheck.outcome === "verified"}
                          onClick={() => setNewCheck((s) => ({ ...s, outcome: "verified" }))}
                          icon={<CheckCircle2 className="h-4 w-4" />}
                          title="Verified"
                          subtitle="Signals look good"
                        />
                        <OutcomeButton
                          active={newCheck.outcome === "review"}
                          onClick={() => setNewCheck((s) => ({ ...s, outcome: "review" }))}
                          icon={<AlertTriangle className="h-4 w-4" />}
                          title="Needs review"
                          subtitle="Follow-up required"
                        />
                        <OutcomeButton
                          active={newCheck.outcome === "flagged"}
                          onClick={() => setNewCheck((s) => ({ ...s, outcome: "flagged" }))}
                          icon={<XCircle className="h-4 w-4" />}
                          title="Flagged"
                          subtitle="Do not proceed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      onClick={addCheck}
                      className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-emerald-400"
                    >
                      Save verification
                    </button>
                    <button
                      onClick={() => setTab("history")}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-white/10"
                    >
                      View history
                    </button>
                  </div>
                </motion.div>
              ) : null}

              {tab === "history" ? (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">Records</div>
                      <div className="mt-1 text-2xl font-semibold text-white">Verification history</div>
                      <div className="mt-1 text-sm text-zinc-300">Search and delete records.</div>
                    </div>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                      <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search checks..."
                        className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white shadow-sm outline-none placeholder:text-zinc-400 focus:border-amber-300 sm:w-72"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {filteredChecks.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-zinc-200">
                        No matching checks.
                      </div>
                    ) : (
                      filteredChecks.map((c) => <CheckCard key={c.id} c={c} onDelete={removeCheck} />)
                    )}
                  </div>
                </motion.div>
              ) : null}

              {tab === "profile" ? (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">Account</div>
                    <div className="mt-1 text-2xl font-semibold text-white">Profile</div>
                    <div className="mt-1 text-sm text-zinc-300">Update your organisation details.</div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Organisation name"
                      value={profile.org_name}
                      onChange={(v) => setProfile((s) => ({ ...s, org_name: v }))}
                      placeholder="e.g., Acme Facilities"
                    />
                    <TextField
                      label="Role"
                      value={profile.role}
                      onChange={(v) => setProfile((s) => ({ ...s, role: v }))}
                      placeholder="e.g., Procurement Manager"
                    />
                    <TextField
                      label="Phone"
                      value={profile.phone}
                      onChange={(v) => setProfile((s) => ({ ...s, phone: v }))}
                      placeholder="e.g., 04xx xxx xxx"
                    />

                    <label className="grid gap-1 md:col-span-2">
                      <span className="text-xs font-medium text-zinc-300">State / territory</span>
                      <select
                        value={profile.state}
                        onChange={(e) => setProfile((s) => ({ ...s, state: e.target.value }))}
                        className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white shadow-sm outline-none focus:border-emerald-400"
                      >
                        {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((s) => (
                          <option key={s} value={s} className="bg-zinc-950">
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={saveProfileClick}
                      className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-amber-300"
                    >
                      Save profile
                    </button>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="text-sm font-semibold text-white">Security note</div>
                    <p className="mt-1 text-sm text-zinc-300">
                      This portal uses Supabase Auth and database storage. Enable RLS (row-level security)
                      so each user can only access their own records.
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------
// Auth UI
// ---------------------

function AuthForm({
  onAuthed,
  setToast,
}: {
  onAuthed: (u: { userId: string; email: string }) => void;
  setToast: (t: { kind: "success" | "error" | "info"; title: string; body?: string } | null) => void;
}) {
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const isClient = useIsClient();

  // If user lands on app with recovery tokens (Supabase), show reset UI
  useEffect(() => {
    if (!isClient || !HAS_SUPABASE) return;

    (async () => {
      const sb = assertSupabase();
      const { data } = await sb.auth.getSession();

      const url = new URL(window.location.href);
      const type = url.searchParams.get("type");
      if (type === "recovery") {
        setMode("reset");
      }

      if (data.session?.user) {
        onAuthed({ userId: data.session.user.id, email: data.session.user.email || "" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isClient]);

  async function login() {
    setBusy(true);
    try {
      const sb = assertSupabase();
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("No user returned.");
      setToast({ kind: "success", title: "Welcome back", body: "Opening your portal…" });
      onAuthed({ userId: data.user.id, email: data.user.email || email });
    } catch (e: any) {
      setToast({ kind: "error", title: "Login failed", body: e?.message || "Unknown error" });
    } finally {
      setBusy(false);
    }
  }

  async function register() {
    setBusy(true);
    try {
      const sb = assertSupabase();
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;

      if (!data.session) {
        setToast({
          kind: "success",
          title: "Check your inbox",
          body: "Confirm your email to finish signup, then login.",
        });
        setMode("login");
        return;
      }

      await dbUpsertProfile(data.user!.id, {
        user_id: data.user!.id,
        org_name: "",
        role: "",
        phone: "",
        state: "NSW",
      });

      setToast({ kind: "success", title: "Account created", body: "Opening your portal…" });
      onAuthed({ userId: data.user!.id, email: data.user!.email || email });
    } catch (e: any) {
      setToast({ kind: "error", title: "Signup failed", body: e?.message || "Unknown error" });
    } finally {
      setBusy(false);
    }
  }

  async function sendReset() {
    setBusy(true);
    try {
      const sb = assertSupabase();
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}?type=recovery`,
      });
      if (error) throw error;
      setToast({ kind: "success", title: "Reset link sent", body: "Check your email for a reset link." });
      setMode("login");
    } catch (e: any) {
      setToast({ kind: "error", title: "Couldn’t send reset", body: e?.message || "Unknown error" });
    } finally {
      setBusy(false);
    }
  }

  async function updatePassword() {
    setBusy(true);
    try {
      const sb = assertSupabase();
      const { data: sess } = await sb.auth.getSession();
      if (!sess.session) throw new Error("No recovery session. Use the email link again.");

      const { error } = await sb.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setToast({ kind: "success", title: "Password updated", body: "You’re now signed in." });

      const u = sess.session.user;
      onAuthed({ userId: u.id, email: u.email || "" });
    } catch (e: any) {
      setToast({ kind: "error", title: "Couldn’t update password", body: e?.message || "Unknown error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div id="login" className="grid gap-4">
      {isClient && !HAS_SUPABASE ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-2xl bg-white p-2 shadow-sm text-amber-800">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-amber-900">Supabase env vars missing</div>
              <p className="mt-1 text-sm text-amber-800">
                Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_* for Next.js) to enable real auth.
              </p>
              <p className="mt-2 text-xs text-amber-800">
                The marketing site will still load; login/portal is disabled until configured.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl bg-white p-2 shadow-sm">
            <Lock className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">Secure login</div>
            <p className="mt-1 text-sm text-zinc-600">Email + password authentication with password reset.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <button
            onClick={() => setMode("login")}
            className={cx(
              "rounded-2xl px-4 py-2 text-sm font-medium",
              mode === "login"
                ? "bg-emerald-600 text-white"
                : "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
            )}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={cx(
              "rounded-2xl px-4 py-2 text-sm font-medium",
              mode === "register"
                ? "bg-amber-400 text-zinc-950"
                : "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
            )}
          >
            Sign up
          </button>
          <button
            onClick={() => setMode("forgot")}
            className={cx(
              "rounded-2xl px-4 py-2 text-sm font-medium",
              mode === "forgot"
                ? "bg-zinc-900 text-white"
                : "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
            )}
          >
            Forgot
          </button>
        </div>

        <TextField
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="you@company.com"
          autoComplete="email"
          type="email"
        />

        {mode === "reset" ? (
          <TextField
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Enter a strong password"
            autoComplete="new-password"
            type="password"
          />
        ) : (
          <TextField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder={mode === "register" ? "Create a password" : "Enter your password"}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            type="password"
          />
        )}

        <div className="grid gap-2">
          {mode === "login" ? (
            <button
              disabled={busy || !HAS_SUPABASE}
              onClick={login}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {busy ? "Signing in…" : "Login"}
            </button>
          ) : null}

          {mode === "register" ? (
            <button
              disabled={busy || !HAS_SUPABASE}
              onClick={register}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-amber-300 disabled:opacity-60"
            >
              <BadgeCheck className="h-4 w-4" />
              {busy ? "Creating…" : "Create account"}
            </button>
          ) : null}

          {mode === "forgot" ? (
            <button
              disabled={busy || !HAS_SUPABASE}
              onClick={sendReset}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-60"
            >
              <Mail className="h-4 w-4" />
              {busy ? "Sending…" : "Send reset link"}
            </button>
          ) : null}

          {mode === "reset" ? (
            <button
              disabled={busy || !HAS_SUPABASE}
              onClick={updatePassword}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-60"
            >
              <KeyRound className="h-4 w-4" />
              {busy ? "Updating…" : "Update password"}
            </button>
          ) : null}
        </div>

        <div className="text-xs text-zinc-500">
          Password reset: click “Forgot”, enter your email, then follow the emailed link.
        </div>
      </div>
    </div>
  );
}

export default function AussieVerifySite() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [toast, setToast] = useState<{
    kind: "success" | "error" | "info";
    title: string;
    body?: string;
  } | null>(null);

  useEffect(() => {
    if (!HAS_SUPABASE) return;

    (async () => {
      const sb = assertSupabase();
      const { data } = await sb.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
        setEmail(data.session.user.email || "");
      }
    })();

    const sb = assertSupabase();
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setEmail(session.user.email || "");
      } else {
        setUserId(null);
        setEmail("");
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    if (!HAS_SUPABASE) return;
    const sb = assertSupabase();
    await sb.auth.signOut();
    setToast({ kind: "success", title: "Logged out", body: "You have been signed out." });
  }

  if (userId) {
    return <Portal userId={userId} email={email} onLogout={logout} setToast={setToast} />;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <TopNav onOpenLogin={() => setLoginOpen(true)} />
      <Hero />

      <Section id="features" eyebrow="What you get" title="Designed to standardise contractor verification">
        <FeatureGrid />
      </Section>

      <Section id="how" eyebrow="Workflow" title="How Aussie Verify works">
        <HowItWorks />
      </Section>

      <Section id="pricing" eyebrow="Commercial" title="Simple pricing to start">
        <Pricing />
        <div className="mt-5 text-sm text-zinc-500">Pricing is placeholder for the prototype.</div>
      </Section>

      <Section id="login" eyebrow="Portal" title="Login to your portal">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <AuthForm
              onAuthed={({ userId, email }) => {
                setUserId(userId);
                setEmail(email);
                setLoginOpen(false);
              }}
              setToast={setToast}
            />
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">Inside the portal</div>
            <p className="mt-2 text-sm text-zinc-600">
              A secure portal with dashboard, verification workflow, history, profile settings, and export.
            </p>
            <div className="mt-5 grid gap-3">
              <PortalPreviewRow
                icon={<ClipboardCheck className="h-4 w-4 text-emerald-700" />}
                title="Dashboard"
                body="Quick stats and recent checks."
              />
              <PortalPreviewRow
                icon={<Search className="h-4 w-4 text-amber-800" />}
                title="New verification"
                body="Record details and outcomes."
              />
              <PortalPreviewRow
                icon={<FileSearch className="h-4 w-4 text-emerald-700" />}
                title="History"
                body="Searchable record of checks."
              />
              <PortalPreviewRow
                icon={<RefreshCcw className="h-4 w-4 text-amber-800" />}
                title="Database sync"
                body="Records stored in Supabase with RLS."
              />
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-sm font-semibold text-emerald-900">Supabase SQL (copy/paste)</div>
              <p className="mt-1 text-sm text-emerald-800">Create tables + policies. Keep this in your project notes.</p>
              <pre className="mt-3 max-h-64 overflow-auto rounded-2xl bg-white p-4 text-xs text-zinc-900 border border-emerald-100">
{`-- PROFILES
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  org_name text not null default '',
  role text not null default '',
  phone text not null default '',
  state text not null default 'NSW',
  updated_at timestamptz not null default now()
);

-- VERIFICATIONS
create table if not exists public.verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  contractor_name text not null,
  trade text not null default '',
  abn text not null default '',
  licence text not null default '',
  insurance text not null default '',
  notes text not null default '',
  outcome text not null default 'verified'
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.verifications enable row level security;

-- Policies: each user can access only their own rows
create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = user_id);
create policy "profiles_upsert_own" on public.profiles
for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = user_id);

create policy "verifications_select_own" on public.verifications
for select using (auth.uid() = user_id);
create policy "verifications_insert_own" on public.verifications
for insert with check (auth.uid() = user_id);
create policy "verifications_delete_own" on public.verifications
for delete using (auth.uid() = user_id);
`}
              </pre>
            </div>
          </div>
        </div>
      </Section>

      <Footer />

      <Modal open={loginOpen} onClose={() => setLoginOpen(false)} title="Login">
        <AuthForm
          onAuthed={({ userId, email }) => {
            setUserId(userId);
            setEmail(email);
            setLoginOpen(false);
          }}
          setToast={setToast}
        />
      </Modal>

      {toast ? (
        <Toast kind={toast.kind} title={toast.title} body={toast.body} onClose={() => setToast(null)} />
      ) : null}
    </div>
  );
}

function PortalPreviewRow({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-100">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-zinc-900">{title}</div>
        <div className="mt-1 text-sm text-zinc-600">{body}</div>
      </div>
    </div>
  );
}
