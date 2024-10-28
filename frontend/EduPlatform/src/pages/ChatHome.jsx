import React from 'react'
import {Box, CssBaseline} from '@mui/material'
import PrimaryAppBar from '../components/chat/PrimaryAppBar'
import PrimarySidebar from '../components/chat/PrimarySidebar'
import SecondarySideBar from '../components/chat/SecondarySideBar'
import Main from '../components/chat/Main'
import PopularChannels from '../components/chat/PopularChannels'
import ExploreCategories from '../components/chat/ExploreCategories'
import ExploreServers from '../components/chat/ExploreServers'
const ChatHome = () => {
    console.log(134)
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <PrimaryAppBar/>
            <PrimarySidebar>
                <PopularChannels/>
            </PrimarySidebar>
            <SecondarySideBar>
                <ExploreCategories/>
            </SecondarySideBar>
            <Main>
                <ExploreServers/>
            </Main>
        </Box>
    )
}

export default ChatHome