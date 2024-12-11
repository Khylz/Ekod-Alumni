import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase.service'; 
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
    const [offers, setOffers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchOffers();
        fetchUsers();
    }, []);

    const fetchOffers = async () => {
        const offersCollection = collection(db, 'offers'); // Remplacez 'offers' par le nom de votre collection
        const offerSnapshot = await getDocs(offersCollection);
        const fetchedOffers = offerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOffers(fetchedOffers);
    };

    const fetchUsers = async () => {
        const usersCollection = collection(db, 'users'); // Remplacez 'users' par le nom de votre collection
        const userSnapshot = await getDocs(usersCollection);
        const fetchedUsers = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(fetchedUsers);
    };

    return (
        <div>
            <h1>Tableau de Bord</h1>
            <h2>Offres</h2>
            <ul>
                {offers.map(offer => (
                    <li key={offer.id}>
                        <h3>{offer.title}</h3>
                        <p>{offer.description}</p>
                    </li>
                ))}
            </ul>
            <h2>Utilisateurs</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
