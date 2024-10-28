import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const PrimarySidebarHeader = ({handleHeader, isOpen}) => {
  return (
    <Box sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <IconButton onClick={handleHeader}>
            {isOpen && <ChevronLeft/>}
            {!isOpen && <ChevronRight/>}
        </IconButton>
    </Box>
  )
}

export default PrimarySidebarHeader