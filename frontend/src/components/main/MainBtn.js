import { Avatar, Card, CardActions, Container, Grid, Typography, Box, Paper } from "@mui/material";
import React from "react";

import styled from 'styled-components';
import fullLogo from '../../_assets/fullLogo.png'
import { btnMain } from '../../_css/MainCSSProperties'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from "react-router-dom";
import { shadowWhite } from '../../_css/ReactCSSProperties';


const MainButton = styled.div`
  .css-18g63oc:hover {
    color: #424242 !important;
    background-color: transparent;
    transition-duration: 0.2s;
    cursor: pointer;
  }
  > a:visited {
    color: black;
    text-decoration: none;
  }
`;

export default function MainBtn() {
    const navigate = useNavigate();
    const goLobby = () => {
        navigate("/lobby");
    }
    const goInfo = () => {
        navigate("/info");
    }

    return (
        <Container fixed sx={{ width: 1000 }}>
            <Box sx={{
                pt: 10,
                // '&:hover': {
                //   backgroundColor: 'primary.main',
                //   opacity: [0.9, 0.8, 0.7],
                // },
            }}>
                <Paper sx={{ bgcolor: shadowWhite, height: 647, display: 'flex', justifyContent: 'center', boxShadow: `0 0 5px 5px ${shadowWhite}` }}>
                    <Grid>
                        <Avatar src={fullLogo} sx={{ pb: 3, height: 400, width: 'auto' }}></Avatar>
                        <MainButton>
                            <Card sx={btnMain} onClick={goLobby}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%", height: "100%" }}>
                                    <Box>
                                        게임하러 가기
                                    </Box>
                                    <Box sx={{ pt: 1 }}>
                                        <KeyboardDoubleArrowRightIcon fontSize="large" />
                                    </Box>
                                </Box>
                            </Card>
                            <br />
                            <Card sx={btnMain} onClick={goInfo}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: "100%", height: "100%" }}>
                                    <Box>
                                        게임 방법
                                    </Box>
                                    <Box sx={{ pt: 1 }}>
                                        <KeyboardDoubleArrowRightIcon fontSize="large" />
                                    </Box>
                                </Box>
                            </Card>
                        </MainButton>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
}