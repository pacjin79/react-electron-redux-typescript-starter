import {createAction} from 'redux-actions';
import NotificationSystem = require("react-notification-system");
import Notification = NotificationSystem.Notification;


export const PAGE_ACTIONS_CONST = {
    ADD_NOTIFICATION: "ADD_NOTIFICATION"
};

const addNotificationAction = createAction<any>(PAGE_ACTIONS_CONST.ADD_NOTIFICATION,
    (notification: Notification): Notification => {
       return notification;
    });

export const pageActions =  {
    addNotificationAction
};