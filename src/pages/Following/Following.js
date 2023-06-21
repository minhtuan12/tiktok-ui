import {useState} from "react";
import video1 from "~/asset/video/video1.mp4";
import music1 from "~/asset/music/music1.mp3";
import image1 from "~/asset/image/image1.jpeg";
import video2 from "~/asset/video/video2.mp4";
import music2 from "~/asset/music/music2.mp3";
import image2 from "~/asset/image/image2.jpeg";
import video3 from "~/asset/video/video3.mp4";
import music3 from "~/asset/music/music3.mp3";
import image3 from "~/asset/image/image3.jpeg";
import Button from "~/components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import styles from './Following.module.scss'
import classNames from "classnames/bind";
import {actions, useStore} from "~/store";
import Content from "./Content"

const cx = classNames.bind(styles)

const content = [
    {
        id: "vid1",
        src: video1,
        description: "Trả lời @𝐕𝐢𝐞̣̂𝐭 𝐌𝐲̃ ✏️ khẩu trang thời hậu covic , sao mà đỡ được",
        likes: "124K",
        comments: "234",
        shares: "3454",
        tags: [],
        music: {
            "name": "Mật Ngọt",
            "src": music1,
            "author": "Dunghoangpham",
        },
        user: {
            id: "user1",
            name: "1992tron",
            nickname: "Huỳnh Nguyễn",
            avatar: image1,
            followers: '124K',
        },
        play: true,
    },
    {
        id: "vid2",
        src: video2,
        description: "Ko hiểu ai sợ hơn ông ngoại, Sóc hay Nguyễn Minh Hoàng? 🤣",
        likes: "124",
        comments: "1009",
        shares: "567",
        tags: [],
        music: {
            "name": "nhạc nền",
            "src": music2,
            "author": "Trox & Lacci",
        },
        user: {
            id: "user2",
            name: "troxlacci",
            nickname: "Trox & Lacci",
            avatar: image2,
            followers: '56K',
        },
        play: false,
    },
    {
        id: "vid3",
        src: video3,
        description: "nắng ba năm tui chưa bỏ bạn",
        likes: "4565",
        comments: "5676",
        shares: "678",
        tags: [
            "amnhacvietnams",
            "cover",
            "music",
            "bocoveroktok",
            "musica",
            "bemay",
        ],
        music: {
            "name": "nhạc nền",
            "src": music3,
            "author": "Bé Mâyy☁️",
        },
        user: {
            id: "user3",
            name: "amnhacvietnams",
            nickname: "âm nhạc",
            avatar: image3,
            followers: '3544',
        },
        play: false,
    },
]

function Following() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const currentUserId = currentUser ? currentUser[0].id : ''
    const [state, dispatch] = useStore()
    const following = JSON.parse(localStorage.getItem("following"))
    const currentUserFollowing = currentUser ? following[currentUserId] : []

    const [follow, setCurrentFollow] = useState(currentUserFollowing)
    const [followed, setFollowed] = useState(false)

    const checkFollowing = (key) => {
        if (follow && follow.length > 0)
            return !!follow.some(tmp => tmp.id === key.id);
        return false
    }

    const handleFollow = (key) => {
        setFollowed(true)
        dispatch(actions.followed())

        if (!currentUser)
            dispatch(actions.show_modal())
        else {
            if (follow.includes(key)) {
                const tmpCurrentUserFollowing = currentUserFollowing.filter(each => each.id !== key.id)   // remove following account
                setCurrentFollow(tmpCurrentUserFollowing)
                following[`${currentUserId}`] = tmpCurrentUserFollowing
                dispatch(actions.unfollowed_accounts())
            } else {
                dispatch(actions.followed_accounts())
                currentUserFollowing.push(key)  // follow account
                setCurrentFollow(currentUserFollowing)
                following[`${currentUserId}`] = currentUserFollowing
            }
            localStorage.setItem("following", JSON.stringify(following))
        }
    }

    return (
        <>
            {!currentUser ? (
                <div className={cx('wrapper')}>
                    {
                        content.map(data => (
                            <div key={data.id} className={cx('container')}>
                                <video
                                    onMouseOver={e => e.target.play()}
                                    onMouseOut={e => e.target.pause()}
                                    autoPlay
                                    muted loop
                                    className={cx('video')}
                                    src={data.src}
                                />

                                <div className={cx('body')}>
                                    <img className={cx('avatar')}
                                         src={data.user.avatar}
                                         alt=""/>
                                    <p className={cx('nickname')}>{data.user.name}</p>
                                    <p className={cx('name')}>
                                        <strong>{data.user.username}</strong>
                                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                                    </p>
                                    <div className={cx('btn')}>
                                        <Button onClick={() => handleFollow(data.user)} primary medium>Follow</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ) : (
                <Content/>
            )}
        </>
    )
}

export default Following