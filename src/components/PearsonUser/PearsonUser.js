import React from 'react';
import PropTypes from 'prop-types';

import 'assets/styles/css/PearsonUser.css';

/**
 * User component to show the user information
 */
const PearsonUser = (props) => {
    return (
        <div className="pearson-container">
            <img src={ props.avatar } alt={props.first_name} />
            <div className="pearson-content">
                <p>{ props.first_name } { props.last_name }</p>
                <button onClick={ props.onDelete }>Delete</button>
            </div>
        </div>
    );
}

PearsonUser.propTypes = {
    /**
     * User Avatar image url
     */
    avatar: PropTypes.string.isRequired,

    /**
     * User's first name
     */
    first_name: PropTypes.string.isRequired,

    /**
     * User's last name
     */
    last_name: PropTypes.string.isRequired
};

export default PearsonUser;