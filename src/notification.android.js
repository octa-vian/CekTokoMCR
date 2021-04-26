import PushNotification from 'react-native-push-notification';


const showNotification = (title, message) => {
    PushNotification.localNotification({
        title: title,
        message:message
    })

    console.log('notif: ' + title);
}

const showNotificationIsVifeMinute = (title, message) => {
    PushNotification.localNotificationSchedule({
        title: title,
        message:message,
        date: new Date(Date.now() + 5 * 100 ) 
    })
}

const handleCancel = (title, message) => {
    PushNotification.cancelAllLocalNotifications();
}

export {showNotification, showNotificationIsVifeMinute, handleCancel};