export interface IUserState{
    name: string;
    email: string
}

export interface IInitialState {
    user: IUserState | null
    isLoading: boolean
    isOpenLoginPopup: boolean
    isOpenRegisterPopup: boolean
}

export interface IEmailPassword {
    name?: string
    email: string
    password: string
}