import {NavLink} from "react-router";
const TopNavi = () => {
    return (
        <nav>
            <NavLink to="/use-reducre">useReducer</NavLink>&nbsp;
            <NavLink to="/use-context">useContext</NavLink>&nbsp;
        </nav>
    )
}

export default TopNavi