import React from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <h2>Home</h2>
        <ul>
          <li><Link to="/jobs">to Jobs</Link></li>
          <li><Link to="/projects">to Projects</Link></li>
          <li><Link to="/github">to Github</Link></li>
        </ul>
      </div>
    </div>
  );
}
