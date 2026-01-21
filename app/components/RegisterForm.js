'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function RegisterForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [fullname, setFullname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  const prefixOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];

  const inputVariants = {
    focused: { scale: 1.02, boxShadow: "0 0 8px #FFC107" },
    unfocused: { scale: 1, boxShadow: "none" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) return Swal.fire("กรุณายอมรับเงื่อนไขก่อนสมัครสมาชิก");
    if (!firstname) return Swal.fire("กรุณาเลือกคำนำหน้า");
    if (!fullname.trim()) return Swal.fire("กรุณากรอกชื่อจริง");
    if (!lastname.trim()) return Swal.fire("กรุณากรอกนามสกุล");
    if (!dob) return Swal.fire("กรุณาระบุวันเกิด");
    if (!address.trim()) return Swal.fire("กรุณาระบุที่อยู่");
    if (!username.trim()) return Swal.fire("กรุณากรอกชื่อผู้ใช้หรืออีเมล");
    if (!password.trim()) return Swal.fire("กรุณากรอกรหัสผ่าน");

    let dobISO = dob;
    try { dobISO = new Date(dob).toISOString(); } catch (error) {}

    try {
      const res = await fetch("https://bend-blue.vercel.app/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ firstname, fullname, lastname, dob: dobISO, address, username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "คุณสามารถเข้าสู่ระบบได้แล้ว",
          background: "#1a1a1a",
          color: "#FFC107",
          confirmButtonColor: "#FFC107",
        });

        setUsername(""); setPassword(""); setFirstname("");
        setFullname(""); setLastname(""); setDob("");
        setAddress(""); setAcceptTerms(false);

        router.push("/signin");
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: data.message || "ไม่สามารถสมัครสมาชิกได้",
          background: "#1a1a1a",
          color: "#FFC107",
          confirmButtonColor: "#FFC107",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาดเครือข่าย",
        text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        background: "#1a1a1a",
        color: "#FFC107",
        confirmButtonColor: "#FFC107",
      });
      console.error("Network error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#1a1a1a", padding: "2rem" }}>
      <motion.div
        className="bg-dark text-white rounded-4 shadow-lg p-5"
        style={{ width: "90%", maxWidth: "700px", backgroundColor: "#222" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center fw-bold mb-5" style={{ color: "#FFC107", letterSpacing: 2 }}>
          สมัครสมาชิก
        </h2>

        <form style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem 1.5rem" }} onSubmit={handleSubmit}>
          {/* ชื่อผู้ใช้ */}
          <motion.div variants={inputVariants} initial="unfocused" whileFocus="focused">
            <label className="form-label fw-semibold text-warning">ชื่อผู้ใช้ / อีเมล</label>
            <input type="text" placeholder="กรอกชื่อผู้ใช้หรืออีเมล" value={username}
              onChange={e => setUsername(e.target.value)}
              className="form-control bg-dark text-white border-1 border-secondary rounded-3"
              style={{ borderColor: "#555" }}
            />
          </motion.div>

          {/* รหัสผ่าน */}
          <motion.div variants={inputVariants} initial="unfocused" whileFocus="focused">
            <label className="form-label fw-semibold text-warning">รหัสผ่าน</label>
            <input type="password" placeholder="กรอกรหัสผ่าน" value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-control bg-dark text-white border-1 border-secondary rounded-3"
              style={{ borderColor: "#555" }}
            />
          </motion.div>

          {/* คำนำหน้า */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-warning">คำนำหน้า</label>
            <Select
              options={prefixOptions}
              value={prefixOptions.find(opt => opt.value === firstname) || null}
              onChange={selected => setFirstname(selected ? selected.value : "")}
              placeholder="เลือกคำนำหน้า"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#222",
                  borderColor: state.isFocused ? "#FFC107" : "#555",
                  boxShadow: state.isFocused ? "0 0 6px rgba(255,193,7,0.6)" : "none",
                  borderRadius: 8,
                  minHeight: 44,
                  color: "#fff",
                }),
                menu: base => ({ ...base, backgroundColor: "#222", borderRadius: 8 }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#FFC107" : "#222",
                  color: state.isFocused ? "#1a1a1a" : "#fff",
                  cursor: "pointer",
                }),
                placeholder: base => ({ ...base, color: "#ccc" }),
              }}
            />
          </div>

          {/* ชื่อจริง */}
          <div>
            <label className="form-label fw-semibold text-warning">ชื่อจริง</label>
            <input type="text" value={fullname} onChange={e => setFullname(e.target.value)}
              className="form-control bg-dark text-white border-1 border-secondary rounded-3"
            />
          </div>

          {/* นามสกุล */}
          <div>
            <label className="form-label fw-semibold text-warning">นามสกุล</label>
            <input type="text" value={lastname} onChange={e => setLastname(e.target.value)}
              className="form-control bg-dark text-white border-1 border-secondary rounded-3"
            />
          </div>

          {/* วันเกิด */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-warning">วันเกิด</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)}
              className="form-control bg-dark text-white border-1 border-secondary rounded-3"
            />
          </div>

          {/* ที่อยู่ */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-warning">ที่อยู่</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3}
              className="form-control bg-dark text-white border-1 border-secondary rounded-3"
            />
          </div>

          {/* ยอมรับเงื่อนไข */}
          <div style={{ gridColumn: "1 / 3" }} className="form-check mb-4">
            <input type="checkbox" id="accept" className="form-check-input" checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)} />
            <label htmlFor="accept" className="form-check-label text-warning" style={{ cursor: "pointer" }}>
              ยอมรับเงื่อนไขการใช้งาน
            </label>
          </div>

          {/* ปุ่มสมัคร */}
          <div style={{ gridColumn: "1 / 3" }}>
            <button type="submit" disabled={!acceptTerms}
              className={`btn w-100 fw-bold ${acceptTerms ? "" : "opacity-50 cursor-not-allowed"}`}
              style={{ backgroundColor: "#FFC107", color: "#1a1a1a" }}
            >
              สมัครสมาชิก
            </button>
          </div>

          {/* ปุ่มกลับเข้าสู่ระบบ */}
          <div style={{ gridColumn: "1 / 3" }}>
            <button type="button" onClick={() => router.push("/signin")}
              className="btn w-100 mt-3 fw-bold btn-outline-warning"
            >
              กลับเข้าสู่ระบบ
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
