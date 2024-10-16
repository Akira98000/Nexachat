import React, { useEffect, useState } from 'react';
import '../css/styles.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import StarryBackground from './StarryBackground';

// IMPORT ICONS 
import googleIcon from '../img/google-icon.png'; 
import globe3D from '../img/globe3D.png';
import profile1 from '../img/profile1.png';
import profile2 from '../img/profile2.png';
import profile3 from '../img/profile3.png';
import appleIcon from '../img/apple-icon.png';
import MicrosoftIcon from '../img/microsoft-icon.png';
import LockSignUp from '../img/lock-signup.png';


// IMPORT FIREBASE OR REACT MODULES 
import { sendPasswordResetEmail, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; 
import { auth } from './firebase-config'; 
import { useNavigate } from 'react-router-dom'; 
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Globe from 'react-globe.gl';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [arcsData, setArcsData] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const generateRandomArcs = () => {
            const arcs = [];
            for (let i = 0; i < 35; i++) { 
                const startLat = Math.random() * 180 - 90;  
                const startLng = Math.random() * 360 - 180; 
                const endLat = Math.random() * 180 - 90;   
                const endLng = Math.random() * 360 - 180;   
                
                arcs.push({
                    startLat, 
                    startLng,
                    endLat,
                    endLng,
                    color: ['#bfbfbf', '#bfbfbf'], 
                });
            }
            setArcsData(arcs);
        };

        generateRandomArcs();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    navigate('/dashboard');
                } else {
                    setErrorMessage('Please verify your email before accessing the dashboard.');
                }
            }
        });
    
        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Google login successful:", user);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error("Google login error:", error);
                setErrorMessage('Failed to login with Google. Please try again.');
            });
    };

    const handleAppleLogin = () => {
        alert("Tant que nous n'avions pas de domaines statiques, l'utilisation du OAUTH2 de Apple ne sera pas disponible. Merci pour votre compréhension.");
    };
    
    const handleMicrosoftLogin = () => {
        alert("Tant que nous n'avions pas de domaines statiques, l'utilisation du OAUTH2 de Microsoft ne sera pas disponible. Merci pour votre compréhension.");
    };
    
    

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (email === '' || password === '') {
            setErrorMessage('Email or password cannot be empty.');
            return;
        }
    
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
    
                if (user.emailVerified) {
                    // If the email is verified, navigate to the dashboard
                    console.log("User logged in and email is verified: ", user);
                    navigate('/dashboard');
                } else {
                    // If the email is not verified, send verification email
                    sendEmailVerification(user)
                        .then(() => {
                            setErrorMessage('Please verify your email. A verification email has been sent.');
                        })
                        .catch((error) => {
                            console.error("Error sending verification email: ", error);
                            setErrorMessage('Error sending verification email. Please try again later.');
                        });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Login error: ", errorCode, errorMessage);
                setErrorMessage('Failed to login. Please check your email and password.');
            });
    };

    const handlePasswordReset = () => {
        if (email === '') {
            setErrorMessage('Please enter your email to reset your password.');
            return;
        }
    
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMessage('Password reset email sent. Check your inbox.');
            })
            .catch((error) => {
                console.error("Error sending password reset email: ", error);
                setErrorMessage('Failed to send password reset email. Please try again.');
            });
    };  
    
    // Auto-rotate the globe
    const globeRef = React.useRef();

    useEffect(() => {
        const globe = globeRef.current;
        globe.controls().enableZoom = false; 
        globe.controls().enablePan = false;
        if (!globe) return;

        const distance = 375;
        globe.camera().position.z = distance;
    
        // Animate the globe rotation
        const animate = () => {
            const currentView = globe.pointOfView();  // Get current point of view
            globe.pointOfView({ lat: currentView.lat, lng: currentView.lng + 0.1 });  // Increment longitude for rotation
            requestAnimationFrame(animate);
        };
        animate();
    }, []);
    
    
    return (
        <div>
            <StarryBackground />
            <header>
                <div className="logo">
                    <h1>NexaChat</h1>
                    <p>BETA Version 0.1</p>
                </div>
                <div className="language-selector">
                    <p>Language : English</p>
                </div>
            </header>

            <div className="container">
                <div className="left-section">
                    <h2>Welcome Back !</h2>
                    {errorMessage && (
                        <p className="error-message">
                            <FontAwesomeIcon icon={faExclamationTriangle} /> {errorMessage}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="forgot-and-login">
                            <a href="#" className="forgot-password" onClick={handlePasswordReset}>Forgot your password?</a>
                            <button type="submit" className="login-button">Log In</button>
                        </div>
                    </form>
                    <div className="divider">
                        <hr /><span>Or continue with</span><hr />
                    </div>
                    <div className="button-group">
                        <button className="apple-button" onClick={handleGoogleLogin}>
                            <img src={googleIcon} alt="Google Icon" />
                        </button>
                        <button className="apple-button" onClick={handleAppleLogin}>
                            <img src={appleIcon} alt="Apple Icon" />
                        </button>
                        <button className="apple-button" onClick={handleMicrosoftLogin}>
                            <img src={MicrosoftIcon} alt="Microsoft Icon" />
                        </button>
                        <button className="sign-up-button" onClick={handleGoogleLogin}>
                            <img src={LockSignUp} alt="Login Icon" />
                        </button>
                    </div>
                </div>
                <div className="right-section">
                    <div className="globe-wrapper">
                        <div className="globe-container">
                            <Globe 
                                ref={globeRef} 
                                // globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
                                backgroundColor="rgba(0,0,0,0)"
                                rendererOptions={{ alpha: true }}
                                arcsData={arcsData}
                                arcColor={'color'}
                                arcDashLength={0.6}
                                arcDashGap={0.1}
                                arcDashAnimateTime={1000}
                                enableZoom={false}
                                enablePan={false}
                                arcAltitudeAutoScale={0.5}
                                style={{ width: '100%', height: '100%' }}
                                controls={(controls) => {
                                    controls.enableZoom = false;  // Disable zoom
                                    controls.enablePan = false;   // Disable pan
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>&copy; 2024 SAS Nexachat. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Login;
