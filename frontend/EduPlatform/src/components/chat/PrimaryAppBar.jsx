import React, { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import { AppBar, Box, IconButton, Toolbar, Typography, Drawer } from '@mui/material'
import { Link } from 'react-router-dom'
import {Menu} from "@mui/icons-material"
import {useMediaQuery} from '@mui/material'
import styled from '@emotion/styled'
import {drawerClasses} from '@mui/material/Drawer'

const PrimaryAppBar = () => {
    const [sideMenu, setSideMenu] = useState(false);
    const theme = useTheme()

    const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));


    const openedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
    });

    const closedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
        width: theme.primarySideBar.closed
    });



    useEffect(()=>{
        if (isNotSmallScreen && sideMenu){
            setSideMenu(false);
        }
    },[isNotSmallScreen]);

    const toggleSideMenu = () => {
        setSideMenu(prev=> !prev);
    }

    return (
        <AppBar sx={{
            zIndex: (theme)=> theme.zIndex.drawer + 2,
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
            <Toolbar 
                variant="dense"
                sx={{
                    height: theme.primaryAppBar.height,
                    minHeight: theme.primaryAppBar.height
                }}
            >
                <Box sx={{display:{xs:"block", sm:"none"}}}>
                    <IconButton color='black' aria-label='open draw' sx={{mr:2}} edge="start" onClick={toggleSideMenu}>
                        <Menu/>
                    </IconButton>
                </Box>

                <Drawer anchor='left' open={sideMenu}>
                    {[...Array(100)].map((_,i)=>(
                        <Typography key={i} paragraph>
                            {i + 1}
                        </Typography>
                    ))}
                </Drawer>

                <Link to="/" style={{color: "black", underline: "none"}}>
                    <Typography variant='h6' noWrap  component="div" sx={{display:{fontWeight: 700, letterSpacing: "-0.5px"}}}>
                        DJCHAT
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default PrimaryAppBar