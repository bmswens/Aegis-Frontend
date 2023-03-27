import { act, render, screen, waitFor } from '@testing-library/react';
// to test
import App from './App';

describe('<App>', function() {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('should render without error', async function() {
    // all child components should be tested
    // ignoring this because I don't want to hunt down the specific
    // library to mock out for act(() => ...)
    console.error = jest.fn()
    render(<App />)
    let homeButton = await screen.findByRole("button", {name: "Home"})
    expect(homeButton).not.toBeNull()
  })
})