import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Este componente permite o login de um usuário existente.
export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/users');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="p-4 border rounded shadow-sm"
        style={{ maxWidth: '400px', width: '100%' }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-3 text-center"> Bem - vindo👋 </h2>{' '}
        <p className="text-center mb-4"> Faça login para continuar </p>{' '}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E - mail{' '}
          </label>{' '}
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>{' '}
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Senha{' '}
          </label>{' '}
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>{' '}
        <button type="submit" className="btn btn-primary w-100">
          Entrar{' '}
        </button>{' '}
      </form>{' '}
    </div>
  );
}
