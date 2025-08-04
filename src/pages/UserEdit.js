import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/UserService';
import '../css/UserForm.css';

// Este componente permite a edição de um usuário existente ou o registro de um novo usuário.
export default function UserEdit() {
  const { userId } = useParams();
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (userId && userId !== 'new') {
      api.get(`/users/${userId}`).then((res) => {
        setNome(res.data.name);
        setEmail(res.data.email);
        setType(res.data.type);
      });
    }
  }, [userId]);
  // Função para lidar com o envio do formulário de edição ou registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, type, password };

    await api.put(`/users/${userId}`, userData);

    navigate('/users');
  };

  return (
    <div className="userform-container">
      <h2> Editar Usuário </h2>{' '}
      <form onSubmit={handleSubmit} className="userform-form">
        <label>
          Nome{' '}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Nome completo"
          />
        </label>{' '}
        <label>
          Email{' '}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="exemplo@dominio.com"
          />
        </label>{' '}
        <label>
          Tipo{' '}
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value=""> Selecione um tipo </option>{' '}
            <option value="admin"> Administrador </option>{' '}
            <option value="user"> Usuário </option>{' '}
          </select>{' '}
        </label>{' '}
        <label>
          Senha <small> (Deixe vazio para manter atual) </small>{' '}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha (opcional)"
          />
        </label>{' '}
        <div className="userform-buttons">
          <button type="submit" className="btn-primary">
            {' '}
            Salvar Alterações{' '}
          </button>{' '}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/users')}
          >
            Cancelar{' '}
          </button>{' '}
        </div>{' '}
      </form>{' '}
    </div>
  );
}
