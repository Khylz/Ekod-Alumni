import admin from 'firebase-admin';
import express from 'express';

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

router.get('/users', async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    res.status(200).json(listUsersResult.users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).send("Erreur lors de la récupération des utilisateurs.");
  }
});

export default router;