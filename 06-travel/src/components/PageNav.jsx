import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import styles from './PageNav.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function PageNav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles['nav']}>
      <Logo />
      <ul>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/login' className={styles.ctaLink}>
            {isAuthenticated ? 'App' : 'Login'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
