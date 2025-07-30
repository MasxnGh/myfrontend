"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Select from "react-select";

export default function RegisterForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState(""); // คำนำหน้า
  const [fullname, setFullname] = useState(""); // ชื่อจริง
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState(""); // วันเกิด
  const [address, setAddress] = useState(""); // ที่อยู่

  const router = useRouter();

  const prefixOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];

  const inputVariants = {
    focused: { scale: 1.02, boxShadow: "0 0 8px #ffc107" },
    unfocused: { scale: 1, boxShadow: "none" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      Swal.fire("กรุณายอมรับเงื่อนไขก่อนสมัครสมาชิก");
      return;
    }

    if (!firstname) {
      Swal.fire("กรุณาเลือกคำนำหน้า");
      return;
    }
    if (!fullname.trim()) {
      Swal.fire("กรุณากรอกชื่อจริง");
      return;
    }
    if (!lastname.trim()) {
      Swal.fire("กรุณากรอกนามสกุล");
      return;
    }
    if (!dob) {
      Swal.fire("กรุณาระบุวันเกิด");
      return;
    }
    if (!address.trim()) {
      Swal.fire("กรุณาระบุที่อยู่");
      return;
    }
    if (!username.trim()) {
      Swal.fire("กรุณากรอกชื่อผู้ใช้ (อีเมล)");
      return;
    }
    if (!password.trim()) {
      Swal.fire("กรุณากรอกรหัสผ่าน");
      return;
    }

    try {
      const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstname,
          fullname,
          lastname,
          dob,
          address,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "คุณสามารถเข้าสู่ระบบได้แล้ว",
        });

        // ล้างฟอร์ม
        setUsername("");
        setPassword("");
        setFirstname("");
        setFullname("");
        setLastname("");
        setDob("");
        setAddress("");
        setAcceptTerms(false);

        router.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: data.message || "ไม่สามารถสมัครสมาชิกได้",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาดเครือข่าย",
        text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
      });
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100 py-5"
      style={{
        background: "radial-gradient(circle at top left, #15212b, #0b131a 90%)",
        padding: "3rem",
      }}
    >
      <motion.div
        className="bg-dark rounded-4 shadow-lg p-5"
        style={{ width: "90%", maxWidth: "700px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-center fw-bold mb-5"
          style={{ color: "#ffc107", letterSpacing: 2 }}
        >
          สมัครสมาชิก
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem 1.5rem",
          }}
        >

          <div>
            <label className="form-label fw-semibold text-light">อีเมล / ชื่อผู้ใช้</label>
            <motion.input
              type="email"
              placeholder="กรอกอีเมล / ชื่อผู้ใช้"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
              variants={inputVariants}
              initial="unfocused"
              whileFocus="focused"
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>

          {/* รหัสผ่าน */}
          <div>
            <label className="form-label fw-semibold text-light">รหัสผ่าน</label>
            <motion.input
              type="password"
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
              variants={inputVariants}
              initial="unfocused"
              whileFocus="focused"
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>

          {/* คำนำหน้า */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-light">คำนำหน้า</label>
            <Select
              options={prefixOptions}
              value={prefixOptions.find((opt) => opt.value === firstname) || null}
              onChange={(selected) => setFirstname(selected ? selected.value : "")}
              placeholder="เลือกคำนำหน้า"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "white",
                  borderColor: state.isFocused ? "#ffc107" : "#ced4da",
                  boxShadow: state.isFocused ? "0 0 6px rgba(255, 193, 7, 0.6)" : null,
                  borderRadius: 8,
                  cursor: "pointer",
                  minHeight: "44px",
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: 8,
                  boxShadow: "0 0 10px rgba(255, 193, 7, 0.5)",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "rgba(255, 193, 7, 0.2)" : "white",
                  color: "black",
                  cursor: "pointer",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#6c757d",
                }),
              }}
            />
          </div>

          {/* ชื่อจริง */}
          <div>
            <label className="form-label fw-semibold text-light">ชื่อจริง</label>
            <input
              type="text"
              placeholder="ชื่อจริง"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {/* นามสกุล */}
          <div>
            <label className="form-label fw-semibold text-light">นามสกุล</label>
            <input
              type="text"
              placeholder="นามสกุล"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {/* วันเกิด */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-light">วันเกิด</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {/* ที่อยู่ */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-light">ที่อยู่</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              rows={3}
              placeholder="ระบุที่อยู่ของคุณ"
              required
            />
          </div>
          
          {/* ยอมรับเงื่อนไข */}
          <div style={{ gridColumn: "1 / 3" }} className="form-check mb-4">
            <input
              type="checkbox"
              id="accept"
              className="form-check-input"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              required
            />
            <label
              htmlFor="accept"
              className="form-check-label text-light"
              style={{ cursor: "pointer" }}
            >
              ยอมรับเงื่อนไขการใช้งาน
            </label>
          </div>

          {/* ปุ่มสมัคร */}
          <div style={{ gridColumn: "1 / 3" }}>
            <button
              type="submit"
              disabled={!acceptTerms}
              className={`btn btn-warning w-100 fw-semibold ${
                acceptTerms ? "" : "opacity-50 cursor-not-allowed"
              }`}
            >
              สมัครสมาชิก
            </button>
          </div>

          {/* ปุ่มกลับเข้าสู่ระบบ */}
          <div style={{ gridColumn: "1 / 3" }}>
            <button
              type="button"
              onClick={handleBackToLogin}
              className="btn btn-outline-warning w-100 mt-3"
            >
              กลับเข้าสู่ระบบ
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
