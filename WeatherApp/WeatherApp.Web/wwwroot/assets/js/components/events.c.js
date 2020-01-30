import request from "./request.c.js";

const submitLocation = async () => {
    await request.postLocation();
}

export default {
    submitLocation
}