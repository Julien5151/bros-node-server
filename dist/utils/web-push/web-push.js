"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webPushSetup = void 0;
const web_push_1 = require("web-push");
function webPushSetup() {
    web_push_1.setVapidDetails("mailto:julienclaudel51@outlook.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
}
exports.webPushSetup = webPushSetup;
