import { useState, useEffect } from 'react';
import { updateEmail, updatePassword } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/Profile.css';

const Profile = () => {
    const { user, loading } = useAuth();
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return; // Ne pas faire de redirection tant que le chargement est en cours
        if (!user) {
            navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
        }
    }, [user, loading, navigate]);

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user) {
            setError('Vous devez être connecté pour mettre à jour votre adresse e-mail.');
            return;
        }

        if (!newEmail) {
            setError('Veuillez entrer une nouvelle adresse e-mail.');
            return;
        }

        try {
            await updateEmail(user, newEmail); // Met à jour l'adresse e-mail
            setSuccess('Email mis à jour avec succès !');
        } catch (err) {
            setError('Erreur lors de la mise à jour de l\'email : ' + err.message);
            console.error(err);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user) {
            setError('Vous devez être connecté pour mettre à jour votre mot de passe.');
            return;
        }

        if (!newPassword) {
            setError('Veuillez entrer un nouveau mot de passe.');
            return;
        }

        try {
            await updatePassword(user, newPassword); // Met à jour le mot de passe
            setSuccess('Mot de passe mis à jour avec succès !');
        } catch (err) {
            setError('Erreur lors de la mise à jour du mot de passe : ' + err.message);
            console.error(err);
        }
    };

    return (
        <div className="profile-container">
            <div className="form-container">
                <h2>Modifier le profil</h2>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <form onSubmit={handleUpdateEmail} className="form-group">
                    <label htmlFor="email">Nouvel Email</label>
                    <input
                        type="email"
                        id="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button">Mettre à jour email</button>
                </form>

                <form onSubmit={handleUpdatePassword} className="form-group">
                    <label htmlFor="password">Nouveau Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button">Mettre à jour le mot de passe</button>
                </form>
            </div>
        </div>
    );
};

export default Profile; 