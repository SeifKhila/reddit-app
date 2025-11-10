import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
       <p>© {new Date().getFullYear()} Reddit Client — built by Seif Khila</p>
    </footer>
  );
}

// Inline styles for the Footer component

const styles = {
  footer: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    textAlign: 'center',
    padding: '1rem',
    fontSize: '0.9rem',
  },
};

export default Footer;