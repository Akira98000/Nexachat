import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from './firebase-config'; 
import { onAuthStateChanged, signOut } from "firebase/auth"; 

function Dashboard() {
    const [userDetails, setUserDetails] = useState(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserDetails({
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                });
            } else {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    return (
        <div>
            {userDetails ? (
                <div>
                    <h1>Welcome, {userDetails.email}</h1>
                    <p>Your UID: {userDetails.uid}</p>
                    <p>Email Verified: {userDetails.emailVerified ? 'Yes' : 'No'}</p>
                    {userDetails.displayName && <p>Display Name: {userDetails.displayName}</p>}
                    {userDetails.photoURL && <img src={userDetails.photoURL} alt="User profile" />}
                    {
                        // BOUTON DE DECONNEXION
                    }
                    <button onClick={handleLogout} className="logout-button">
                        Log Out
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;
