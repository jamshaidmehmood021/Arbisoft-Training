import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Drawer } from '@material-ui/core'
import {Typography} from '@material-ui/core'

const drawerWidth = 240;
const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%',
    },
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
      },
})

const DrawerComponent = ({ children }) => {
    const customClasses = useStyles()

    return (
        <div lassName={customClasses.root}>

            <Drawer
                className={customClasses.drawer}
                variant="permanent"
                classes={{ paper: customClasses.drawerPaper }}
                anchor="left"
            >
                <div>
                    <Typography variant="h5" className={customClasses.title}>
                        Post Application
                    </Typography>
                </div>

               

            </Drawer>

            <div className={customClasses.page}>
                {children}
            </div>
        </div>
    )
}

export default DrawerComponent;
