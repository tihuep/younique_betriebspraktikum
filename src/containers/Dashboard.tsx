import { NavLink } from "react-router-dom";

function Dashboard() {

    return (
    <div>
        <h1>Betriebspraktikum</h1>
        <h2>Younique</h2>
        <NavLink to="/users">Show Users</NavLink>
    </div>);
}

export default Dashboard;