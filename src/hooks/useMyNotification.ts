import { notification, NotificationArgsProps } from 'antd';
import React from 'react';

type NotificationPlacement = NotificationArgsProps['placement'];
type ShowNotification = (
  m: string,
  d?: string,
  p?: NotificationPlacement
) => void;

export const useMyNotification = (): readonly [
  ShowNotification,
  React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
] => {
  const [api, notificationHolder] = notification.useNotification();

  const showNotification = (
    message: string,
    description: string = '',
    placement: NotificationPlacement = 'topLeft'
  ) => {
    api.info({
      message,
      description,
      placement,
    });
  };

  return [showNotification, notificationHolder];
};
