export interface iReturnType {
    type: string;
    payload: unknown;
}

export interface iDispatchActionType {
    type: string;
    payload: any;
}

export interface iPostType {
    id: string;
    title?: string;
    img?: string;
    subtitle?: string;
    content?: string;
    date: Date;
    author: string;
    comments: iPostCommentType[];
}

export interface iPostCommentType {
    id: string;
    username: string;
    data_created: Date;
    content: string;
}

export interface iInitialState {
    isLoading: boolean;
    isError: string | boolean;
    allPosts: iPostType[];
    currentPost: iPostType | null;
}

export interface iGlobalReducer {
    globalState: iInitialState;
    globalDispatch: React.Dispatch<iDispatchActionType>;
}
