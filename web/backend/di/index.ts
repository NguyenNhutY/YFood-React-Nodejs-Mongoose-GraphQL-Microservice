import "reflect-metadata"; // Cần thiết cho tsyringe
import { container } from "tsyringe";
// import { WebPageService } from "../services/WebPageService";
// import { ContentService } from "../services/ContentService";
// import { NotificationService } from "../services/NotificationService";

// Đăng ký các service với container
container.register("WebPageService", {
  useClass: WebPageService,
});

container.register("ContentService", {
  useClass: ContentService,
});

container.register("NotificationService", {
  useClass: NotificationService,
});

export { container };
