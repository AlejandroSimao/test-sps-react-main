import { useEffect, useState } from 'react';
import api from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import '../css/Users.css';
// Este componente exibe uma lista de usuários e permite ações de gerenciamento de usuários, como adição, edição e exclusão de usuários.
export default function Users() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin');
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    api
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error('Erro ao carregar usuários', err);
      });
  }, [navigate]);

  // Função para lidar com a exclusão de um usuário
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este usuário?')) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Erro ao remover usuário', err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Erro: ${err.response.data.message}`);
      } else {
        alert('Erro ao remover o usuário. Tente novamente.');
      }
    }
  };

  return (
    <div className="users-container">
      <header className="users-header">
        <h2> Usuários </h2>{' '}
        <button className="btn-primary" onClick={() => navigate('/users/new')}>
          Cadastrar Novo Usuário{' '}
        </button>{' '}
      </header>{' '}
      {Array.isArray(users) && users.length > 0 ? (
        <ul className="users-list">
          {' '}
          {users.map((u) => (
            <li key={u.id} className="user-item">
              <div>
                <strong> {u.name} </strong> — {u.email}{' '}
              </div>{' '}
              <div className="user-actions">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(`/users/${u.id}`)}
                >
                  Editar{' '}
                </button>{' '}
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(u.id)}
                >
                  Remover{' '}
                </button>{' '}
              </div>{' '}
            </li>
          ))}{' '}
        </ul>
      ) : (
        <p className="no-users"> Nenhum usuário encontrado. </p>
      )}{' '}
    </div>
  );
}
