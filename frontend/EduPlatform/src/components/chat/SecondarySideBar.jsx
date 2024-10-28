import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import useAxiosWithInterceptor from '../../helpers/jwtintercepter'

const SecondarySideBar = ({children}) => {
    const theme = useTheme();
    const jwtAxios = useAxiosWithInterceptor();

    return (
        <Box sx={{
            minWidth: `${theme.secondarySideBar.width}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            mt: `${theme.primaryAppBar.height}px`,
            borderRight: `1px solid ${theme.palette.divider}`,
            display: {xs: "none", sm: "block"},
            overflow: "auto",
        }}>
            {children}
        </Box>
    )
}

export default SecondarySideBar