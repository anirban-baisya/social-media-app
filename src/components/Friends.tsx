import { Box } from '@mui/material'
import React from 'react'
import MuiNavbar from './MuiNavbar'
import Rightbar from './Rightbar'

export default function Friends() {
    return (
        <>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <MuiNavbar />
                <Rightbar />

            </Box>
        </>
    )
}
