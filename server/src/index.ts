import { AppFactory } from "./app/AppFactory";

const port = 3000;

const app = AppFactory.getInstance();

app.configure();

app.start(port);
