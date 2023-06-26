import styles from './Comments.module.scss'
import classNames from "classnames/bind";
import {data} from "~/data/Data";
import Image from "~/components/Image";
import {Link, useParams} from "react-router-dom";
import Button from "~/components/Button";
import {
    faAngleDown,
    faAngleUp,
    faAt,
    faBookmark,
    faFaceGrinWide,
    faHeart, faMusic, faShare,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createElement, Fragment, useRef, useState} from "react";
import {useStore} from "~/store";
import * as actions from "~/store/actions";
import {Wrapper as PopperWrapper} from "~/components/Popper";
import AccountPreview from './AccountPreview';
import moment from "moment";
import mm from "moment/moment";

const cx = classNames.bind(styles)

function Comments() {
    const [state, dispatch] = useStore()
    const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : ''

    const [active, setActive] = useState(false)
    const [comment, setComment] = useState('')
    const cmRef = useRef(null)
    const [letterCount, setLetterCount] = useState(0)
    const [visible, setVisible] = useState(false)
    const [replyUsername, setReplyUsername] = useState('')
    const [commentReplyId, setCommentReplyId] = useState('')
    const [viewMoreReplies, setViewMoreReplies] = useState(false)
    const commentRef = useRef()

    const param = useParams()
    const video = data.filter(each => '@' + each.user.username === param.user && each.id === param.id)
    let localComment = JSON.parse(localStorage.getItem('comment'))
    const currentVideo = localComment ? JSON.parse(localStorage.getItem('comment')).filter(video => video.videoId === param.id)[0] : []
    let videoComment = (currentVideo && currentVideo.commentUser) ? currentVideo.commentUser : []

    if (!currentVideo) {
        // if (localComment)
        (localComment).push({
            videoId: video[0].id,
            commentUser: [],
        })
        localStorage.setItem('comment', JSON.stringify(localComment))
    }

    const handleChangeComment = e => {
        if (e.target.offsetHeight >= 48)
            setVisible(true)
        else setVisible(false)
        setActive(true)
        setComment(e.currentTarget.textContent)
        if (cmRef.current.innerText.length === 0)
            setActive(false)
        setLetterCount(cmRef.current.textContent.length)
        setComment(cmRef.current.textContent)

        return createElement('span', `${comment}`)
    }

    const handlePostComment = () => {
        if (comment === '')
            return
        const mm = require('moment')
        if (replyUsername === '') {
            let commentId = videoComment.length > 0 ? videoComment[0].commentId++ : 0
            const newComment = {
                id: currentUser[0].id,
                commentId: commentId,
                username: currentUser[0].username,
                name: currentUser[0].name,
                avatar: currentUser[0].avatar,
                comment: comment,
                date: {
                    day: mm().date(),
                    month: mm().month() + 1,
                    year: mm().year()
                },
                likes: video[0].user.likes,
                followers: video[0].user.followers,
                bio: currentUser[0].bio,
                commentLikes: 0,
                reply: []
            }
            videoComment.push(newComment)
        } else {
            let replyCommentId = (videoComment.length > 0 && videoComment[0].reply.length > 0) ? videoComment[0].reply[0].replyCommentId++ : 0
            const commentReplied = videoComment.find(each => each.commentId === commentReplyId)
            const replyComment = {
                replyCommentId: replyCommentId,
                replyUser: {
                    name: currentUser[0].name,
                    avatar: currentUser[0].avatar,
                    comment: comment,
                    date: {
                        day: mm().date(),
                        month: mm().month() + 1,
                        year: mm().year()
                    },
                    likes: 0,
                }
            }
            commentReplied.reply.push(replyComment)
            videoComment = videoComment.filter(each => each.commentId !== commentReplyId)
            videoComment.push(commentReplied)
        }

        const final = {
            videoId: video[0].id,
            commentUser: videoComment,
        }
        localComment = localComment.filter(each => each.videoId !== param.id)
        localComment.push(final)
        try {
            localStorage.setItem('comment', JSON.stringify(localComment))
        } catch (e) {
            alert(e)
        }

        // currentVideo.commentUser.push(videoComment)

        setActive(false)
        setComment('')
        setReplyUsername('')
        cmRef.current.textContent = ''
        dispatch(actions.commented)
        setTimeout(() => {
            dispatch(actions.comment)
        }, 2000)
    }

    const handleReply = (user) => {
        setReplyUsername(`Reply to @${user.name} : `)
        setCommentReplyId(user.commentId)

        const tag = document.getElementById('comment-input')
        // const setpos = document.createRange()
        // const set = window.getSelection()
        // setpos.setStart(tag.childNodes[0], 12)
        // setpos.collapse(true);
        // set.removeAllRanges();
        // set.addRange(setpos);
        // tag.focus();

    }

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
            <div className={cx('wrapper')}>
                <div className={cx('video-container')}>
                    <div className={cx('blur-background')}>
                        <img className={cx('blur-image')} alt="" src={video[0].imageFirstTime}/>
                    </div>
                    <div className={cx('video-wrapper')}>
                        <img alt="" src={video[0].imageFirstTime}/>
                        <video controls autoPlay src={video[0].src}/>
                    </div>
                    <div className={cx('video-switch')}>
                        <button className={cx('up-down-icon')}>
                            <FontAwesomeIcon icon={faAngleUp} size={'lg'} style={{color: "#ffffff",}}/>
                        </button>
                        <button className={cx('up-down-icon')}>
                            <FontAwesomeIcon icon={faAngleDown} size={'lg'} style={{color: "#ffffff",}}/>
                        </button>
                    </div>
                    <div className={cx('action-bar')}>
                        <div className={cx('action-item')}>
                            <button className={cx('action-btn')}>
                                <span className={cx('span-icon-wrapper')}>
                                    <div className={cx('icon-container')}>
                                        <FontAwesomeIcon icon={faHeart} size={'2xl'} style={{color: "#ffffff",}}/>
                                    </div>
                                </span>
                                <strong className={cx('icon-statistics')}>
                                    {video[0].likes}
                                </strong>
                            </button>
                            <button className={cx('action-btn')}
                                    onClick={() => commentRef.current.scrollIntoView({
                                        behavior: "smooth",
                                        block: 'start'
                                    })}>
                                <span className={cx('span-icon-wrapper')}>
                                    <div className={cx('icon-container')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72"
                                             height="72" preserveAspectRatio="xMidYMid slice"
                                             style={{
                                                 width: '85%',
                                                 height: '85%',
                                                 transform: 'translate3d(0px, 0px, 0px)',
                                                 contentVisibility: 'visible'
                                             }}><defs><clipPath
                                            id="__lottie_element_2507"><rect width="72" height="72" x="0" y="0"></rect></clipPath></defs><g
                                            clipPath="url(#__lottie_element_2507)"><g
                                            transform="matrix(0.6616870760917664,0,0,0.6616870760917664,62.815032958984375,36.75044250488281)"
                                            opacity="1" style={{display: 'block'}}><g opacity="1"
                                                                                      transform="matrix(3,0,0,3,0,0)"><path
                                            fill="rgb(255,255,255)" fillOpacity="1"
                                            d=" M-4.644999980926514,4.482999801635742 C-7.25,7.818999767303467 -13.482000350952148,8.300000190734863 -13.482000350952148,8.300000190734863 C-13.482000350952148,8.300000190734863 -14.413999557495117,11.48799991607666 -12.135000228881836,10.821000099182129 C-9.855999946594238,10.154000282287598 -7.25,8.152000427246094 -4.644999980926514,4.482999801635742z M-17.36,-1.04 C-17.36,-0.16 -18.07,0.56 -18.96,0.56 C-18.96,0.56 -18.96,0.56 -18.96,0.56 C-19.85,0.56 -20.57,-0.16 -20.57,-1.04 C-20.57,-1.92 -19.85,-2.64 -18.96,-2.64 C-18.07,-2.64 -17.36,-1.92 -17.36,-1.04z M-11.89,-1.04 C-11.89,-0.16 -12.61,0.56 -13.5,0.56 C-13.5,0.56 -13.5,0.56 -13.5,0.56 C-14.39,0.56 -15.11,-0.16 -15.11,-1.04 C-15.11,-1.92 -14.39,-2.64 -13.5,-2.64 C-12.61,-2.64 -11.89,-1.92 -11.89,-1.04z M-6.43,-1.04 C-6.43,-0.16 -7.15,0.56 -8.04,0.56 C-8.04,0.56 -8.04,0.56 -8.04,0.56 C-8.92,0.56 -9.64,-0.16 -9.64,-1.04 C-9.64,-1.92 -8.92,-2.64 -8.04,-2.64 C-7.15,-2.64 -6.43,-1.92 -6.43,-1.04z M-5.79,5.98 C-3.56,3.75 -2.25,1.42 -2.25,-1.29 C-2.25,-6.79 -7.29,-11.25 -13.5,-11.25 C-19.71,-11.25 -24.75,-6.79 -24.75,-1.29 C-24.75,4.21 -19.55,7.99 -13.34,7.99 C-13.34,7.99 -13.34,11.06 -13.34,11.06 C-13.34,11.06 -8.51,8.72 -5.79,5.98z"></path><g
                                            opacity="1" transform="matrix(1,0,0,1,-6.75,-7.456999778747559)"><g
                                            opacity="1" transform="matrix(-1,0,0,1,0,0)"></g><g opacity="1"
                                                                                                transform="matrix(-1,0,0,1,0,0)"></g><g
                                            opacity="1" transform="matrix(-1,0,0,1,0,0)"></g><g opacity="1"
                                                                                                transform="matrix(-1,0,0,1,0,0)"></g></g></g></g></g></svg>
                                    </div>
                                </span>
                                <strong className={cx('icon-statistics')}>
                                    {video[0].comments}
                                </strong>
                            </button>
                            <button className={cx('action-btn')}>
                                <span className={cx('span-icon-wrapper')}>
                                    <div className={cx('icon-container')}>
                                        <FontAwesomeIcon icon={faBookmark} size={'2xl'} style={{color: "#ffffff"}}/>
                                    </div>
                                </span>
                                <strong className={cx('icon-statistics')}>
                                    {video[0].save}
                                </strong>
                            </button>
                            <button className={cx('action-btn')}>
                                <span className={cx('span-icon-wrapper')}>
                                    <div className={cx('icon-container')}>
                                        <FontAwesomeIcon icon={faShare} size={'2xl'} style={{color: "#ffffff",}}/>
                                    </div>
                                </span>
                                <strong className={cx('icon-statistics')}>
                                    {video[0].shares}
                                </strong>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('video-info-container')}>
                    <div className={cx('description')}>
                        {video[0].description}
                        <strong style={{fontWeight: '600'}}> &nbsp;
                            {video[0].tags.map((tag, index) => <Fragment key={index}><span
                                className={cx('tag')}>#{tag}</span><span>&nbsp;</span></Fragment>)}
                        </strong>
                    </div>
                    <h4 className={cx('music-desc')}>
                        <FontAwesomeIcon icon={faMusic} size={'sm'} style={{color: "#ffffff", marginRight: '8px'}}/>
                        {video[0].music.name} - {video[0].music.author}
                    </h4>
                </div>
                <div ref={commentRef} className={cx('user-container')}>
                    <Link to={`/@${video[0].user.username}`}
                          style={{display: 'flex', textDecoration: 'none', color: '#ffffff'}}>
                        <Image
                            alt="image"
                            src={video[0].user.avatar}
                            className={cx('avatar')}
                        />
                        <div className={cx('user-info')}>
                            <span className={cx('username')}>{video[0].user.username}</span> <br/>
                            <span className={cx('name')}>{video[0].user.name}</span>
                        </div>
                    </Link>
                    <Button primary>Follow</Button>
                </div>
                <div className={cx('comments-container')}>
                    <p className={cx('statistics')}>{video[0].comments} comments</p>
                    <div className={cx('user-comment')}>
                    <span className={cx('avatar-wrapper')} style={{width: '48px', height: '48px'}}>
                        {currentUser ? <Image className={cx('user-avatar')} alt="" src={currentUser[0].avatar}/>
                            : <FontAwesomeIcon icon={faUser} size='xl' style={{
                                color: "#f0f0f0", fontSize: '243%',
                                paddingTop: '30%'
                            }}/>}
                    </span>
                        <div className={cx('comment-input-wrapper')}>
                            <div className={cx('comment-input-container')}>
                                {currentUser ? (
                                    <>
                                        <div className={cx('comment-input-layout')}>
                                            <div className={cx('textbox-wrapper')}>
                                                {replyUsername !== '' &&
                                                    <span className={cx('reply-span')}>{replyUsername}</span>}
                                                <div contentEditable={true}
                                                     id={'comment-input'}
                                                     ref={cmRef}
                                                     className={cx('comment-input')}
                                                     placeholder='Add comment...'
                                                     onInput={handleChangeComment}
                                                     onKeyDown={e => {
                                                         if (e.key === 'Backspace' && window.getSelection().focusOffset === 0) {
                                                             setReplyUsername('')
                                                         }
                                                     }}
                                                    // onClick={() => spanRef.current.focus()}
                                                >
                                                    {/*<span ref={spanRef}></span>*/}
                                                </div>
                                                {visible && <div>{letterCount}/150</div>}
                                            </div>
                                            <FontAwesomeIcon icon={faAt} size="lg" style={{color: "#ffffff",}}/>
                                            <FontAwesomeIcon className={cx('emoji-icon')} icon={faFaceGrinWide}
                                                             size="lg"/>
                                        </div>
                                        <div onClick={handlePostComment} role='button'
                                             className={cx(active ? 'active-post-btn' : 'post-btn')}>Post
                                        </div>
                                    </>
                                ) : (
                                    <div onClick={() => dispatch(actions.show_modal())}
                                         className={cx('non-user-comment')}>
                                        <span className={cx('login-to-comment')}>
                                            Log in to comment
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        {videoComment.length > 0 && videoComment.map(each => (
                            <div key={each.id} className={cx('guest-comment')}>
                                {each.comment !== '' && (
                                    <div className={cx('comment-list')}>
                                        <div className={cx('comment-item')}>
                                            <Link to={`/@${each.username}`}
                                                  style={{color: '#ffffff'}}>
                                                {/*<Tippy*/}
                                                {/*    interactive*/}
                                                {/*    delay={[300, 0]}*/}
                                                {/*    offset={[0, 0]}*/}
                                                {/*    render={() => (renderPreview(currentUser[0]))}*/}
                                                {/*    placement={"bottom"}*/}
                                                {/*>*/}
                                                <div className={cx('guest-avatar')}>
                                                    <img style={{width: '48px', height: '48px', borderRadius: '50%'}}
                                                         alt=""
                                                         src={each.avatar}/>
                                                </div>
                                                {/*</Tippy>*/}
                                            </Link>
                                            <div className={cx('comment-item-container')}>
                                                <Link to={`/@${each.username}`}
                                                      style={{
                                                          textDecoration: 'none',
                                                          color: '#ffffff',
                                                          display: 'contents',
                                                          width: `${each.name.length * 1.45}%`,
                                                      }}>
                                                    <div className={cx('guest-name')}
                                                         style={{width: `${each.name.length * 1.45}%`}}>
                                                        {each.name}
                                                    </div>
                                                </Link>
                                                <div className={cx('comment-level-1')}>
                                                    {each.comment}
                                                </div>
                                                <div className={cx('comment-sub-content')}>
                                                    <span>{each.date.month}-{each.date.day}</span>
                                                    <div className={cx('like-container')}>
                                                        <svg width="20" data-e2e="" height="20" viewBox="0 0 48 48"
                                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"></path>
                                                        </svg>
                                                        <span className={cx('likes')}>{each.commentLikes}</span>
                                                    </div>
                                                    <span onClick={() => handleReply(each)}
                                                          role={"button"} className={cx('reply')}>Reply</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {each.reply.length > 0 && !viewMoreReplies ? (
                                    <div className={cx('reply-comment-action')}>
                                        <div className={(cx('reply-action-container'))}>
                                            <p className={cx('reply-action-text')}
                                               onClick={() => setViewMoreReplies(true)}>
                                                View more replies ({each.reply.length})
                                                <div className={cx('down-arrow-icon')}>
                                                    <FontAwesomeIcon icon={faAngleDown}/>
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {each.reply.map(reply => (
                                            <div key={reply.replyCommentId} className={cx('reply-comment')}>
                                                <div className={cx('comment-list')}>
                                                    <div className={cx('comment-item')}>
                                                        <Link to={`/`}
                                                              style={{color: '#ffffff'}}>
                                                            <div className={cx('guest-avatar')}>
                                                                <img style={{
                                                                    width: '24px',
                                                                    height: '24px',
                                                                    borderRadius: '50%'
                                                                }}
                                                                     alt=""
                                                                     src={reply.replyUser.avatar}/>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('comment-item-container')}>
                                                            <Link to={`/`}
                                                                  style={{
                                                                      textDecoration: 'none',
                                                                      color: '#ffffff',
                                                                      display: 'contents',
                                                                      width: `${reply.replyUser.name.length * 1.45}%`,
                                                                  }}>
                                                                <div className={cx('guest-name')}
                                                                     style={{width: `${reply.replyUser.name.length * 1.45}%`}}>
                                                                    {reply.replyUser.name}
                                                                </div>
                                                            </Link>
                                                            <div className={cx('comment-level-1')}>
                                                                {reply.replyUser.comment}
                                                            </div>
                                                            <div className={cx('comment-sub-content')}>
                                                                <span>{reply.replyUser.date.month}-{reply.replyUser.date.day}</span>
                                                                <div className={cx('like-container')}>
                                                                    <svg width="20" data-e2e="" height="20"
                                                                         viewBox="0 0 48 48"
                                                                         fill="currentColor"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                                              d="M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z"></path>
                                                                    </svg>
                                                                    <span
                                                                        className={cx('likes')}>{reply.replyUser.likes}</span>
                                                                </div>
                                                                <span onClick={() => handleReply(each)}
                                                                      role={"button"}
                                                                      className={cx('reply')}>Reply</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={(cx('reply-hide-container'))}>
                                                    <p className={cx('reply-hide-text')}
                                                       onClick={() => setViewMoreReplies(false)}>
                                                        Hide
                                                        <div className={cx('up-arrow-icon')}>
                                                            <FontAwesomeIcon icon={faAngleUp}/>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments