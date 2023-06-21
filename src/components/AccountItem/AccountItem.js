import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Image from "~/components/Image/Image";
import PropTypes from "prop-types";

const cx = classNames.bind(styles)

function AccountItem({data}) {
    return (
        <Link to={`/`} className={cx('wrapper')}>
            <Image alt={data.full_name}
                   src={data.avatar}
                   className={cx('avatar')}/>
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>{data.full_name}</span>
                    <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle}/>
                </p>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired
}
export default AccountItem