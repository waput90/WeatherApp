import request from "./request.c.js";

const submitLocation = async (e) => {
    e.preventDefault();
    await request.postLocation();
}

export default {
    submitLocation
}