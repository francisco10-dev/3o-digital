import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import './home.css';

const Home: React.FC = () => {
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
    <div className="container">
      {bubbles.map((bubble) => (
        <motion.div
          className="bubble"
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

      <header>
        <div className="navbar">
          <img src="/logo.png" alt="logo" className="logo" />
          <motion.div
            className="nav-toggle"
            onClick={toggleMenu}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </motion.div>
          <AnimatePresence>
            {(isMenuOpen || window.innerWidth > 768) && (
              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <ul className="nav-list">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="services"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="about"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="contact"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1 className="hero-title">Tech Made Simple</h1>
          <p className="hero-subtitle">Innovative software solutions for your business needs</p>
          <Link className="cta-button" to="contact" smooth={true} duration={500}>
            Get Started
          </Link>
        </section>

        <section className="features" id="services">
          <div className="feature">
            <i className="feature-icon fas fa-code">
              <FontAwesomeIcon icon={faCode} />
            </i>
            <h2>Custom Development</h2>
            <p>Tailored software solutions to meet your unique requirements</p>
          </div>
          <div className="feature">
            <i className="feature-icon fas fa-mobile-alt">
              <FontAwesomeIcon icon={faMobileAlt} />
            </i>
            <h2>Mobile Apps</h2>
            <p>Cutting-edge mobile applications for iOS and Android</p>
          </div>
        </section>

        <section className="contact-form" id="contact">
          <h2 className="form-title">Contact Us</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Company or Individual Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Comments or Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button className="submit-button" type="submit">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 3O Digital. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
