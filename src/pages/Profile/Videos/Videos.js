import styles from '../Profile.module.scss'
import classNames from "classnames/bind";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

function Videos() {
    return (
        <div className={cx('video-main')}>
            <div className={cx('video-container')}>
                <FontAwesomeIcon className={cx('profile-icon')} icon={faUser} style={{color: "#5a5a5a",}}/>
                <p className={cx('video-upload')}>Upload your first video</p>
                <p className={cx('video-appear')}>Your videos will appear here</p>
            </div>
        </div>
    )
}

export default Videos