import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { URL, apiList, invokeGetApi } from './apiservises/Api';

const CourseView = () => {
    const { id } = useParams();
    const [courseData, setCourseData] = useState(null);
    const navigate = useNavigate();
    const [chefData, setChefData] = useState()

    // useEffect(() => {
    //     const fetchCourseData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:6070/courses/${id}`);
    //             setCourseData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching course data:', error);
    //         }
    //     };

    //     fetchCourseData();
    // }, [id]);

    useEffect(() => {

        const fetchCourseData = async () => {
            const response = await invokeGetApi(URL + apiList.getCourse + id)
            console.log(URL + apiList.getCourse, id)
            setCourseData(response.data);
            console.log(response.data);
        }
        fetchCourseData()
    }, [])



    return (
        <>
            <Header />
            <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                {courseData && (
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {courseData.course}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Trainer: {courseData.trainer}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Description: {courseData.description}
                            </Typography>

                            <Button variant='contained' color='error' onClick={() => {
                                navigate("/")
                            }}>Back</Button>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </>
    );
}

export default CourseView;
