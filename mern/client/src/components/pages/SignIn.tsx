import { AuthContext } from "@/contexts/AuthContext";
import { use, useEffect, useState, type FC, type SubmitEventHandler } from "react"
import { useNavigate } from "react-router";

const SignIn: FC = () => {

    const auth = use(AuthContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        const response = await auth.signIn({ email, password });
        if (response.errors) {
            setErrors(response.errors);
        }
    }

    useEffect(() => {
        if (auth.status === "authenticated") {
            navigate("/app");
        }
    }, [auth.status, navigate]);

    return (
        <div>
            <h2>Sign In</h2>
            <br />
            <hr />
            <br />
            <form onSubmit={handleSubmit} className="ps-5">
                <input type="text" name="email" placeholder="Email" className="border p-1"/>
                <br />
                <br />
                <input type="password" name="password" placeholder="Password" className="border p-1"/>
                <br />
                <br />
                <button type="submit">Sign In</button>
                {errors.length > 0 && <div>{errors.join(", ")}</div>}
            </form>
        </div>
    )
};

export default SignIn;
