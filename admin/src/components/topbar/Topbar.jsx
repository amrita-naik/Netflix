import './topbar.css'
import { NotificationsNone, Language, Settings, Face } from "@material-ui/icons";


function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                 <span className="logo">an-admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                        <Face className='face'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
