import React, { useEffect, useRef } from 'react';

function StarryBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let stars = [];
        const numStars = 200;
        const starColors = ['#ffffff', '#ffe9c4', '#d4fbff'];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < numStars; i++) {
            const star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                color: starColors[Math.floor(Math.random() * starColors.length)],
                speed: Math.random() * 0.5 + 0.5,
            };
            stars.push(star);
        }

        // Update and draw stars
        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
                ctx.fillStyle = star.color;
                ctx.fill();
            });
        };

        const updateStars = () => {
            stars.forEach((star) => {
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });
        };

        const animate = () => {
            updateStars();
            drawStars();
            requestAnimationFrame(animate);
        };

        animate();

        // Update canvas size on resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="starry-background"></canvas>;
}

export default StarryBackground;
