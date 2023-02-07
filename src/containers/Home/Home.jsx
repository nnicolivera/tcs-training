import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>This is the home page</h1>
            <hr />
            <Link to="login">Please, enter your credentials</Link>

        </div>
    );
}

export default Home;