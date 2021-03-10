import * as React from 'react';
import { shallow } from 'enzyme';

import { Main } from 'Views/Main/Main';

describe('Main', () => {
  it('Should render div with text', () => {
    const component = shallow(<Main />);
    const wrapper = component.find('div');

    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Welcome to React Boilerlate!');
  });
});
