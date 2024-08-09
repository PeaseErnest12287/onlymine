
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css'; 
import NavBar from "./NavBar.js"
import Content from "./content.js"
import Footer from "./Footer.js"
import Sighnup from "./Sighnup.js"
import Login from "./Login.js"


function App() {
  const [details, setdetails] = useState(null)
  const [auth, setAuth] = useState(null);

  const displayLog = () => {
    setAuth(<Login />);
  };

  const display = () => {
    setAuth(<Sighnup />);
  };

  const team = [
    {name: 'Amani', qualification: 'BSC Physics', message: 'I highly recommend this guys, they made my work so simple'},
    {name: 'ANTONY', qualification: 'BSC Physics', message: 'I  recommend this guys, they made my work so simple'},
    {name: 'Cleophas', qualification: 'BSC Physics', message: 'I highly recommend this guys, they made my work so simple'},
    {name: 'Lawrence', qualification: 'BSC Physics', message: 'I highly recommend this guys, they made my work so simple'},
    {name: 'Alrahman', qualification: 'BSC Physics', message: 'I highly recommend this guys, they made my work so simple'},
    {name: 'Sudi', qualification: 'BSC Physics', message: 'I highly recommend this guys, they made my work so simple'},
  ];

  const TeamMember = ({ member }) => {
    const nameRef = useRef(null);
    const qualificationRef = useRef(null);
    const messageRef = useRef(null);

    useEffect(() => {
      
      gsap.fromTo(nameRef.current.children, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
      });

      
      gsap.fromTo(qualificationRef.current, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
      });

      // Animate message with flip effect
      gsap.fromTo(messageRef.current, {
        rotationY: 0,
      }, {
        rotationY: 180,
        duration: 2,
        delay: 1,
        ease: "power2.inOut",
        onComplete: () => {
          messageRef.current.classList.add('flipped');
        },
      });
    }, [member]);

    return (
      <div className="team-member">
        <div className="name" ref={nameRef}>
          {member.name.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
        <div className="qualification" ref={qualificationRef}>
          {member.qualification}
        </div>
        <div className="message-box">
          <div className="message-content" ref={messageRef}>
            <div className="message-front">
              <p>{member.message}</p>
            </div>
            <div className="message-back">
              <p>{member.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <NavBar fun={displayLog} mine={display} setd = {setdetails} />
      {auth}
      {team.map((member, index) => (
        <div key={index} id={index}>
          <TeamMember member={member} />
        </div>
      ))}
      {details}
      <Content />
      <Footer />
    </div>
  );
}

export default App;
