import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { URL, apiList, invokedPostApi, invokedPutApi } from './apiservises/Api';


const CreateCourse = () => {

    const [trainer, setTrainer] = useState("");
    const [course, setCourse] = useState("");
    const [description, setDescription] = useState("");
    const nav = useNavigate()

    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        console.log("inside effect")
        const editCourse = async () => {
            await axios.get("http://localhost:6070/courses/" + id).then((res) => {
                setTrainer(res.data.trainer)
                setCourse(res.data.course)
                setDescription(res.data.description)
                console.log(res)
            })
        };
        if (id) {
            editCourse()
        }
    }, [])


    const updateCourse = async () => {
        console.log("inside update")
        const payload = {
            uuidv4,
            trainer,
            course,
            description
        }
        // await axios.put("http://localhost:6070/courses/" + id, payload).then(() => {
        //     nav("/")
        // })

        await invokedPutApi(URL + apiList.getCourse + id, payload).then(() => {
            nav("/")
        })
    }


    const handleSubmit = async () => {
        const payload = {
            id: uuidv4,
            trainer: trainer,
            course: course,
            description: description
        }
        // await axios.post("http://localhost:6070/courses", payload).then(() => {
        //     toast.success("Course Created Succesfully");
        //     nav("/")

        // }).then(() => {
        // })
        await invokedPostApi(URL + apiList.getCourse, payload).then((res) => {
            // console.log(res)
            nav("/")
        })
        console.log(URL + apiList.getCourse, payload)
    }



    return (
        <>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 56px)',
                    padding: '24px',
                }}
            >
                <form
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '24px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        background: '#fff',
                    }}
                >
                    <TextField
                        fullWidth
                        label="Trainer Name"
                        variant="outlined"
                        margin="normal"
                        value={trainer}
                        onChange={(e) => {
                            setTrainer(e.target.value)
                        }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Course Name"
                        variant="outlined"
                        margin="normal"
                        value={course}
                        onChange={(e) => {
                            setCourse(e.target.value)
                        }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        onClick={() => {
                            if (id) {
                                updateCourse()
                            }
                            else {
                                handleSubmit();

                            }
                        }}
                    >
                        {id ? 'Update' : 'Create'}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        onClick={() => {
                            nav('/')
                        }}
                    >
                        Back
                    </Button>
                </form>
            </Box>
        </>
    );
};

export default CreateCourse;
