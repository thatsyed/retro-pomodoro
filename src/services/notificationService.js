class NotificationService {
  constructor() {
    this.hasPermission = typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  }

  async requestPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return false;
    try {
      const permission = await Notification.requestPermission();
      this.hasPermission = permission === 'granted';
      return this.hasPermission;
    } catch (e) {
      console.warn('Notification permission request error:', e);
      return false;
    }
  }

  send(title, body) {
    if (!this.hasPermission && typeof window !== 'undefined' && 'Notification' in window) {
      this.hasPermission = Notification.permission === 'granted';
    }
    if (this.hasPermission) {
      try {
        new Notification(title, {
          body,
          icon: '/icons/favicon.svg',
          silent: false,
        });
      } catch (e) {
        console.warn('Failed to send notification:', e);
      }
    }
  }
}

export const notificationService = new NotificationService();
