import NotificationSystem = require("react-notification-system");
import Notification = NotificationSystem.Notification;

interface IPageProperties {
    notifications: Array<Notification>;
}
export interface IAppState {
    currentPage: IPageProperties;
}