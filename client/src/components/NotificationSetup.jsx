import { useEffect } from "react";

const NotificationSetup = () => {
  useEffect(() => {
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/service-worker.js").then(async (reg) => {
        console.log("✅ Service Worker registered");

        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        await fetch(`${import.meta.env.VITE_API_URL}/api/v1/notifications/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subscription),
        });
        console.log("📩 User subscribed to notifications!");
      });
    }
  }, []);

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return null;
};

export default NotificationSetup;
