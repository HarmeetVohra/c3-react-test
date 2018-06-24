import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import 'assets/styles/css/ConfirmationAlert.css';

/**
 * Confirmation Alert, to get the confirmation from user before any action
 */
const ConfirmationAlert = (message, onConfirmation) => {
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="confirmation-alert">
                    <h1>{ message }</h1>
                    <button onClick={ onClose }>No</button>
                    <button onClick={ () => {
                        onConfirmation()
                        onClose()
                    }}>Yes</button>
                </div>
            )
        }
    });
};

export default ConfirmationAlert;