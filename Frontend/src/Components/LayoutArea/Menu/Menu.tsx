 import "./Menu.css";
import { NavLink } from 'react-router-dom'

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            {/* <span> | </span> */}
            <NavLink to="/gift-list">Gifts</NavLink>
            {/* <span> | </span> */}
            <NavLink to="/add-gift">New</NavLink>
		
        </div>
    );
}

export default Menu;
