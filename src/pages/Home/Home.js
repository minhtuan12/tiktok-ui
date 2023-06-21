import {useEffect, useRef, useState} from "react";
import Image from "~/components/Image";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faHeart, faMusic, faShare} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import MenuItems from "~/components/Popper/Menu";
import image1 from '~/asset/image/image1.jpeg';
import image2 from '~/asset/image/image2.jpeg';
import image3 from '~/asset/image/image3.jpeg';
import video1 from '~/asset/video/video1.mp4';
import video2 from '~/asset/video/video2.mp4';
import video3 from '~/asset/video/video3.mp4';
import music1 from '~/asset/music/music1.mp3';
import music2 from '~/asset/music/music2.mp3';
import music3 from '~/asset/music/music3.mp3';
import classNames from "classnames/bind";
import styles from '~/pages/Home/HomePage/Content.module.scss';
import {
    faCode,
    faEnvelope,
    faLink,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faLine, faLinkedin,
    faPinterest, faRedditSquare,
    faTelegram,
    faTwitter,
    faWhatsappSquare
} from "@fortawesome/free-brands-svg-icons";
import Header from "~/layouts/components/Header";
import Context from "~/store/Context";
import Content from "src/pages/Home/HomePage";


const cx = classNames.bind(styles)

const SHARE_MENU = [
    {
        icon: <FontAwesomeIcon icon={faCode} style={{color: "#ffffff",}}/>,
        title: 'Embed',
        to: '/embed',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faPaperPlane} size="sm" style={{color: "#ffffff",}}/>,
        title: 'Send to friends',
        to: '/messages',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faFacebook} size="sm" style={{color: "#3881ff",}}/>,
        title: 'Share to Facebook',
        to: '/facebook',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faWhatsappSquare} size="sm" style={{color: "#1ce9a4",}}/>,
        title: 'Share to WhatsApp',
        to: '/whatsapp',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faLink} size="sm" style={{color: "#ffffff",}}/>,
        title: 'Copy link',
        to: '',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faTwitter} size="sm" style={{color: "#ffffff",}}/>,
        title: 'Share to Twitter',
        to: '/twitter',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faLinkedin} size="sm" style={{color: "#005eff",}}/>,
        title: 'Share to LinkedIn',
        to: '/linkedin',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faRedditSquare} size="sm" style={{color: "#ff0000",}}/>,
        title: 'Share to Reddit',
        to: '/reddit',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faTelegram} size="sm" style={{color: "#3981fe",}}/>,
        title: 'Share to Telegram',
        to: '/telegram',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faEnvelope} size="sm" style={{color: "#5c98ff",}}/>,
        title: 'Share to Email',
        to: '/email',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faLine} size="sm" style={{color: "#1eae49",}}/>,
        title: 'Share to Line',
        to: '/line',
        separate: false,
    },
    {
        icon: <FontAwesomeIcon icon={faPinterest} size="sm" style={{color: "#ff2e2e",}}/>,
        title: 'Share to Pinterest',
        to: '/pinterest',
        separate: false,
    },
]

const data = [
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
        }
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
        }
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
        }
    },
]

function Home() {

    const visbilityChange = () => {
        //
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', visbilityChange)
    }, [])
    return (
        <div className={cx('home-container')}>
            <Content/>
        </div>
    )
}

export default Home