import React from 'react'
import {Box, Typography} from '@mui/material'
import { useTheme } from '@emotion/react'

const Main = ({children}) => {
    const theme = useTheme();

    return (
        <Box sx={{
            flexGrow: 1,
            mt: `${theme.primaryAppBar.height}px`,
            height: `calc(100vh - ${theme.primarySideBar.height}px)`,
            overflow: "hidden"
        }}>
            {children}
        </Box>
    )
}

export default Main