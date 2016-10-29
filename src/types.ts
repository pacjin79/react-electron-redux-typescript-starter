import NotificationSystem = require("react-notification-system");
import Notification = NotificationSystem.Notification;
import * as React from 'react';

interface IPageProperties {
    notifications: Array<Notification>;
}
export interface IAppState {
    currentPage: IPageProperties;
}