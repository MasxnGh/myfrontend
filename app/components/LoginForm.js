"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // ใช้ redirect ปุ่มสมัครสมาชิก

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
    router.push("/register"); // ไปหน้าสมัครสมาชิก
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f2f6f9 0%, #ffffff 100%)",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-5 shadow-lg"
        style={{ width: "400px", maxWidth: "90%" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-center text-primary fw-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🔐 เข้าสู่ระบบ
        </motion.h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            อีเมล
          </label>
          <input
            type="email"
            className="form-control rounded-4 shadow-sm"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            รหัสผ่าน
          </label>
          <input
            type="password"
            className="form-control rounded-4 shadow-sm"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            จดจำการเข้าระบบตลอดเวลา
          </label>
        </div>

        <motion.button
          type="submit"
          className="btn btn-primary w-100 py-2 rounded-4 fw-semibold shadow-sm mb-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          เข้าสู่ระบบ
        </motion.button>

        <div className="d-flex gap-2">
          <motion.button
            type="button"
            onClick={handleRegisterClick}
            className="btn btn-outline-primary flex-fill rounded-4 fw-semibold small"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            สมัครสมาชิก
          </motion.button>

          <motion.button
            type="button"
            className="btn btn-outline-secondary flex-fill rounded-4 fw-semibold small"
            disabled
            whileHover={{ scale: 1.01 }}
          >
            ลืมรหัสผ่าน?
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
