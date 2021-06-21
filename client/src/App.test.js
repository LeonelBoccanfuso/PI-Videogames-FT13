import { render, screen } from '@testing-library/react'
import App from './App';
import LandingPage from "./components/LandingPage/landing";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('loads home button',() => {
    const component = render(<LandingPage/>)
  
    let linkElement = component.getByText('Go To Games!!');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'http://localhost:3000/games')
  })

test('have an image',() => {
    const component = render(<LandingPage/>)
  
    let linkElement = component.querySelector("img");
    expect(linkElement).toBeInTheDocument();
  })


