import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.service';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/login.css'; // Assurez-vous que le fichier CSS est bien importé

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Connexion réussie !');
      onLogin(); // Appelle la fonction pour mettre à jour l'état de connexion
      navigate('/CreateJobOffer'); // Redirection vers CreateJobOffer
    } catch (err) {
      setError('Erreur lors de la connexion : ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className='h2regilogin'>Connexion</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleLogin}>
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
          <button type="submit">Se connecter</button>
        </form>
        <p className="redirect">
          Pas de compte ? <a href="/register">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Login;