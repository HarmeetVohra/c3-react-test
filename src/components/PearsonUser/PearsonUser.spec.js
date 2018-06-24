import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import PearsonUser from 'components/PearsonUser/PearsonUser';

describe('PearsonUser', () => {
    let user;
    let component;

    beforeEach(() => {
        user = {
            id: 4,
            first_name: "Eve",
            last_name: "Holt",
            avatar: "assets/testImage.jpg"
        }
        
        component = shallow(<PearsonUser {...user} />);
    });

    afterEach(() => {
        user = null;
        component = null;
    });

    it('should render img with the src attribute as user.avatar', () => {
        expect(component.find('img').prop('src')).toEqual(user.avatar);
    });

    it('should render first name and last name from user.first_name and user.last_name', () => {
        const fullName = `${user.first_name} ${user.last_name}`;
        expect(component.find('p').text()).toEqual(fullName);
    });

    it('should execute the function passed in props.onDelete, when delete button is clicked', () => {
        const mockFn = jest.fn();
        component.setProps({ onDelete: mockFn });
        component.find('button').simulate('click');

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});