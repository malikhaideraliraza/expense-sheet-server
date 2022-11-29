import 'dotenv/config';
import { initServer } from "./bootstrap/server";
import { connectToDB } from "./bootstrap/db";

const run = async () => {
    const db = await connectToDB();
    initServer(db);
}

run();
