import { setVapidDetails } from "web-push";

export function webPushSetup(): void {
    setVapidDetails(
        "mailto:julienclaudel51@outlook.com",
        process.env.VAPID_PUBLIC_KEY!,
        process.env.VAPID_PRIVATE_KEY!
    );
}
