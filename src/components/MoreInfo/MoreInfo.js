import classNames from "classnames/bind";
import styles from './MoreInfo.module.scss'

const cx = classNames.bind(styles)

function MoreInfo() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                About Newsroom Contact Careers Byte Dance
            </div>
            <div className={cx('content')}>
                TikTok for Good Advertise Developers Transparency TikTok Rewards TikTok Embeds
            </div>
            <div className={cx('content')}>
                Help Safety Terms Privacy Creator Portal Community Guidelines
            </div>
            <div className={cx('content')}>
                © 2023 TikTok
            </div>
        </div>
    )
}

export default MoreInfo