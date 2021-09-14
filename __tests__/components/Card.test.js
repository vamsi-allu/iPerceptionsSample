import 'jsdom-global/register';
import React from 'react';
import Card from '../../components/Card';
import Enzyme, {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Card Component', () => {
  it('renders correctly enzyme', () => {
    const props = {style: {}};
    const wrapper = shallow(<Card {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('check the view is loaded', () => {
    const props = {style: {}};
    const component = shallow(<Card {...props} />);

    expect(component.find('View').getElements()).toBeDefined();
  });
});
