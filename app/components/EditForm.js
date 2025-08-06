"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import Select from "react-select";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams(); // ดึง param จาก URL
  const { id } = params;

  const prefixOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];

  const [userData, setUserData] = useState({
    firstname: "",
    fullname: "",
    lastname: "",
    dob: "",
    address: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (!id) return; // รอ id มาก่อน

    async function fetchUser() {
      try {
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        const user = Array.isArray(data) ? data[0] : data;

        setUserData({
          firstname: user.firstname || "",
          fullname: user.fullname || "",
          lastname: user.lastname || "",
          dob: user.dob || "",
          address: user.address || "",
          username: user.username || "",
          password: user.password || "",
        });
      } catch (error) {
        Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลได้", "error");
      }
    }

    fetchUser();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.firstname ||
      !userData.fullname.trim() ||
      !userData.lastname.trim() ||
      !userData.dob ||
      !userData.address.trim() ||
      !userData.username.trim() ||
      !userData.password.trim()
    ) {
      Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id, ...userData }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire("สำเร็จ", "อัปเดตข้อมูลแล้ว", "success");
        router.push("/"); // เปลี่ยนเป็น path ที่ต้องการ
      } else {
        Swal.fire("ผิดพลาด", result.message || "ไม่สามารถอัปเดตได้", "error");
      }
    } catch (error) {
      Swal.fire("เครือข่ายผิดพลาด", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์", "error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100 py-5"
      style={{ background: "#0b131a", padding: "3rem" }}
    >
      <div className="bg-dark rounded-4 shadow-lg p-5" style={{ width: "90%", maxWidth: "700px" }}>
        <h2
          className="text-center fw-bold mb-5"
          style={{ color: "#ffc107", letterSpacing: 2 }}
        >
          แก้ไขข้อมูลผู้ใช้
        </h2>

        <form
          onSubmit={handleUpdateSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem 1.5rem",
          }}
        >
          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-light">คำนำหน้า</label>
            <Select
              instanceId="prefix-select" // เพิ่มตรงนี้แก้ hydration mismatch
              options={prefixOptions}
              value={prefixOptions.find((opt) => opt.value === userData.firstname) || null}
              onChange={(selected) =>
                setUserData((prev) => ({
                  ...prev,
                  firstname: selected ? selected.value : "",
                }))
              }
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

          <div>
            <label className="form-label fw-semibold text-light">ชื่อจริง</label>
            <input
              type="text"
              className="form-control"
              value={userData.fullname}
              onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label fw-semibold text-light">นามสกุล</label>
            <input
              type="text"
              className="form-control"
              value={userData.lastname}
              onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-light">วันเกิด</label>
            <input
              type="date"
              className="form-control"
              value={userData.dob}
              onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <label className="form-label fw-semibold text-light">ที่อยู่</label>
            <textarea
              className="form-control"
              rows={3}
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label fw-semibold text-light">อีเมล / ชื่อผู้ใช้</label>
            <input
              type="email"
              className="form-control"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label fw-semibold text-light">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <button type="submit" className="btn btn-warning w-100 fw-semibold">
              อัปเดตข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
