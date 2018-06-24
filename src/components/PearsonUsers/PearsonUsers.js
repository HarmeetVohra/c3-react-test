import React, { Component } from "react";

import http from 'api/http';
import PearsonUser from 'components/PearsonUser/PearsonUser';
import Spinner from 'components/Preloader/Spinner';
import ConfirmationAlert from 'components/Alerts/ConfirmationAlert/ConfirmationAlert';
import ErrorNotification from 'components/Alerts/ErrorNotification/ErrorNotification';
import { USER_API_URL } from 'AppConstants';
import 'assets/styles/css/PearsonUsers.css';


/**
 * Generates the list of users based on user API response
 */
export class PearsonUsers extends Component {

  /**
   * Initializing PearsonUsers component and state
   * 
   * @param {object} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ],
      dataLoaded: false,
      error: false
    };
  } 

  /**
   * Life cycle Hook - componentDidMount
   * Making a call to user API to fetch the list of users
   */
  componentDidMount() {
    /* istanbul ignore next */
    http.get(USER_API_URL, {
      params: {
        page: 1,
        per_page: 10
      }
    })
    .then((response) => {
      const allUsers = [...this.state.users, ...response.data];
      const uniqueUsers = this.filterDuplicate(allUsers, 'id');

      this.setState({ users: uniqueUsers, dataLoaded: true });
    })
    .catch((error) => {
      this.setState({ error: true });
    });
  }

  /**
   * Filtering the duplicate objects in an array(based on given property)
   * 
   * Alternatively Lodash can be used
   */
  filterDuplicate(orgArray, prop) {
    return orgArray.filter((obj, index, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === index;
    });
  }

  /**
   * @confirmDeleteAction
   * show the confirmation alert box before every delete action
   * 
   * @param {string} id
   */
  confirmDeleteAction(id) {
    /* istanbul ignore next */
    ConfirmationAlert("Are you sure, you want to delete this user?", () => this.deleteUser(id));
  }

  /**
   * @deleteUser
   * Deleting the user by id
   * 
   * @param {string} id
   */
  deleteUser(id) {
    const users = [...this.state.users];
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);

    this.setState({ users });
  }

  /**
   * @getPearsonUserList
   * Returns the <PearsonUser /> component list based on the state.user
   */
  getPearsonUserList() {
    return (
      <section className="pearson-user-container">
      {
        this.state.users.map((user) => {
          return (
            <PearsonUser key={user.id} onDelete={ () => this.confirmDeleteAction(user.id) } {...user} />
          );
        })
      }
      </section>
    );
  }

  /**
   * @getErrorNotification
   * Returns the error notification element to render the error message
   * 
   * @param {string} message
   */
  getErrorNotification(message) {
    return (
      <ErrorNotification message={ message } />
    );
  }

  /**
   * @getRenderElement
   * Returns either one from the following components to render
   * Spinner
   * PearsonUser
   * ErrorNotification
   */
  getRenderElement() {
    let element = <Spinner />;

    if(this.state.dataLoaded) {
      element = this.getPearsonUserList();
    }

    if(this.state.error) {
      const ERROR_MSG = 'Something went wrong with the backend service. Please try again after sometime.';
      element = this.getErrorNotification(ERROR_MSG);
    }

    return element;
  }

  /**
   * Life cycle hook to return the element which will be rendered the virtual DOM
   */
  render() {
    return (
      <div className="pearson-users">
        <h1>Pearson User Management</h1>
        { this.getRenderElement() }
      </div>
    );
  }
}
