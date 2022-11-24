"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Danger Rules for Loop node projects
 */
function loop() {
    // Replace this with the code from your Dangerfile
    const title = danger.github.pr.title;
    message(`PR Title: ${title}`);
}
exports.default = loop;
