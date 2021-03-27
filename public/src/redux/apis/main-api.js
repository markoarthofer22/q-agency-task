import axios from "axios";
import {homeUrl} from '../globals/globals.endpoints';

const TestAPI = homeUrl + "wp-json/wp/ea/";

export default axios.create({
    baseURL: TestAPI,
});
