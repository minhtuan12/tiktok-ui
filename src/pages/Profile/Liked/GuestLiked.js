import {data} from "~/data/Data";
import classNames from "classnames/bind";
import styles from '../Profile.module.scss'
import {useState} from "react";
import {useStore} from "~/store";
import {faLock, faPlay, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

function GuestLiked({user}) {
    return (
        <div className={cx('video-main')}>
            <div className={cx('video-container')}>
                <FontAwesomeIcon className={cx('profile-icon')} icon={faLock} style={{color: "#5a5a5a",}} />
                <p className={cx('video-upload')}>This user's liked videos are private</p>
                <p className={cx('video-appear')}>Videos liked by {user.username} are currently hidden</p>
            </div>
        </div>
    )
}

export default GuestLiked