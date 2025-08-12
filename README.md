# 🧑‍💻 User Management Frontend

Este é o frontend de uma aplicação de gerenciamento de usuários desenvolvido em **React**, com autenticação via token JWT, rotas protegidas e uso de bootstrap.

## 📂 Estrutura de Rotas

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:userId',
    element: (
      <ProtectedRoute>
        <UserEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/new',
    element: (
      <ProtectedRoute>
        <UserRegister />
      </ProtectedRoute>
    ),
  },
]);
```

## 🔐 Rotas Protegidas

A rota `/users`, `/users/:userId` e `/users/new` são acessadas somente após o login, utilizando o componente `<ProtectedRoute />`.

## 📌 Funcionalidades

- **/signin**: Tela de login (autenticação)
- **/users**: Lista todos os usuários cadastrados (privada)
- **/users/new**: Cadastro de novo usuário (privada)
- **/users/:userId**: Edição de usuário por ID (privada)

## 📦 Instalação

```bash
npm install
```

## ▶️ Execução

```bash
npm run dev
```

## 🔑 Autenticação

Após login bem-sucedido, o token JWT é salvo no `localStorage` e utilizado nos headers de todas as requisições autenticadas:

```js
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```
