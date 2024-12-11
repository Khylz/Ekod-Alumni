import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.service'; 
import { useAuth } from '../contexts/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/createJobOffer.css';

const CreateJobOffer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [society, setSociety] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!society.trim() || !description.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'offer'), {
        society,
        description,
        createdAt: new Date(),
      });

      setSociety('');
      setDescription('');
      setSuccess(true);
      console.log('Offre créée avec l\'ID: ', docRef.id);
    } catch (err) {
      console.error('Erreur lors de la création de l\'offre:', err);
      setError('Impossible de créer l\'offre. Réessayez.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Créer une offre d'emploi</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">Offre créée avec succès !</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="society">Nom de l'entreprise</label>
            <input
              type="text"
              id="society"
              value={society}
              onChange={(e) => setSociety(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description de l'offre</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="textarea"
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Créer l'offre</button>
        </form>
        <button onClick={() => navigate('/offerList')} className="view-offers-button">Voir toutes les offres</button>
      </div>
    </div>
  );
};

export default CreateJobOffer; 