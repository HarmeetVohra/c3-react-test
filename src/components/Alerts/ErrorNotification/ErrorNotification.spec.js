import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import ErrorNotification from 'components/Alerts/ErrorNotification/ErrorNotification';

describe('ErrorNotification', () => {
    let component;
    let message;

    beforeEach(() => {
        message = "Error Message";
        component = shallow(<ErrorNotification message={ message } />);
    });

    afterEach(() => {
        component = null;
    });

    it('should render the message', () => {
        expect(component.find('.error-message').text()).toEqual(message);
    });
});