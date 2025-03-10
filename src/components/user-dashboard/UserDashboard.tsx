"use client"

import React from 'react'
import { useState } from "react"
import { Box, IconButton, useTheme, useMediaQuery, Button } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import Sidebar from "./sidebar"
import Link from "next/link"
import Main from './main'

const UserDashboard = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [open, setOpen] = useState(false)
  
    const handleDrawerToggle = () => {
      setOpen(!open)
    }

    return (
        <Box sx={{ display: "flex" }}>
            {/* <Sidebar open={open} onToggle={handleDrawerToggle} /> */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 0,
                    width: { md: `calc(100% - ${280}px)` },
                    minHeight: "100vh",
                }}
            >
                {isMobile && (
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            zIndex: 1100,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Main />

                {/* Thêm nút chuyển đến trang USDC Transfer */}
                {/* <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
                    <Link href="/transfer" passHref style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "24px",
                                px: 3,
                                py: 1.5,
                                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                            }}
                        >
                            Go to USDC Transfer
                        </Button>
                    </Link>
                </Box> */}
            </Box>
        </Box>
    )
}

export default UserDashboard