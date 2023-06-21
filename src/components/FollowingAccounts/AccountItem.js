import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from './FollowingAccounts.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const cx = classNames.bind(styles)

const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const currentUserId = currentUser ? currentUser[0].id : ''
const accounts = currentUserId ? JSON.parse(localStorage.getItem("following"))[currentUserId] : []

function AccountItem() {

    const [followedAccounts, setFollowedAccounts] = useState([])

    useEffect(() => {
        setFollowedAccounts(accounts)
    })
    return (
        <>
            {
                followedAccounts.reverse().map((account) => (
                    <Link key={account.id} to={`/@${account.username}`} style={{textDecoration: 'none', color: '#ffffff'}}>
                        <Tippy
                            interactive
                        >
                            <div className={cx('account-item')}>
                                <img
                                    className={cx('avatar')}
                                    src={account.avatar}
                                    alt=""
                                />
                                <div className={cx('item-info')}>
                                    <p className={cx('nickname')}>
                                        <span>{account.username}</span>
                                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                                    </p>
                                    <p className={cx('name')}>{account.name}</p>
                                </div>
                            </div>
                        </Tippy>
                    </Link>
                ))
            }
        </>
    )
}

AccountItem.propTypes = {}
export default AccountItem