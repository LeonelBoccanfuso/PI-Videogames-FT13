import './Nav.css';
import { Link } from "react-router-dom";



export default function NavBar() {
    return (
      <header className="navbar">
        <div >
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className="logoapp">
             <img src="http://pimormarket.com/wp-content/uploads/2020/11/juegosmin.png" width="50px" height="50px" alt=""/>
             <h2 id="letrasdellogo">HenryGames</h2>
            </div>
         </Link>
        </div>
        <div>
            <Link to="/add" style={{ color: 'inherit', textDecoration: 'inherit'}}>Add ➕</Link>
        </div>
      </header>
    );
  }
