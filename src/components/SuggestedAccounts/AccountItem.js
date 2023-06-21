import classNames from "classnames/bind";
import styles from './SuggestedAccounts.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import {Wrapper as PopperWrapper} from '~/components/Popper'
import AccountPreview from "~/components/SuggestedAccounts/AccountPreview";
import {Link} from "react-router-dom";
import {data} from "~/data/Data";

const cx = classNames.bind(styles)

function AccountItem() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const currentUserId = currentUser ? currentUser[0].id : ''

    // Follow
    const following = JSON.parse(localStorage.getItem("following"))

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
                data.map((account, index) => (
                    <Link key={index} to={`/@${account.user.username}`} style={{ textDecoration: 'none', color: '#ffffff'}}>
                        <Tippy
                            interactive
                            delay={[300, 0]}
                            offset={[0, 0]}
                            render={() => (renderPreview(account))}
                            placement={"bottom"}
                        >
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
                        </Tippy>
                    </Link>
                ))
            }
        </>
    )
}

AccountItem.propTypes = {}
export default AccountItem