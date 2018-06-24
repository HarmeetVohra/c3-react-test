import React from 'react';
import PropTypes from 'prop-types';

import 'assets/styles/css/ErrorNotification.css';

/**
 * Error notification to render the error messasges
 */
const ErrorNotification = (props) => {
    return (
        <div className="error-notification">
            <span><img src={ require('assets/images/errorIcon.png') }  alt="Error Notification"/></span>
            <span className="error-message">{ props.message }</span>
        </div>
    );
}

ErrorNotification.propTypes = {
    /**
     * Error message
     */
    message: PropTypes.string.isRequired
};

export default ErrorNotification;