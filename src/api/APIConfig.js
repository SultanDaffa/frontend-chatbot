import axios from "axios";

const APIConfig= axios.create({
    // Uncomment this while deploy
    baseURL: "http://192.168.0.201:5001/",
});

export default APIConfig;