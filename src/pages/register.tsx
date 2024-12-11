import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.service';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/register.css'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Inscription réussie !');
      navigate('/login'); // Redirige vers la page de connexion après l'inscription
    } catch (err) {
      setError('Erreur lors de l\'inscription : ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className='h2regilogin'>Inscription</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">S'inscrire</button>
        </form>

        <div className="">
          <p className="redirect">
            Déjà un compte ?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">Connectez-vous</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;