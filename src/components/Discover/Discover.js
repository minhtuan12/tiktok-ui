import AccountItem from "~/components/FollowingAccounts/AccountItem";
import classNames from "classnames/bind";
import styles from './Discover.module.scss'
import Button from "~/components/Button";
import {faHashtag, faMusic} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

const dicovers = [
    {
        icon: <FontAwesomeIcon icon={faMusic} style={{color: "#ffffff",}}/>,
        title: 'suthatla',
    },
    {
        icon: <FontAwesomeIcon icon={faHashtag} style={{color: "#ffffff",}}/>,
        title: 'mackedoi',
    },
    {
        icon: <FontAwesomeIcon icon={faMusic} style={{color: "#ffffff",}}/>,
        title: 'Yên đơn phương là gì (MEE Remix)',
    },
    {
        icon: <FontAwesomeIcon icon={faHashtag} style={{color: "#ffffff",}}/>,
        title: 'genzlife',
    },
]

function Discover({label}) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('container')}>
                {
                    dicovers.map((discover, index) => (
                        <div key={index} className={cx('inner')}>
                            <div className={cx('icon')}>{discover.icon}</div>
                            <div className={cx('title')}>{discover.title}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Discover