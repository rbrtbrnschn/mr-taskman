import { manager } from "../index";

export default function () {
    console.log(`Logged in as ${manager.client.user.tag}!`);
}
