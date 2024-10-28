import React from 'react'
import { Outlet } from 'react-router-dom'
import createMuiTheme from '../theme/theme'
import { ThemeProvider } from '@emotion/react'

const ChatMainLayout = () => {
    const theme = createMuiTheme();

    return (
        <ThemeProvider theme={theme}>
            <Outlet/>
        </ThemeProvider>
  )
}

export default ChatMainLayout