import express, { Express } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares";

dotenv.config();

//if there is no port in the environment, exit the process
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/v1", routes);

//handle not found routes
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
