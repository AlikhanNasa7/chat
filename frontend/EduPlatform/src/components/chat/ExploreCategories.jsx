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
import {useTheme} from '@mui/material';

const ExploreCategories = () => {

    const theme = useTheme();

    const {dataCRUD, isLoading, error, fetchData} = useCrud([], "/categories");

    useEffect(()=>{
        fetchData();
    }, []);

    useEffect(()=>{
        console.log(dataCRUD);
    },[dataCRUD]);

    return (
        <>
            <Box sx={{
                height: "50px",
                display: "flex",
                alignItems: "center",
                px: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                ...theme.typography.body1
            }}>
                Explore
            </Box>
            <List>
                {isLoading && (<Typography>Loading</Typography>)}
                {!isLoading && dataCRUD.map(item=>(
                    <ListItem key={item.id} disablePadding sx={{display: "block"}} dense={true}>
                        <Link to={`/chat-home/explore/${item.name}/`} style={{textDecoration: "none", color: "inherit"}}>
                            <ListItemButton sx={{minHeight: 48}}>
                                <ListItemIcon sx={{minHeight: 0, justifyContent: "center"}}>
                                    <ListItemAvatar sx={{minHeight: "0px"}}>
                                        <img 
                                            alt='Server Icon'
                                            src={`${MEDIA_URL}${item.icon}`}
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                display: "block",
                                                margin: "auto"
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={
                                        <Typography 
                                            variant='body1' 
                                            textAlign="start"
                                            paddingLeft={1}
                                        >
                                            {item.name}
                                        </Typography>}
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default ExploreCategories