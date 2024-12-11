import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Assurez-vous que Bootstrap JS est importé

const Header = ({ isLoggedIn, onLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">EKOD - ALUMNI</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="d-flex  w-100">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Connexion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/offerList">Liste des Offres</Link>
                            </li>
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/createJobOffer">Créer une Offre</Link>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/userlist">Anciens Membres</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="text-end d-flex">
                    {isLoggedIn && (
                        <Link className="nav-link profile" to="/profile">Profil</Link>
                    )}
                    {isLoggedIn && (
                        <button onClick={onLogout} className="btn btn-link nav-link">Déconnexion</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header; 