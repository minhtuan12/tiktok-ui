import {
    COMMENT,
    COMMENTED,
    EDIT_PROFILE,
    FOLLOWED, FOLLOWED_ACCOUNTS, HIDE_EDIT_PROFILE,
    HIDE_MODAL,
    HIDE_SIGNUP_MODAL,
    LIKED,
    LOG_IN,
    LOG_OUT, SHOW_EDIT_PROFILE,
    SHOW_MODAL,
    SHOW_SIGNUP_MODAL, SIGNED_UP, UNFOLLOWED, UNFOLLOWED_ACCOUNTS
} from "~/store/constants";

const user = JSON.parse(localStorage.getItem("currentUser"))
const currentUser = user ? user : null
const initState = {
    showModal: false,
    showSignupModal: false,
    login: !!currentUser,
    liked: false,
    followed: false,
    followed_accounts: false,
    show_edit_profile: false,
    showPreviewAvatar: false,
    profile_edited: false,
    isCommented: false,
    signedUp: false,
    // dataEdit: {
    //     name: '',
    //     phone: user.phone,
    //     bio: '',
    // }
}

function reducer(state, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true,
            }
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false,
            }
        case LOG_IN:
            return {
                ...state,
                login: true,
            }
        case LOG_OUT:
            return {
                ...state,
                login: false,
            }
        case SHOW_SIGNUP_MODAL:
            return {
                ...state,
                showSignupModal: true,
            }
        case HIDE_SIGNUP_MODAL:
            return {
                ...state,
                showSignupModal: false,
            }
        case LIKED:
            return {
                ...state,
                liked: true,
            }
        case FOLLOWED:
            return {
                ...state,
                followed: true,
            }
        case UNFOLLOWED:
            return {
                ...state,
                followed: false,
            }
        case FOLLOWED_ACCOUNTS:
            return {
                ...state,
                followed_accounts: true,
            }
        case UNFOLLOWED_ACCOUNTS:
            return {
                ...state,
                followed_accounts: false,
            }
        case SHOW_EDIT_PROFILE:
            return {
                ...state,
                show_edit_profile: true,
            }
        case HIDE_EDIT_PROFILE:
            return {
                ...state,
                show_edit_profile: false,
            }
        case EDIT_PROFILE:
            return {
                ...state,
                profile_edited: true,
            }
        case COMMENT:
            return {
                ...state,
                isCommented: false,
            }
        case COMMENTED:
            return {
                ...state,
                isCommented: true,
            }
        case SIGNED_UP:
            return {
                ...state,
                signedUp: true,
            }
        default:
    }
}

export {initState, currentUser}
export default reducer