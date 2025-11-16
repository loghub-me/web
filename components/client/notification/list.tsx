interface NotificationListProps {
  children?: React.ReactNode;
}

export default function NotificationList({ children }: Readonly<NotificationListProps>) {
  return <div className="bg-card border rounded-xl shadow-xs overflow-hidden">{children}</div>;
}
