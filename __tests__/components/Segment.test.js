import 'jsdom-global/register';
import React from 'react';
import Segment from '../../components/Segment';
import Enzyme, {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

let props = {
  data: {
    item: {
      firstName: 'test',
      lasrtName: 'test',
    },
  },
};
describe('Segment Component', () => {
  it('renders correctly enzyme', () => {
    const wrapper = shallow(<Segment {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('check the segment is loaded properly', () => {
    const component = shallow(<Segment {...props} />);

    expect(component.find('Text')).toHaveLength(1);
  });
});
