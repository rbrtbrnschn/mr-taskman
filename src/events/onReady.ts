import { manager } from "../index";

export = function () {
    console.log(`Logged in as ${manager.client.user.tag}!`);
}
