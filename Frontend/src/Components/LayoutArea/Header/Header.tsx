import Logo from "../Logo/Logo";
import "./Header.css";
import {Typography} from '@material-ui/core'

function Header(): JSX.Element {
    return (
        <div className="Header">
			<Logo/>
            <Typography variant="h3">Gift Shop</Typography>
        </div>
    );
}

export default Header;
