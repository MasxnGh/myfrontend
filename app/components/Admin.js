'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export default function User() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/signin');
    return;
  }

  async function getUsers() {
    try {
      const res = await fetch(`https://bend-blue.vercel.app/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

if (res.status === 401) {
  localStorage.removeItem('token');
  router.push('/signin');
  return;
}

const data = await res.json();
console.log('users:', data);

if (Array.isArray(data)) {
  setItems(data);
} else {
  setItems([]);
}

setLoading(false);

    } catch (error) {
      console.error('fetch error:', error);
      setLoading(false);
    }
  }

  getUsers();
}, []);


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You will delete this user permanently!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#222',          // dark theme
      color: '#fff',
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#555',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
  `https://bend-blue.vercel.app/api/users/${id}`,
  {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
);
      const result = await res.json();
      Swal.fire({
        title: 'Deleted!',
        text: result.message || 'User deleted',
        icon: 'success',
        background: '#222',
        color: '#fff',
        confirmButtonColor: '#ffc107'
      });
      setItems(items.filter(user => user.id !== id));
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Could not delete user',
        icon: 'error',
        background: '#222',
        color: '#fff',
        confirmButtonColor: '#ffc107'
      });
    }
  };

  if (loading) {
    return (
      <div className='min-vh-100 d-flex justify-content-center align-items-center' style={{ backgroundColor: '#1a1a1a' }}>
        <h3 style={{ color: '#ffc107' }}>Loading Users...</h3>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#1a1a1a', padding: '3rem 1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card shadow-lg rounded-4 border-0 mx-auto"
        style={{ maxWidth: '1200px', backgroundColor: '#222' }}
      >
        <div className="card-header text-center fs-4 fw-bold" style={{ backgroundColor: '#333', color: '#ffc107' }}>
          Users List
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0 align-middle text-center" style={{ color: '#fff' }}>
              <thead style={{ backgroundColor: '#333' }}>
                <tr>
                  <th>#</th>
                  <th>Firstname</th>
                  <th>Fullname</th>
                  <th>Lastname</th>
                  <th>Username</th>
                  <th>Address</th>
                  <th>Birthday</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(items) && items.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderBottom: '1px solid #444' }}
                  >
                    <td>{item.id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.fullname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.username}</td>
                    <td>{item.address}</td>
                    <td>{item.birthday}</td>
                    <td>
                      <Link href={`/admin/users/edit/${item.id}`}>
                        <button className="btn btn-warning btn-sm fw-semibold" style={{ fontWeight: 500 }}>
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm fw-semibold"
                        style={{ fontWeight: 500 }}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
