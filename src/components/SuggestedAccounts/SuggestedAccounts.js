import classNames from "classnames/bind";
import styles from './SuggestedAccounts.module.scss'
import PropTypes from "prop-types";
import AccountItem from "./AccountItem";

const cx = classNames.bind(styles)

function SuggestedAccounts({label}) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <AccountItem/>
            <p className={cx('more-content')}>See all</p>
        </div>
    )
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
}
export default SuggestedAccounts