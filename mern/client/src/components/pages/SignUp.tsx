import { AuthContext } from "@/contexts/AuthContext";
import { use, useEffect, useState, type FC, type SubmitEventHandler } from "react"
import { useNavigate } from "react-router";

const SignUp: FC = () => {

    const auth = use(AuthContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const name = form.name.valueOf();
        const password = form.password.value;
        const response = await auth.signUp({ email, name, password });
        if (response.errors) {
            setErrors(response.errors);
        }
    }

    useEffect(() => {
        if (auth.status === "authenticated") {
            navigate("/");
        }
    }, [auth.status, navigate]);

    return (
        <div>
            <h1>Sign Up</h1>
            <br />
            <hr />
            <br />
            <form onSubmit={handleSubmit} className="ps-4">
                <input type="email" name="email" placeholder="Email" required className="border p-1"/>
                <br />
                <br />
                <input type="text" name="name" placeholder="Name" required className="border p-1"/>
                <br />
                <br />
                <input type="password" name="password" placeholder="Password" required className="border p-1"/>
                <br />
                <br />
                <button type="submit">Sign Up</button>
                {errors.length > 0 && <div>{errors.map((error, index) => <div key={index}>{error}</div>)}</div>}
            </form>
        </div>
    );
}

export default SignUp
