"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserPlus, KeyRound } from "lucide-react"; // ไอคอน

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password, rememberMe });
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(145deg, #1f1f1f, #2b2b2b)",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-dark text-white p-5 rounded-4 shadow-lg"
        style={{ width: "400px", maxWidth: "90%" }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-center text-light fw-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🔐 เข้าสู่ระบบ
        </motion.h2>

        {/* Email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control bg-secondary text-white border-0 shadow-sm rounded-3"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="อีเมล"
          />
          <label htmlFor="email" className="text-white-50">
            อีเมล
          </label>
        </div>

        {/* Password */}
        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control bg-secondary text-white border-0 shadow-sm rounded-3"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="รหัสผ่าน"
          />
          <label htmlFor="password" className="text-white-50">
            รหัสผ่าน
          </label>
        </div>

        {/* Remember Me */}
        <div className="form-check d-flex align-items-center justify-content-center gap-2 mb-4">
          <input
            className="form-check-input bg-dark border-light"
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="form-check-label text-white" htmlFor="rememberMe">
            จดจำการเข้าระบบ
          </label>
        </div>

        {/* ปุ่มเข้าสู่ระบบ */}
        <motion.button
          type="submit"
          className="w-100 py-2 rounded-4 fw-semibold shadow-sm mb-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: "linear-gradient(135deg, #FFD700, #FFB800)",
            color: "#1f1f1f",
            border: "none",
            fontWeight: "600",
          }}
        >
          เข้าสู่ระบบ
        </motion.button>

        {/* Bottom Buttons */}
        <div className="d-flex gap-2">
          <motion.button
            type="button"
            onClick={handleRegisterClick}
            className="btn btn-outline-warning flex-fill rounded-4 fw-semibold d-flex align-items-center justify-content-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <UserPlus size={18} />
            สมัครสมาชิก
          </motion.button>

          <motion.button
            type="button"
            className="btn btn-outline-light flex-fill rounded-4 fw-semibold d-flex align-items-center justify-content-center gap-2"
            whileHover={{ scale: 1.01 }}
            disabled
          >
            <KeyRound size={16} />
            ลืมรหัสผ่าน?
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
