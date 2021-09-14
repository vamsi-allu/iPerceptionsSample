import 'jsdom-global/register';
import React from 'react';
import Header from '../../components/Header';
import Enzyme, {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('Header Component', () => {
  it('renders correctly enzyme', () => {
    const props = {title: 'sampleTitle'};
    const wrapper = shallow(<Header {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('check the title is loaded properly', () => {
    const props = {title: 'sampleTitle'};
    const component = shallow(<Header {...props} />);

    expect(component.find('Text')).toHaveLength(1);
  });
});
