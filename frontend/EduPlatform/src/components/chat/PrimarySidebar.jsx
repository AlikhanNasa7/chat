import React, { useEffect, useState } from 'react'
import { Drawer, Box, useMediaQuery, Typography, styled } from '@mui/material'
import { useTheme } from '@emotion/react';
import PrimarySidebarHeader from './PrimarySidebarHeader';

const PrimarySidebar = ({children}) => {

    const theme = useTheme();
    const isSmall = useMediaQuery("(max-width:599px)");
    const [sideBar, setSideBar] = useState(!isSmall);

    console.log(isSmall);

    useEffect(()=>{
        setSideBar(isSmall ? false : true);
    },[isSmall]);

    const handleHeader = () =>{
        setSideBar(prev=>!prev);
    }

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
        width: theme.primarySideBar.closed,
    });


    const Drawer2 = styled(
        Drawer,
        {}
      )(({ theme, open }) => ({
        width: theme.primarySideBar.width,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(),
          "& .MuiDrawer-paper": openedMixin(),
        }),
        ...(!open && {
          ...closedMixin(),
          "& .MuiDrawer-paper": closedMixin(),
        }),
    }));

    return (
        <Drawer2 open={sideBar} variant={isSmall ? "temporary" : "permanent"} 
            PaperProps={{
                sx:{
                    mt: `${theme.primaryAppBar.height}px`,
                    height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
                    width: sideBar ? `${theme.primarySideBar.width}px` : `${theme.primarySideBar.closed}px`,
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                    overflowX: "hidden"
                }
            }}
        >
            <Box>
                <Box sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        p: 0,
                        width: sideBar ? "auto" : "100%",
                    }}
                >
                    <PrimarySidebarHeader handleHeader={handleHeader} isOpen={sideBar}/>
                </Box>
                {React.Children.map(children, (child)=>{
                    return React.isValidElement(child) 
                    ? React.cloneElement(child, {sideBar})
                    : child;
                })}
            </Box>
        </Drawer2>
    )
}

export default PrimarySidebar