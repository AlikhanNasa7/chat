import React, { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import { 
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    Typography,
    AppBar,
    Toolbar,
    Avatar,
    IconButton,
    Drawer
} from '@mui/material'
import { useParams } from 'react-router-dom';
import { MEDIA_URL } from '../../config';
import { MoreVert } from '@mui/icons-material';
import ServerChannels from './ServerChannels';

const MessageInterfaceChannels = ({data}) => {
    const theme = useTheme();
    const {serverId, channelId} = useParams();
    const [sideMenu, setSideMenu] = useState(false);

    console.log(data);
    const channel = data?.channels?.find(channel=>channel.id==channelId);


    useEffect(()=>{
        setSideMenu(false);
    },[channelId]);

    const channelsList = () => {
        return (<Box 
            sx={{
                paddingTop: `${theme.primaryAppBar.height}px`,
                minWidth: '200px',
            }}
            //onClick={toggleDrawer}
        >  
            <ServerChannels serverData={data} isLoading={false}/>
        </Box>)
    }

    const toggleDrawer = (value) => {
        setSideMenu(value);
    }

    return (
        <>
            <AppBar 
                sx={{
                    backgroundColor: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
                color='default'
                position='sticky'
                elevation={0}
            >
                <Toolbar 
                    variant='dense'
                    sx={{
                        height: theme.primaryAppBar.height,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start"
                    }}
                >
                    <Box sx={{display: {xs: "block", sm: "none"}}}>
                        <ListItemAvatar sx={{minWidth: "40px"}}>
                            <Avatar 
                                alt='Server Icon'
                                src={`${MEDIA_URL}${data?.icon}`}
                                sx={{
                                    width: "30px",
                                    height: "30px"
                                }}
                            />
                        </ListItemAvatar>
                    </Box>
                    <Typography component="div" noWrap>
                        {channel?.name ?? data.name}
                    </Typography>

                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: "block", sm: "none"}}}>
                        <IconButton>
                            <MoreVert onClick={() => toggleDrawer(true)}/>
                        </IconButton>
                    </Box>
                    <Drawer anchor="left" open={sideMenu} onClose={()=> toggleDrawer(false)}>
                        {channelsList()}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default MessageInterfaceChannels