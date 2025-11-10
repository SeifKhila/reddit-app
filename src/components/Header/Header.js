import React from "react";

// Header component that displays the title of the application

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Reddit Client</h1>
    </header>
  );
}

// Inline styles for the Header component

const styles = {
  header: {
    backgroundColor: "#ff4500", 
    color : "white",
    padding: '1rem',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
  },
};

export default Header;