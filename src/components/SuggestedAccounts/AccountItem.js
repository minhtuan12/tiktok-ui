import classNames from "classnames/bind";
import styles from './SuggestedAccounts.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import {Wrapper as PopperWrapper} from '~/components/Popper'
import AccountPreview from "~/components/SuggestedAccounts/AccountPreview";
import {Link} from "react-router-dom";
import {data} from "~/data/Data";
import {useState} from "react";

const cx = classNames.bind(styles)

function AccountItem() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const currentUserId = currentUser ? currentUser[0].id : ''

    // Follow
    const following = JSON.parse(localStorage.getItem("following"))
    const currentUserFollowing = currentUser ? following[currentUserId] : []

    const follow = currentUserFollowing.length > 0 && currentUserFollowing.map(each => each.id)
    const suggestedAccount = follow ? data.filter(each => !follow.includes(each.user.id)) : data

    const renderPreview = (account, props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    {
                        <AccountPreview account={account}/>
                    }
                </PopperWrapper>
            </div>
        )
    }

    return (
        <>
            {
                suggestedAccount.map((account, index) => (
                    <Tippy
                        key={index}
                        interactive
                        delay={[300, 0]}
                        offset={[0, 0]}
                        render={() => (renderPreview(account))}
                        placement={"bottom"}
                    >
                        <Link to={`/@${account.user.username}`}
                              style={{textDecoration: 'none', color: '#ffffff'}}>
                            <div className={cx('account-item')}>
                                <img
                                    className={cx('avatar')}
                                    src={account.user.avatar}
                                    alt=""
                                />
                                <div className={cx('item-info')}>
                                    <p className={cx('nickname')}>
                                        <span>{account.user.name}</span>
                                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                                    </p>
                                    <p className={cx('name')}>{account.user.username}</p>
                                </div>
                            </div>
                        </Link>
                    </Tippy>
                ))
            }
        </>
    )
}

AccountItem.propTypes = {}
export default AccountItem