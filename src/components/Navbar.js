'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} id="main-navbar">
      <div className={styles.inner}>
        {/* Logo */}
        <a href="/" className={styles.logo} id="navbar-logo">
          <span className={styles.logoIcon}>i</span>
          <span className={styles.logoText}>nternshala</span>
        </a>

        {/* Nav links */}
        <ul className={styles.links}>
          <li><a href="#" className={styles.link}>Internships</a></li>
          <li><a href="#" className={styles.link}>Jobs</a></li>
          <li><a href="#" className={styles.link}>Courses</a></li>
          <li><a href="#" className={styles.link}>Mentor</a></li>
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Dark mode toggle */}
          <button
            id="dark-mode-toggle"
            className={styles.themeBtn}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={mounted && darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            suppressHydrationWarning
          >
            {mounted && darkMode ? '☀️' : '🌙'}
          </button>
          <a href="#" className={styles.btnLogin} id="nav-login-btn">Login</a>
          <a href="#" className={styles.btnRegister} id="nav-register-btn">Register&nbsp;Free</a>
        </div>
      </div>
    </nav>
  );
}
