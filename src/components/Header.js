import React, { useEffect, useState } from 'react';
import { Box, InputBase, Menu, MenuItem, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ serachHeader }) => {
    // console.log(serachHeader)
    const [menu, setMenu] = useState(false);
    const nav = useNavigate();

    const [searchItem, setSearchItem] = useState(null)
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchMenu, setSearchMenu] = useState(null)

    useEffect(() => {
        if (serachHeader && searchItem!=null) {
            console.log(searchItem)
            console.log("inside if")
            axios.get('http://localhost:6070/courses')
                .then(response => {
                    setCourses(response.data);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
        }
    }, [searchItem]);

    useEffect(() => {
        console.log(searchItem)
        if (searchItem?.trim() === '') {
            setFilteredCourses([]);
        } else {
            const filtered = courses.filter(course =>
                course.course.toLowerCase().includes(searchItem?.toLowerCase())
            );
            console.log(filtered)
            setFilteredCourses(filtered);
        }
    }, [searchItem, courses]);



    return (
        <>
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    background: "#FCFCFC",
                    zIndex: "100",
                    backgroundColor: "#efefef"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        minHeight: "56px",
                        padding: "24px 24px 0px 24px",
                        gap: "24px",
                        flexWrap: "wrap",
                        width: "calc(100% - 48px)",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: "0px",
                            gap: "30px",
                            order: 0,
                            width: { xs: "48px", sm: "47%", md: "31%" },
                        }}
                    >
                        <Link to="/">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: "0px",
                                    gap: "10px",
                                }}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: "30px",
                                    }}
                                    src="https://www.testyantra.com/sites/default/files/tylog1.png">
                                </Box>
                            </Box>
                        </Link>
                    </Box>

                    {/* Search Bar */}
                    {serachHeader && (
                        <Box sx={{ width: { xs: "100%", sm: "45%", md: "30%" } }}>
                            <InputBase
                                placeholder="Search..."
                                sx={{
                                    width: "100%",
                                    border: "1px solid ",
                                    borderRadius: "10px",
                                    padding: "8px",
                                    height: "40px"
                                }}
                                value={searchItem}
                                onChange={(e) => {
                                    setSearchItem(e.target.value);
                                    setSearchMenu(e.currentTarget);
                                }}
                            // onBlur={() => setSearchMenu(null)} 

                            />

                            <Menu
                                anchorEl={searchMenu}
                                open={Boolean(searchMenu)}
                                onClose={() => setSearchMenu(false)}
                            >
                                {filteredCourses.map(course => (
                                    <MenuItem
                                        key={course.id}
                                        onClick={() => {
                                            setSearchMenu(false);
                                            nav(`course/${course.id}`)
                                        }}
                                    >
                                        {course.course}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}

                    {/* Menu Button */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: { xs: "104px", sm: "47%", md: "31%" },
                        }}
                    >
                        <Button onClick={(e) => {
                            setMenu(e.currentTarget)
                        }}>
                            <Typography
                                sx={{
                                    fontSize: "25px"
                                }}
                            >
                                Menu
                            </Typography>
                        </Button>
                        <Menu
                            anchorEl={menu}
                            open={Boolean(menu)}
                            onClose={() => {
                                setMenu(false)
                            }}
                        >
                            <MenuItem onClick={() => {
                                setMenu(false);
                                nav("/create-course")
                            }}>Create Course</MenuItem>
                            <MenuItem onClick={() => {
                                setMenu(false);
                                nav("/users")
                            }}>Users</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Header;
