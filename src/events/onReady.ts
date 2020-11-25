import { client } from "../index";

export default function () {
    console.log(`Logged in as ${client.user.tag}!`);
}
