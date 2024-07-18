import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../global/actions/actions';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box
} from '@mui/material';
import Header from '../components/Header';

const Users = () => {
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const { userData } = globalState.userReducer;
    console.log(globalState.userReducer)

    const [intialFetching, setIntialFetching] = useState(true)

    useEffect(() => {
        dispatch(getUser());
       setTimeout(() => {
            setIntialFetching(false)
        }, 1000);
    }, [dispatch]);

    return (
        <>
            <Header />
            {intialFetching ? (
                <Box
                    sx={{
                        height: "500px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // border: "1px solid red",

                    }}
                >
                    <CircularProgress sx={{ margin: "auto", }} />
                </Box>
            ) : (

                <Container maxWidth="lg" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                    <Grid container spacing={3}>
                        {userData?.map(user => (
                            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                                <Card
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s ease',
                                        ':hover': {
                                            transform: 'scale(1.03)',
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                                        },
                                    }}
                                >
                                    <CardContent style={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={user.image}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                style={{ height: "30px", borderRadius: '50%', marginRight: '1rem' }}
                                            />
                                            {user.firstName} {user.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Age: {user.age}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Gender: {user.gender}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Email: {user.email}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}
        </>
    );
};

export default Users;
