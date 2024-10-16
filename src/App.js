import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div 
            onMouseMove={handleMouseMove} 
            style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
        >
            <Router>
                {/* Curseur personnalisé */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        borderColor: '',
                        backgroundColor: 'transparent',  
                        borderColor: 'white',            
                        borderWidth: '2px',             
                        borderStyle: 'solid', 
                        pointerEvents: 'none',
                        transform: 'translate(-50%, -50%)',  
                    }}
                    animate={{
                        x: cursorPosition.x,
                        y: cursorPosition.y,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                    }}
                />
                {/* Routes pour la navigation */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
