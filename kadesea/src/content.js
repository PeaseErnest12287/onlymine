import React, { useEffect } from 'react';
import gsap from 'gsap';
import "./content.css";
import First from "./lap 1.jpeg";
import Second from "./lap 2.jpeg";
import Three from "./lap 3.jpeg";
import Four from "./lap 4.jpeg";

const Content = () => {
    useEffect(() => {
        // Ensure images start off-screen or at a starting position
        gsap.set('.item', { autoAlpha: 0, y: '100%', x: '100%' }); // Start items off-screen

        // Define the GSAP timeline
        const tl = gsap.timeline();

        // Animate items
        tl.to('.item', {
            autoAlpha: 1,
            y: '0%', // Move to final vertical position
            x: '0%', // Move to final horizontal position
            duration: 1,
            ease: "bounce.out",
            stagger: {
                amount: 1,
                start: 1
            },
            onComplete: () => {
                gsap.set('.item', { autoAlpha: 1 });
            }
        })
        .to('.item:nth-child(4)', {
            x: '0%', // Ensure final position is aligned with the grid
            duration: 1,
            ease: 'power1.inOut'
        })
        .to('.item:nth-child(3)', {
            x: '0%',
            duration: 1,
            ease: 'power1.inOut'
        }, '-=0.5')
        .to('.item:nth-child(2)', {
            x: '0%',
            duration: 1,
            ease: 'power1.inOut'
        }, '-=0.5')
        .to('.item:nth-child(1)', {
            x: '0%',
            duration: 1,
            ease: 'power1.inOut'
        }, '-=0.5');
        
        // Play the animation once when the component mounts
        tl.play();

        // Prevent animation from repeating
        return () => tl.kill(); // Clean up animation
    }, []); // Empty dependency array to ensure this runs once on mount

    return (
        <div className='all'>
            <div className="container">
                <div className="item one">
                    <img src={First} alt="Description"/>
                    <div className="text-overlay">We are the best</div>
                </div>
                <div className="item two">
                    <img src={Second} alt="Description"/>
                    <div className="text-overlay">High end machines</div>
                </div>
                <div className="item three">
                    <img src={Three} alt="Description"/>
                    <div className="text-overlay">Best teachers</div>
                </div>
                <div className="item four">
                    <img src={Four} alt="Description"/>
                    <div className="text-overlay">Best Equipment</div>
                </div>
            </div>
        </div>
    );
};

export default Content;
