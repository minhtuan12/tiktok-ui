import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile/Profile'
import Upload from "~/pages/Upload";
import {HeaderOnly} from "src/layouts";
import config from "~/config"
import Search from "~/layouts/components/Search";
import Live from "~/pages/Live";
import Comments from "~/pages/Comments/Comments";

const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.live, component: Live},
    {path: config.routes.profile, component: Profile},
    {path: config.routes.following, component: Following},
    {path: config.routes.upload, component: Upload, layout: HeaderOnly},
    {path: config.routes.search, component: Search, layout: null},
    {path: config.routes.comments, component: Comments},
]

const privateRoutes = [
    // {path: config.routes.home, component: Home}
]

export {publicRoutes, privateRoutes}