import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { useParams } from 'react-router-dom'
import useCrud from '../../hooks/useCrud'
import {Box, ListItem, Typography, List, ListItemAvatar, Avatar, ListItemText, TextField} from '@mui/material'
import MessageInterfaceChannels from './MessageInterfaceChannels'
import { useTheme } from '@emotion/react'
import {Send} from '@mui/icons-material'
import Scroll from './Scroll'
import { useAuth } from '../../context/AuthContext'
import useChatService from '../../context/chatService'


const MessageInterface = ({serverData}) => {

    const {serverId, channelId} = useParams();

    const theme = useTheme();


    console.log(serverId, channelId);

    const {message, messages, setMessage, sendJsonMessage} = useChatService(serverId || "", channelId || "");

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        /*const currentTimeZoneOffsetInMinutes = date.getTimezoneOffset();
        const locationDateInMilliseconds = date.valueOf(timestamp) - currentTimeZoneOffsetInMinutes * 60 * 1000;
        const locationDate = new Date(locationDateInMilliseconds)*/

        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };

        const formattedDate = date.toLocaleString('default', options);
        return formattedDate;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendJsonMessage({
          type: "message",
          message,
        });
        setMessage("");
      };

    return (
        <>
            <MessageInterfaceChannels data={serverData}/>
            {channelId == undefined ? (
                <Box sx={{
                    overflow: "hidden", p: {xs: 0}, display: "flex", justifyContent: "center", alignItems: "center", height: 'calc(80vh)'
                }}>
                    <Box sx={{textAlign: "center"}}>
                        <Typography variant='h4' fontWeight={700} letterSpacing={"-0.5px"} sx={{
                            maxWidth: "600px",
                            px: 5
                        }}>
                            Welcome to {serverData.name}
                        </Typography>
                        <Typography variant='h6'>
                            {serverData.description ?? "This is our home"}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <>
                    <Box sx={{overflow: "hidden", p:0, height: 'calc(100vh - 190px)', }}>
                        <Scroll>
                            <List sx={{innerWidth: "100%", bgcolor: "background.paper"}}>
                                {messages.map((msg, index)=>{
                                    return (
                                        <ListItem key={index} alignItems='flex-start' sx={{justifyContent:"space-between"}}>
                                            <Box sx={{display: "flex", justifyContent: "flex-start", flexGrow: 1}}>
                                                <ListItemAvatar>
                                                    <Avatar src={msg.icon} alt="user image"/>
                                                </ListItemAvatar>
                                                <Box>
                                                    <Typography sx={{fontSize: "18px"}}>
                                                        {msg.sender}
                                                    </Typography>
                                                    <Typography sx={{display: "inline", fontSize: "16px", overflow: "visible", textOverflow: "clip", lineHeight: 1.2, fontWeight: 400, letterSpacing: "-1px"}}>
                                                        {msg.content}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                                <Typography sx={{fontWeight: 400, fontSize: "12px", alignSelf: "flex-end"}} color="textSecondary">
                                                    {formatTimestamp(msg.created_at)}
                                                </Typography>
                                            <Box>

                                            </Box>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Scroll>
                    </Box>
                    <Box sx={{position: "sticky", bottom: 0, width: "100%" }}>
                        <form 
                            className='bottom-0 right-0 z-[1] p-4' 
                            style={{backgroundColor: `${theme.palette.background.default}`}}
                            onSubmit={handleSubmit}
                        >
                            <Box sx={{display: "flex"}}>
                                <TextField 
                                    fullWidth 
                                    multiline 
                                    minRows={1} 
                                    maxRows={4} 
                                    sx={{flexGrow: 1}} 
                                    onKeyDown={(e)=> e.key=='Enter' && handleSubmit(e)}
                                    onChange={(e)=>setMessage(e.target.value)}
                                    value={message}
                                />
                            </Box>
                        </form>
                    </Box>
                </>
            )}
        </>
    )
}

export default MessageInterface