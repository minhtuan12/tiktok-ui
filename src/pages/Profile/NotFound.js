import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)
function NotFound() {
    return (
        <div className={cx('video-main')}>
            <div className={cx('video-container')}>
                <FontAwesomeIcon className={cx('profile-icon')} icon={faUser} style={{color: "#5a5a5a",}}/>
                <p className={cx('video-upload')}>Couldn't find this account</p>
                <p className={cx('video-appear')}>Looking for videos? Try browsing our trending creators, hashtags, and sounds.</p>
            </div>
        </div>
    )
}

export default NotFound