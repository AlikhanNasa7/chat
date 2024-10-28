import React from 'react'
import {Box, CssBaseline} from '@mui/material'
import PrimaryAppBar from './PrimaryAppBar'
import PrimarySidebar from './PrimarySidebar'
import SecondarySideBar from './SecondarySideBar'
import Main from './Main'
import PopularChannels from './PopularChannels'
import ExploreCategories from './ExploreCategories'
import MessageInterface from './MessageInterface'
import ServerChannels from './ServerChannels'
import UserServers from './UserServers'
import { useParams, useNavigate } from 'react-router-dom'
import useCrud from '../../hooks/useCrud'
import { useState, useEffect, useMemo } from 'react'

const Server = () => {
    const { serverId, channelId } = useParams();

    const { dataCRUD, isLoading: isServersLoading, error: serversError, fetchData: fetchServers } = useCrud([], `/server/select/`);
    const navigate = useNavigate();

    const [serverData, setServerData] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

    console.log(dataCRUD);
    console.log(serverData);


    useEffect(() => {
        fetchServers();
    }, []); 

    // Handle errors
    useEffect(() => {
        if (serversError) {
            navigate("/");  
        }
    }, [serversError, navigate]); 


    useEffect(() => {
        if (!isServersLoading && dataCRUD.length > 0) { 
            const currentServer = dataCRUD.find(server => server.id === parseInt(serverId));
        if (currentServer) {
            setServerData(currentServer);
            setDataFetched(true);
        } else {
            navigate("/");  
        }
        }
    }, [isServersLoading, dataCRUD, serverId, navigate]);

    const isChannel = () => {
        if (!channelId) return true;
        return serverData?.channels.some(channel => channel.id === parseInt(channelId));
    };


    useEffect(() => {
        if (serverData && !isChannel()) {
            navigate(`/chat-home/server/${serverId}`);
        }
    }, [channelId, serverData, navigate, serverId]); 

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            {dataFetched && (
                <>
                    <PrimarySidebar>
                        <UserServers sideBar={false} dataCRUD={dataCRUD} isLoading={isServersLoading}/>
                    </PrimarySidebar>
                    <SecondarySideBar>
                        {dataFetched && <ServerChannels serverData={serverData} isLoading={isServersLoading}/>}
                    </SecondarySideBar>
                    <Main>
                        <MessageInterface serverData={serverData}/>
                    </Main>
                </>
            )}
        </Box>
    )
}

export default Server