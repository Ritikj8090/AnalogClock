"use client";
import { useMemo, useState } from "react";

const initialFormState = { email: "", password: "", confirm: "" };

const benefits = [
  "Passwordless and social login options included",
  "Session management with activity insights",
  "Role-based access and audit logging out of the box",
];

export default function AuthPage() {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState(initialFormState);
  const [message, setMessage] = useState("");

  const isCreate = mode === "signup";

  const requirements = useMemo(
    () => [
      { label: "At least 8 characters", valid: form.password.length >= 8 },
      { label: "Contains a number", valid: /\d/.test(form.password) },
      { label: "Contains a symbol", valid: /[!@#$%^&*]/.test(form.password) },
    ],
    [form.password]
  );

  const canSubmit = useMemo(() => {
    if (!form.email || !form.password) return false;
    if (isCreate && form.password !== form.confirm) return false;
    return true;
  }, [form, isCreate]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    const action = isCreate ? "Account created" : "Welcome back";
    setMessage(`${action}! We'll connect this UI to your auth backend next.`);
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setForm(initialFormState);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-950" />
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute right-10 bottom-10 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <section className="glass-panel max-w-2xl space-y-6 p-10 shadow-2xl">
          <p className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-200 ring-1 ring-inset ring-indigo-400/30">
            Secure by design
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Launch your authentication experience in minutes.
          </h1>
          <p className="text-lg text-slate-200/80">
            A polished, responsive starter for sign-in, sign-up, and password recovery flows.
            Wire it to your preferred provider when you are ready to go live.
          </p>
          <ul className="space-y-3 text-slate-200/90">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-200 ring-1 ring-emerald-400/40">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200/70">
            <span className="pill">SAML</span>
            <span className="pill">OIDC</span>
            <span className="pill">MFA</span>
            <span className="pill">WebAuthn</span>
            <span className="pill">RBAC</span>
          </div>
        </section>

        <section className="glass-panel w-full max-w-lg p-8 shadow-2xl">
          <div className="flex gap-2 rounded-full bg-slate-900/70 p-1 ring-1 ring-inset ring-white/10">
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className={`tab ${mode === "signin" ? "tab-active" : ""}`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`tab ${mode === "signup" ? "tab-active" : ""}`}
            >
              Create account
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-100">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="input"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-100">
                <label htmlFor="password">Password</label>
                {!isCreate && <button type="button" className="text-indigo-200 hover:text-indigo-100">Forgot?</button>}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input"
              />
              {isCreate && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {requirements.map((requirement) => (
                    <div
                      key={requirement.label}
                      className={`requirement ${requirement.valid ? "requirement-valid" : ""}`}
                    >
                      {requirement.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isCreate && (
              <div className="space-y-2">
                <label htmlFor="confirm" className="text-sm font-medium text-slate-100">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="input"
                />
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-sm text-amber-200">Passwords need to match.</p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-slate-200/80">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-900 text-indigo-400" />
                Remember me
              </label>
              <span className="text-xs">Re-authentication every 30 days</span>
            </div>

            <button type="submit" disabled={!canSubmit} className="primary-btn w-full">
              {isCreate ? "Create secure account" : "Secure sign in"}
            </button>
          </form>

          {message ? (
            <p className="mt-6 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100 ring-1 ring-inset ring-emerald-400/30">
              {message}
            </p>
          ) : (
            <p className="mt-6 text-sm text-slate-200/80">
              By continuing you agree to our <a className="text-indigo-200 hover:text-indigo-100" href="#">Terms</a> and <a className="text-indigo-200 hover:text-indigo-100" href="#">Privacy</a>.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
