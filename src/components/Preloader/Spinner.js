import React from 'react';

import 'assets/styles/css/Spinner.css';

/**
 * Spinner to show the loading in progress
 */
const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="loader"></div>
        </div>
    );
}

export default Spinner;