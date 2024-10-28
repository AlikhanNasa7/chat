import React from 'react'
import {createTheme, responsiveFontSizes} from '@mui/material'


const createMuiTheme = () => {
    let theme = createTheme({

        typography: {
            fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
            body1:{
                fontWeight: 600,
                letterSpacing: "-0.5px"
            },
            body2:{
                fontWeight: 500,
                letterSpacing: "-0.5px"
            }
        },
        primaryAppBar: {
            height: 50
        },
        primarySideBar: {
            width: 240,
            closed: 70
        },
        secondarySideBar: {
            width: 240
        },
        main: {
            textFieldHeight: 50
        },
        components: {
            MuiAppBar: {
                defaultProps:{
                    color: "default",
                    elevation: 0
                }
            }
        }
    });
    theme = responsiveFontSizes(theme);

    return theme;
}

export default createMuiTheme;



