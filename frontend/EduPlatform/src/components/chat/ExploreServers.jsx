import React, {useEffect, useState} from 'react';
import {
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Box, 
    Typography,
    Avatar,
    ListItemAvatar,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent
} from '@mui/material';
import useCrud from '../../hooks/useCrud';
import { Link, useParams } from 'react-router-dom';
import { MEDIA_URL } from '../../config';
import {useTheme} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


const ExploreServers = () => {

    const {categoryName} = useParams();

    const url = categoryName ? `/server/select/?category=${categoryName}` :  '/server/select/'

    const {dataCRUD, isLoading, error, fetchData} = useCrud([], url);

    useEffect(()=>{
        fetchData();
    },[categoryName])


    useEffect(()=>{
        console.log(dataCRUD);
    },[dataCRUD])

    return (
        <>
          <Container maxWidth="lg">
            <Box sx={{ pt: 6 }}>
              <Typography
                variant="h3"
                noWrap
                component="h1"
                sx={{
                  display: {
                    sm: "block",
                    fontWeight: 700,
                    letterSpacing: "-2px",
                    textTransform: "capitalize",
                  },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {categoryName ? categoryName : "Popular Channels"}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                noWrap
                component="h2"
                color="textSecondary"
                sx={{
                  display: {
                    sm: "block",
                    fontWeight: 700,
                    letterSpacing: "-1px",
                  },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {categoryName
                  ? `Channels talking about ${categoryName}`
                  : "Check out some of our popular channels"}
              </Typography>
            </Box>
    
            <Typography
              variant="h6"
              sx={{ pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px" }}
            >
              Recommended Channels
            </Typography>
            <Grid container spacing={{ xs: 0, sm: 2 }}>
              {dataCRUD.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "none",
                      backgroundImage: "none",
                      borderRadius: 3,
                    }}
                  >
                    <Link
                      to={`/chat-home/server/${item.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          item.banner
                            ? `${MEDIA_URL}${item.banner}`
                            : "https://source.unsplash.com/random/"
                        }
                        alt="random"
                        sx={{ display: { xs: "none", sm: "block" } }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          p: 0,
                          "&:last-child": { paddingBottom: 0 },
                        }}
                      >
                        <List>
                          <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 0 }}>
                              <ListItemAvatar sx={{ minWidth: "50px" }}>
                                <Avatar
                                  alt="server Icon"
                                  src={`${MEDIA_URL}${item.icon}`}
                                />
                              </ListItemAvatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  textAlign="start"
                                  sx={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    fontWeight: 700,
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2">
                                  {item.category}
                                </Typography>
                              }
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      );
}

export default ExploreServers