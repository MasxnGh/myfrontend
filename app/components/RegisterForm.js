"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("โปรดยอมรับเงื่อนไขการใช้งานก่อนสมัครสมาชิก");
      return;
    }
    alert("✅ สมัครสมาชิกเรียบร้อย!");
    router.push("/login"); // ไปหน้า login หลังสมัคร
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="container px-3 py-5">
      <motion.div
        className="row justify-content-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="col-lg-8">
          <div className="bg-white border rounded-4 shadow-sm p-5">
            <h2 className="text-center text-success mb-5 fw-bold">สมัครสมาชิก</h2>

            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">ชื่อผู้ใช้</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label className="form-label fw-semibold">รหัสผ่าน</label>
                  <input type="password" className="form-control" required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">คำนำหน้าชื่อ</label>
                <select className="form-select" required defaultValue="">
                  <option value="" disabled>เลือกคำนำหน้า</option>
                  <option>นาย</option>
                  <option>นาง</option>
                  <option>นางสาว</option>
                </select>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">ชื่อ</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label className="form-label fw-semibold">นามสกุล</label>
                  <input type="text" className="form-control" required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">ที่อยู่</label>
                <textarea className="form-control" rows={3} required></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold me-3">เพศ</label>
                <div className="form-check form-check-inline">
                  <input type="radio" name="gender" className="form-check-input" id="male" required />
                  <label className="form-check-label" htmlFor="male">ชาย</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" name="gender" className="form-check-input" id="female" required />
                  <label className="form-check-label" htmlFor="female">หญิง</label>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">วันเกิด</label>
                <input type="date" className="form-control" required />
              </div>

              <div className="form-check mb-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="accept"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  required
                />
                <label className="form-check-label" htmlFor="accept">
                  ยอมรับเงื่อนไขการใช้งาน
                </label>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                <motion.button
                  type="submit"
                  className="btn btn-success w-100 fw-semibold py-2 rounded-3"
                  whileTap={{ scale: 0.97 }}
                  disabled={!acceptTerms}
                >
                  สมัครสมาชิก
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleBackToLogin}
                  className="btn btn-outline-primary w-100 fw-semibold py-2 rounded-3"
                  whileTap={{ scale: 0.97 }}
                >
                  กลับเข้าสู่ระบบ
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
