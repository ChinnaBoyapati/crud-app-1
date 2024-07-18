import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { URL, apiList, invokeDeleteApi, invokeGetApi } from './apiservises/Api';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../global/actions/actions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Home = () => {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState();
    const [isCourseDelete, setIsCourseDelete] = useState(false);

    const [intialFetching, setIntialFetching] = useState(true);

    const [circularProcess, setCircularProcess] = useState(true);

    // const globalState = useSelector((state) => state);
    // const dispatch = useDispatch();
    // const { userData, userError } = globalState.userReducer;
    // console.log(userData)
    // useEffect(() => {
    //     dispatch(getUser());
    // }, [dispatch]);



    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:6070/courses');
    //             console.log(response.data)
    //             setTableData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     if (intialFetching) {
    //         fetchData();
    //         setIntialFetching(false)
    //     }

    // }, [intialFetching]);

    useEffect(() => {
        const fetchData = async () => {
            let payload = {}
            const response = await invokeGetApi(URL + apiList.getCourse, payload)
            // console.log(URL, apiList.getCourse)
            // console.log(response)
            setTableData(response?.data)
            // setCircularProcess(false)

        }
        setTimeout(() => {
            setCircularProcess(false);
            if (intialFetching) {
                fetchData();
                setIntialFetching(false)
            }
        }, 1000);
      
    }, [intialFetching])

    useEffect(() => {
        const deleteCourse = async () => {
            // console.log(id)
            // await axios.delete("http://localhost:6070/courses/" + courseId);
            // console.log(courseId)
            // console.log(URL + apiList.getCourse + courseId)
            let payload = {}
            await invokeDeleteApi(URL + apiList.getCourse + courseId, payload).then(() => {
                setIntialFetching(true)
                // alert("succesfully deleted")
            })
        }
        if (isCourseDelete) {
            setIntialFetching(true)
            deleteCourse();
            setIsCourseDelete(false);
        }

    }, [isCourseDelete, courseId, intialFetching]);







    return (
        <div>
            <Header serachHeader={true} />

            {circularProcess ? (
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

                <>

                    <Box sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                height: "100px",
                                // border: "1px solid red",
                                width: "90%", display: "flex",
                                justifyContent: "end",
                                alignItems: "center"
                            }}>

                            <Button variant='contained'
                                sx={{
                                    height: "40px"
                                }}
                                onClick={() => {
                                    navigate("/create-course")
                                }}
                            >
                                Create Course +
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center" }}>
                            <Table sx={{ width: { xs: "70%", sm: "100%", md: "80%" } }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Id</StyledTableCell>
                                        <StyledTableCell align="center">Course</StyledTableCell>
                                        <StyledTableCell align="center">Trainer</StyledTableCell>
                                        <StyledTableCell align="center">Description</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData?.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                <Link to={`/course/${row.id}`}>
                                                    #{row.id}
                                                </Link>

                                            </TableCell>
                                            {/* {console.log(row)} */}
                                            <StyledTableCell align="center">{row.course}</StyledTableCell>
                                            <StyledTableCell align="center">{row.trainer}</StyledTableCell>
                                            <StyledTableCell align="left" style={{ maxWidth: "200px" }}>{row.description}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button onClick={() => {
                                                    setCourseId(row.id);
                                                    setIsCourseDelete(true);
                                                    setIntialFetching(true)
                                                }}
                                                // style={{color:"red"}}
                                                >
                                                    <DeleteIcon sx={{ color: "black" }} />
                                                </Button>
                                                <Button onClick={() => {
                                                    navigate(`edit-course/${row.id}`)
                                                }}>
                                                    <BorderColorIcon sx={{ color: "black" }} />
                                                </Button>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>
            )}
        </div>
    );
};

export default Home;
