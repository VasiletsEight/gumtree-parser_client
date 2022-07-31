import axios from "axios";
import {ApiResponseData, PostParserSendBody, PostParserSendReplay} from "../../modules/request/request.type";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 50000,
})

const postParserSend = async (body: PostParserSendBody): Promise<ApiResponseData<PostParserSendReplay>> => {
    const response = await axiosInstance.post("/parser", body);

    return response.data;
}

export  {postParserSend}
