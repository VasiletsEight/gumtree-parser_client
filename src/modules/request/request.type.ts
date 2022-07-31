export interface PostParserSendBody {
    path: string;
}

export interface ApiResponseData<T> {
    data: T
}

export interface PostParserSendReplay {
    users: UserData[]
}

export interface UserData {
    name: string;
    phone: string;
}
