import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import { PearsonUsers } from "./PearsonUsers";
import PearsonUser from 'components/PearsonUser/PearsonUser';
import ErrorNotification from 'components/Alerts/ErrorNotification/ErrorNotification';
import MockPearsonUsers from 'mockdata/PearsonUsers.json';

describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    component = shallow(<PearsonUsers />);
    component.setState({
      dataLoaded: false,
      error: false
    });
  });

  afterEach(() => {
    component = null;
  });

  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it('should render PearsonUser component based on state', () => {
    component.setState({ dataLoaded: true });
    const usersCount = component.state().users.length;

    expect(component.find(PearsonUser)).toHaveLength(usersCount);
  });

  it('should remove the duplicate users, when executing filterDuplicate()', () => {
    const allUsers = [...component.state().users, ...MockPearsonUsers];
    const filteredUsers = component.instance().filterDuplicate(allUsers, 'id');

    const arrUserIds = filteredUsers.map((user) => user.id);
    const isDuplicate = arrUserIds.some((id, index) => arrUserIds.indexOf(id) != index);

    expect(filteredUsers.length).toBe(10);
    expect(isDuplicate).toBeFalsy();
  });

  it('should delete user by id, when executing deleteUser()', () => {
    component.setState({ users: [...MockPearsonUsers] });
    const userId = component.state().users[0].id;
    component.instance().deleteUser(userId);

    const isUserExist = component.state().users.some((user) => user.id === userId);
    expect(isUserExist).toBeFalsy();
  });

  it('should return PearsonUser component list when data is loaded', () => {
    const spy = jest.spyOn(component.instance(), 'getPearsonUserList');
    component.setState({ dataLoaded: true });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.find(PearsonUser).exists()).toBeTruthy();
  });

  it('should return ErrorNotification component when data is not loaded', () => {
    const spy = jest.spyOn(component.instance(), 'getErrorNotification');
    component.setState({ error: true });
    
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.find(ErrorNotification).exists()).toBeTruthy();
  });
});
