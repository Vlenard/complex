import { type FC } from "react";
import { NavLink } from "react-router";
import img from "@/assets/landing.png"

const Landing: FC = () => {

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col justify-center items-center flex-1">
                <div>
                    <h1 className="text-8xl gradiant-text uppercase italic pe-8 -translate-x-4">Rbeer</h1>
                    <p className="mt-5">Rate your beers</p>
                    <div className="flex space-x-2 mt-5">
                        <NavLink to="/sign-in" className="px-4 py-2 bg-amber-400 text-white rounded-2xl">Sign In</NavLink>
                        <NavLink to="/sign-up" className="px-4 py-2 bg-amber-400 text-white rounded-2xl">Sign Up</NavLink>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center flex-1">
                <img src={img} alt="Landing image" className="rounded-lg"/>
            </div>
        </div>
    );
};

export default Landing;
