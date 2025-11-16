interface Notification {
  href: string;
  title: string;
  message: string;
  timestamp: number;
  type: NotiifcationType;
}

type NotiifcationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
