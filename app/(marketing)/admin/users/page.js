'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <br /><br /><br /><br />
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="card shadow-sm border-0">
          <div className="card-header bg-warning text-white fw-bold fs-5">
            รายชื่อสมาชิก (Users List)
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center" style={{ width: '4%' }}>#</th>
                    <th style={{ width: '10%' }}>คำนำหน้า</th>
                    <th style={{ width: '15%' }}>ชื่อ</th>
                    <th style={{ width: '15%' }}>นามสกุล</th>
                    <th style={{ width: '20%' }}>อีเมล</th>
                    <th style={{ width: '15%' }}>รหัสผ่าน</th>
                    <th style={{ width: '20%' }}>ที่อยู่</th>
                    <th style={{ width: '10%' }}>วันเกิด</th>
                    <th style={{ width: '8%' }}>แก้ไข</th>
                    <th style={{ width: '8%' }}>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center">{item.id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.fullname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td>{item.address}</td>
                        <td>{item.dob}</td>
                        <td>
                          <Link href={`/admin/users/edit/${item.id}`} className="btn btn-sm btn-warning fw-semibold">
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-danger fw-semibold" type="button">
                            Del
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center text-muted py-4">
                        กำลังโหลดข้อมูล...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}
