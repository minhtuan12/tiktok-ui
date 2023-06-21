import {
    SHOW_MODAL,
    HIDE_MODAL,
    LOG_IN,
    LOG_OUT,
    SHOW_SIGNUP_MODAL,
    HIDE_SIGNUP_MODAL,
    LIKED,
    FOLLOWED,
    FOLLOWED_ACCOUNTS,
    UNFOLLOWED_ACCOUNTS,
    UNFOLLOWED,
    SHOW_EDIT_PROFILE,
    HIDE_EDIT_PROFILE,
    SHOW_PREVIEW_AVATAR, HIDE_PREVIEW_AVATAR, EDIT_PROFILE, COMMENTED, COMMENT, SIGNED_UP
} from "~/store/constants";

export const show_modal = payload => ({
    type: SHOW_MODAL,
    payload,
})

export const showSignupModal = payload => ({
    type: SHOW_SIGNUP_MODAL,
    payload,
})

export const hideSignupModal = payload => ({
    type: HIDE_SIGNUP_MODAL,
    payload,
})

export const hideModal = payload => ({
    type: HIDE_MODAL,
    payload,
})

export const login = payload => ({
    type: LOG_IN,
    payload,
})

export const logout = payload => ({
    type: LOG_OUT,
    payload,
})

export const liked = payload => ({
    type: LIKED,
    payload,
})

export const followed = payload => ({
    type: FOLLOWED,
    payload,
})

export const unfollowed = payload => ({
    type: UNFOLLOWED,
    payload,
})

export const followed_accounts = payload => ({
    type: FOLLOWED_ACCOUNTS,
    payload,
})
export const unfollowed_accounts = payload => ({
    type: UNFOLLOWED_ACCOUNTS,
    payload,
})
export const show_edit_profile = payload => ({
    type: SHOW_EDIT_PROFILE,
    payload,
})
export const hide_edit_profile = payload => ({
    type: HIDE_EDIT_PROFILE,
    payload,
})
export const show_preview_avatar = payload => ({
    type: SHOW_PREVIEW_AVATAR,
    payload,
})
export const hide_preview_avatar = payload => ({
    type: HIDE_PREVIEW_AVATAR,
    payload,
})
export const edited_profile = payload => ({
    type: EDIT_PROFILE,
    payload,
})
export const commented = payload => ({
    type: COMMENTED,
    payload,
})
export const comment = payload => ({
    type: COMMENT,
    payload,
})
export const signedUp = payload => ({
    type: SIGNED_UP,
    payload,
})