import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import './App.css'

const Container = styled.div`
  font-family: "Maven Pro", 'Arial', sans-serif;
  background: linear-gradient(135deg, #FFA500, #4169E1, #FFC0CB, #8A2BE2);
  color: white;
  line-height: 1.6;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  padding: 20px 0;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.img`
  width: 120px;
`;

const NavToggle = styled(motion.div)`
  display: none;
  cursor: pointer;
  font-size: 24px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled(motion.nav)`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 1;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  margin-right: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavItem = styled.li`
  margin-left: 20px;

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #FFA500;
  }
`;

const Main = styled.main``;

const Hero = styled.section`
  text-align: center;
  padding: 80px 0;
`;

const HeroTitle = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(18px, 3vw, 24px);
  margin-bottom: 40px;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background-color: #000000;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: bold;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const Features = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 50px 0;
`;

const Feature = styled.div`
  flex: 1 1 300px;
  text-align: center;
  margin: 20px;
  max-width: 300px;
`;

const FeatureIcon = styled.i`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ContactForm = styled.section`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 10px;
  margin: 50px auto;
  width: 90%;
  max-width: 600px;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FFA500;
  }
`;

const Footer = styled.footer`
  background-color: #000000;
  color: white;
  text-align: center;
  padding: 20px 0;
`;

const Bubble = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
`;

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bubbles, setBubbles] = useState<{ id: number; size: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const createBubbles = () => {
      const newBubbles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 50 + 10,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setBubbles(newBubbles);
    };

    createBubbles();
    window.addEventListener('resize', createBubbles);

    return () => {
      window.removeEventListener('resize', createBubbles);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Container>
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <Header>
        <Navbar>
          <Logo src="/logo.png" alt="logo" />
          <NavToggle
            onClick={toggleMenu}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </NavToggle>
          <AnimatePresence>
            {(isMenuOpen || window.innerWidth > 768) && (
              <Nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <NavList>
                  <NavItem>
                    <NavLink to="services" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>
                      Services
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="about" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>
                      About us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="contact" smooth={true} duration={500} onClick={() => setIsMenuOpen(false)}>
                      Contact
                    </NavLink>
                  </NavItem>
                </NavList>
              </Nav>
            )}
          </AnimatePresence>
        </Navbar>
      </Header>

      <Main>
        <Hero>
          <HeroTitle>Tech Made Simple</HeroTitle>
          <HeroSubtitle>Innovative software solutions for your business needs</HeroSubtitle>
          <CTAButton to="contact" smooth={true} duration={500}>
            Get Started
          </CTAButton>
        </Hero>
        <Features id="services">
          <Feature>
            <FeatureIcon className="fas fa-code" >
              <FontAwesomeIcon icon={faCode} />
              </FeatureIcon>
            <h2>Custom Development</h2>
            <p>Tailored software solutions to meet your unique requirements</p>
          </Feature>
          <Feature>
            <FeatureIcon className="fas fa-mobile-alt" >
              <FontAwesomeIcon icon={faMobileAlt} />
            </FeatureIcon>
            <h2>Mobile Apps</h2>
            <p>Cutting-edge mobile applications for iOS and Android</p>
          </Feature>
        </Features>

        <ContactForm id="contact">
          <FormTitle>Contact Us</FormTitle>
          <form>
            <FormGroup>
              <Label htmlFor="name">Company or Individual Name</Label>
              <Input type="text" id="name" name="name" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input type="tel" id="phone" name="phone" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Comments or Message</Label>
              <TextArea id="message" name="message" required />
            </FormGroup>
            <SubmitButton type="submit">Send Message</SubmitButton>
          </form>
        </ContactForm>
      </Main>

      <Footer>
        <p>&copy; 2024 3O Digital. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default App;