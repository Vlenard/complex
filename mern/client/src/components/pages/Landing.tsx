import { type FC } from "react";
import { NavLink } from "react-router";

const Landing: FC = () => {

    return (
        <div>
            <h1>Landing Page</h1>
            <NavLink to="/sign-in">Sign In</NavLink>
            <br />
            <NavLink to="/sign-up">Sign Up</NavLink>
        </div>
    );
};

export default Landing;
