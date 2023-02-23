import { render } from '@testing-library/react';
// to test
import App from './App';

describe('<App>', function() {
  it('should render without error', function() {
    // all child components should be tested
    render(<App />)
  })
})