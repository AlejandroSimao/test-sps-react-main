import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4"> Editar Usuário </h2>{' '}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome{' '}
          </label>{' '}
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Nome completo"
          />
        </div>{' '}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email{' '}
          </label>{' '}
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="exemplo@dominio.com"
          />
        </div>{' '}
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Tipo{' '}
          </label>{' '}
          <select
            id="type"
            name="type"
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value=""> Selecione um tipo </option>{' '}
            <option value="admin"> Administrador </option>{' '}
            <option value="user"> Usuário </option>{' '}
          </select>{' '}
        </div>{' '}
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Senha{' '}
            <small className="text-muted">
              {' '}
              (Deixe vazio para manter atual){' '}
            </small>{' '}
          </label>{' '}
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha (opcional)"
          />
        </div>{' '}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Salvar Alterações{' '}
          </button>{' '}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/users')}
          >
            Cancelar{' '}
          </button>{' '}
        </div>{' '}
      </form>{' '}
    </div>
  );
}
