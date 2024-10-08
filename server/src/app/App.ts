import express, { Express, Router } from "express";
import { AppRouter } from "../routes";
import cors from "cors";
import bodyParser from "body-parser";

export class App {
  public app: Express;
  private router: AppRouter;

  constructor(app: Express, router: AppRouter) {
    this.app = app;
    this.router = router;
  }

  configure() {
    this.setupCors();
    this.setupParser();
    this.setupRoutes(this.router.routes());
  }

  private setupRoutes(router: Router) {
    this.app.use(router);
  }

  private setupParser() {
    this.app.use(express.json());
    this.app.use(bodyParser.text());
  }

  private setupCors() {
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
  }

  public start(port: any): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
