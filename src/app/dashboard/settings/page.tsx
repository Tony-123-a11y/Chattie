"use client";

import { useState } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";

export default function AccountSettingsPage() {
  const [fullName, setFullName] = useState("Alex Architect");
  const [email, setEmail] = useState("alex@chattie.ai");
  const [twoFactor, setTwoFactor] = useState(false);
  const [deleteStep, setDeleteStep] = useState(0);

  const handleSaveChanges = () => {
    // TODO: call API to save profile changes
    alert("Profile changes saved.");
  };

  const handleUpdatePassword = () => {
    // TODO: navigate to change-password flow or open modal
    alert("Redirecting to update password...");
  };

  const handleDeleteAccount = () => {
    if (deleteStep === 0) {
      setDeleteStep(1);
    } else {
      // TODO: call account deletion API
      alert("Account deleted.");
    }
  };

  return (
    <div className="flex-1 flex justify-center overflow-y-auto h-screen  bg-[#FAFAFA] px-8 py-10">
      {/* Page Header */}
      <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Manage your personal information and security preferences.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">

        {/* ── Profile Information ─────────────────────────────────────── */}
        <section className="bg-white border border-[#E5E5F0] rounded-2xl overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-[#F0F0F8]">
            <h2 className="text-base font-semibold text-text">
              Profile Information
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Update your display name and contact details.
            </p>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Avatar Row */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary-50 group cursor-pointer">
                <img
                  src="https://api.dicebear.com/7.x/personas/svg?seed=AlexArchitect"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[10px] font-semibold text-center leading-tight px-1">
                    Change
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-text border border-[#D1D5DB] rounded-lg hover:bg-[#F5F5FA] transition-colors">
                Change Avatar
              </button>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-text-muted mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm text-text border border-[#D1D5DB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold tracking-widest uppercase text-text-muted mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm text-text border border-[#D1D5DB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-800 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </section>

        {/* ── Security & Authentication ────────────────────────────────── */}
        <section className="bg-white border border-[#E5E5F0] rounded-2xl overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-[#F0F0F8]">
            <h2 className="text-base font-semibold text-text">
              Security &amp; Authentication
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Manage your password and secondary email options.
            </p>
          </div>

          <div className="divide-y divide-[#F0F0F8]">
            {/* Change Password */}
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-text">
                  Change Password
                </p>
                <p className="text-xs text-text-muted mt-0.5 max-w-xs leading-relaxed">
                  Ensure your account is using a long, random password to stay
                  secure.
                </p>
              </div>
              <button
                onClick={handleUpdatePassword}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text border border-[#D1D5DB] rounded-lg hover:bg-[#F5F5FA] transition-colors"
              >
                Update Password
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-text">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-text-muted mt-0.5 max-w-xs leading-relaxed">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                {/* Toggle */}
                <button
                  role="switch"
                  aria-checked={twoFactor}
                  onClick={() => setTwoFactor((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    twoFactor ? "bg-primary-600" : "bg-[#D1D5DB]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${
                      twoFactor ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setTwoFactor((v) => !v)}
                  className="px-4 py-2 text-sm font-medium text-text border border-[#D1D5DB] rounded-lg hover:bg-[#F5F5FA] transition-colors"
                >
                  {twoFactor ? "Disable 2FA" : "Enable 2FA"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Delete Account ───────────────────────────────────────────── */}
        <section className="bg-error-bg border border-[#F5C6C6] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={18}
                className="text-error mt-0.5 shrink-0"
              />
              <div>
                <h2 className="text-sm font-semibold text-error">
                  Delete Account
                </h2>
                <p className="text-xs text-text-muted mt-1 max-w-sm leading-relaxed">
                  Once you delete your account, there is no going back. All of
                  your conversation history, libraries, and personal data will
                  be permanently erased.
                </p>
                {deleteStep === 1 && (
                  <p className="text-xs font-semibold text-error mt-2">
                    Are you sure? Click again to permanently delete your account.
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleDeleteAccount}
              className={`shrink-0 self-start sm:self-center px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${
                deleteStep === 1
                  ? "bg-[#B91C1C] hover:bg-[#991B1B]"
                  : "bg-error hover:bg-[#C93B3A]"
              }`}
            >
              {deleteStep === 1 ? "Confirm Delete" : "Delete Account"}
            </button>
          </div>
        </section>

      </div>
      </div>
    </div>
  );
}