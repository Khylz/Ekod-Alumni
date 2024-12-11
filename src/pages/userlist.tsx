import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserList = () => {
  const { users } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Remplacez par votre URL d'API
        console.log('Response:', response); // Log de la réponse
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const data = await response.json();
        console.log('Data:', data); // Log des données récupérées
        // Si vous devez mettre à jour les utilisateurs dans le contexte, faites-le ici
      } catch (err) {
        console.error('Fetch error:', err); // Log de l'erreur
        setError('Erreur lors de la récupération des utilisateurs');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      {error && <p className="error">{error}</p>} {/* Affichage de l'erreur si elle existe */}
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.uid}>
              {user.email}
            </li>
          ))
        ) : (
          <li>Aucun utilisateur trouvé.</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
