import React, { useState, useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/task/getNotifications");
      if (response.status === 200) {
        setNotifications(response.data);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const clearNotification = async (ingredientName) => {
    try {
      const response = await axios.delete(`http://localhost:5000/task/clearNotification/${ingredientName}`);
      console.log(response)
      if (response.status === 200) {
        setNotifications(notifications.filter(n => n.ingredientName !== ingredientName));
      } else {
        throw new Error('Failed to clear notification');
      }
    } catch (error) {
      console.error('Error clearing notification:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No notifications at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-800">{notification.ingredientName}</p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                </div>
                <button
                  onClick={() => clearNotification(notification.ingredientName)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

