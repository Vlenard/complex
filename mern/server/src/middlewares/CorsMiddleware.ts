import cors from "cors";
import Env from "../core/Env.ts";

const corsMiddleware = () => {
    const nodeEnv = Env().NODE_ENV || "development";

    return cors(nodeEnv === "development" ?
        {
            origin: `http://localhost:${process.env.FRONTEND_PORT}`, // frontend
            methods: ["GET", "POST", "PUT", "DELETE"],
        }
        :
        {
            origin: false
        }
    );
};

export default corsMiddleware;
