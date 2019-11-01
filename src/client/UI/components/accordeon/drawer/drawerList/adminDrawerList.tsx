import React from 'react';
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';
import URLS from "../../../../../../common/URLS";


export interface IAdminDrawerListProps {
    isStashDeveloper: boolean;
}
const AdminDrawerList = ({isStashDeveloper}: IAdminDrawerListProps) => {
    const sections = [
        {name: 'Subscribes', link: URLS.SUBSCRIBES, icon: NotificationsIcon, isDisplayed: isStashDeveloper},
        {name: 'Developers', link: URLS.DEVELOPERS, icon: PersonIcon, isDisplayed: isStashDeveloper},
        {name: 'Repositories', link: URLS.REPOSITORIES, icon: GitHubIcon, isDisplayed: isStashDeveloper},
        {name: 'Settings', link: URLS.SETTINGS, icon: SettingsIcon, isDisplayed: true},
    ];

    return (
        <List>
            {sections.filter(section => section.isDisplayed).map(section => {
                const Icon = section.icon;
                return (
                    <Link to={section.link} key={section.name} style={{textDecoration: 'none', color: 'black'}}>
                        <ListItem button>
                            <ListItemIcon><Icon/></ListItemIcon>
                            <ListItemText primary={section.name}/>
                        </ListItem>
                    </Link>
                )
            })}
        </List>
    )
};

export default AdminDrawerList;