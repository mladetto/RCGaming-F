import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import "./UserList.css";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_API;

  const fetchUsers = async () => {
    Swal.fire({
      title: "Cargando Usuarios!",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await axios.get(`${API}/users/getUsers`); 
      setUsers(response.data);
      Swal.close();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  useEffect(() => {

    fetchUsers();
  }, []);
  
  const toggleUserStatus = async(userId) => {
    try {
      await axios.put(`${API}/users/activate/${userId}`);
       
      fetchUsers();
     
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  
  
  const deleteUser = async (userId) => {
    Swal.fire({
      title: "Estas seguro de eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "NO, volver atrás",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API}/users/delete/${userId}`); 
          const filteredUsers = users.filter(user => user._id !== userId);
          setUsers(filteredUsers);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    });
  };

  return (
    <div className="user-list-container container">
      <h2>Listado de Usuarios</h2>
      <div className="table-container table-responsive">
        <table className='table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isActive ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button className="action-button btn btn-success" onClick={() => toggleUserStatus(user._id)}>
                    {user.isActive ? 'Deshabilitar' : 'Habilitar'}
                  </button>
                  <button className="action-button btn btn-danger" onClick={() => deleteUser(user._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

  



