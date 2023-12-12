import React from 'react';


import '../../styles/Header.css'; //Importing CSS


const Header = () => {
    return (
        <header id="main-header" className="header">
            <h1 className='header-title'>Personal Budget</h1>
            <h2 className='header-subtitle'>A personal-budget management app</h2>
            {/* Other header content */}
        </header>
    );
};

export default Header;
