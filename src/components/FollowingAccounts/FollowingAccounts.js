import classNames from "classnames/bind";
import styles from './FollowingAccounts.module.scss'
import PropTypes from "prop-types";
import AccountItem from "./AccountItem";
import {useState} from "react";
import {useStore} from "~/store";

const cx = classNames.bind(styles)

function FollowingAccounts({label}) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const currentUserId = currentUser ? currentUser[0].id : ''

    // Follow
    const following = JSON.parse(localStorage.getItem("following"))
    const currentUserFollowing = following ? following[currentUserId] : []

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {currentUser && currentUserFollowing && currentUserFollowing.length > 0 ? (
                <>
                    <AccountItem/>
                    <p className={cx('more-content')}>See all</p>
                </>
            ) : (
                <p className={cx('no_followed')}>Accounts you follow will appear here</p>
            )}
        </div>
    )
}

FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
}
export default FollowingAccounts
