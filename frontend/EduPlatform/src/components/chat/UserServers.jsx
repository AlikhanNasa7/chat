import React, {useEffect, useState} from 'react';
import {
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Box, 
    Typography,
    Avatar,
    ListItemAvatar
} from '@mui/material';
import useCrud from '../../hooks/useCrud';
import { Link } from 'react-router-dom';
import { MEDIA_URL } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';

const UserServers = ({sideBar, serverId, dataCRUD, isLoading}) => {

    return (
        <>
            <Box
                sx={{
                    height: 50,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    flex: "1 1 100%",
                    backgroundColor: "blue"
                }}
            >
                {sideBar && <Typography sx={{}}>
                    Servers
                </Typography>}
            </Box>
            <List>
                {isLoading && (<Typography>Loading</Typography>)}
                {dataCRUD && dataCRUD.map(item=>(
                    <ListItem key={item.id} disablePadding sx={{display: "block"}} dense={true}>
                        <Link to={`/chat-home/server/${item.id}/`} style={{textDecoration: "none", color: "inherit"}}>
                            <ListItemButton sx={{minHeight: 0}}>
                                <ListItemIcon sx={{minHeight: 0}}>
                                    <ListItemAvatar sx={{minHeight: "50px", justifyContent:"start", alignItems:"center", display:'flex'}}>
                                        <Avatar alt='Server Avatar' src={`${MEDIA_URL}${item.icon}`}>

                                        </Avatar>
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText 
                                    primary={
                                        <Typography 
                                            variant="body2" 
                                            sx={{
                                                fontWeight: 700, 
                                                lineHeight: 1.2, 
                                                textOverflow:"ellipsis",
                                                whiteSpace: "nowrap"
                                            }}
                                        >{item.name}</Typography>
                                    }
                                    secondary={
                                        <Typography 
                                            variant="body2" 
                                            sx={{
                                                fontWeight: 500, 
                                                lineHeight: 1.2, 
                                                color: "textSecondary"
                                            }}
                                        >{item.category}</Typography>
                                    }
                                    sx={{opacity: sideBar ? 1 : 0}}
                                    />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default UserServers