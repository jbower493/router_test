import { Link } from "@tanstack/react-router";

export function Nav() {
    return (
        <nav>
            <div>
                <Link to="/">Dashboard</Link>
            </div>
            <div>
                <Link to="/account">Account</Link>
            </div>
            <div>
                <Link to="/wallet">Wallet</Link>
            </div>
            <div>
                <Link to="/hosting/account/overview">Hosting</Link>
            </div>
        </nav>
    );
}
