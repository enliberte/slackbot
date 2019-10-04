import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {RouteComponentProps, withRouter} from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        margin: '40px 0px 0px 0px',
        flexGrow: 1
    },
});

interface ITab {
    icon: any;
    label: string;
    link: string;
}

export interface IItemTabsProps extends RouteComponentProps {
    tabs: ITab[];
}

const ItemTabs = ({history, tabs}: IItemTabsProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid item xs={12}>
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return <Tab icon={<Icon/>} label={tab.label} onClick={() => history.push(tab.link)}/>
                    })}
                </Tabs>
            </Paper>
        </Grid>
    )
};

export default withRouter(ItemTabs);