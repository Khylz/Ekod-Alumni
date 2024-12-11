import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.service'; 
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/offerList.css'; // Assurez-vous d'importer le CSS
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material'; // Ajout des imports MUI

const OfferList = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const navigate = useNavigate();
  const bull = (
    <span style={{ fontSize: '0.8rem' }}>•</span>
  );

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersCollection = collection(db, 'offer');
        const offerSnapshot = await getDocs(offersCollection);
        const offerList = offerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOffers(offerList);
      } catch (error) {
        console.error("Erreur lors de la récupération des offres:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <Box className="offer-list-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
      <h2>Liste des Offres</h2>
      <button onClick={() => navigate('/createJobOffer')} className="back-button">Créer une nouvelle offre</button>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {offers.length === 0 ? (
          <Typography>Aucune offre disponible.</Typography>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="offer-item" style={{ margin: '10px', width: '250px' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    EKOD - ALUMNI
                  </Typography>
                  <Typography variant="h5" component="div">
                    {offer.society}
                  </Typography>
                  <Typography variant="body2">
                    <br />
                    {offer.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </ul>
    </Box>
  );
};

export default OfferList;