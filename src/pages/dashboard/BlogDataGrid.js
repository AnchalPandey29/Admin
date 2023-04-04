import React, { useEffect, useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import {
    Button,
    Modal,
    Box,
    Grid,
    FormControl,
    OutlinedInput,
    InputLabel,
    Select,
    MenuItem
} from '../../../node_modules/@mui/material/index';
import Swal from 'sweetalert2';
import AddBlog from '../components-overview/AddBlog';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { DatePicker, LocalizationProvider } from '../../../node_modules/@mui/lab/index';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { useDemoData } from '@mui/x-data-grid-generator';

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

const BlogDataGrid = () => {
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selBlog, setselBlog] = useState(null);
    // function formatDate(setUserList) {
    //   const date = new Date(setUserList.date);
    //   return date.toLocaleDateString();
    // }

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },

        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            valueFormatter: (params) => new Date(params?.value).toLocaleDateString()
        },
        { field: 'heading', headerName: 'Heading', width: 200 },
        { field: 'content', headerName: 'Content', width: 200 },
        { field: 'image', headerName: 'Image', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    console.log(thisRow._id);
                    return deleteUser(thisRow._id);
                    // return alert(JSON.stringify(thisRow, null, 4));
                };
                return <Button onClick={onClick}>Delete</Button>;
                // return <Button onClick={() => deleteUser(thisRow._id)}>Delete</Button>;
            }
        },
        {
            field: 'action2',
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    console.log(thisRow);
                    // return updateUser(thisRow._id);
                    // return deleteUser(thisRow._id);
                    setselBlog(thisRow);
                    setSelImage(thisRow.image);
                    setOpen(true);
                };

                return <Button onClick={onClick}> Edit</Button>;
            }
        }
    ];

    const getBlogFromBackend = async () => {
        // send request
        const res = await fetch('http://localhost:5000/blog/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result);
        setUserList(data.result);
    };
    useEffect(() => {
        getBlogFromBackend();
    }, []);

    const handleRowSelection = (e) => {
        console.log(e);
    };

    const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/blog/delete/' + id, {
            method: 'DELETE'
        });

        if (res.status === 200) {
            getBlogFromBackend();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Blog Data Deleted Successfully!!'
            });
        }
    };

    const updateUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/Blog/update/' + id, {
            method: 'UPDATE'
        });
        navigate('/pages/components-overview/AddBlog.js');

        if (res.status === 200) {
            getStartupFromBackend();
            toast.success('User Data Updated Successfully!!');
        }
    };

    const uploadFile = (e) => {
        const file = e.target.files[0];
        setSelImage(file.name);
        const fd = new FormData();
        fd.append('myfile', file);
        fetch('http://localhost:5000/util/uploadfile', {
            method: 'POST',
            body: fd
        }).then((res) => {
            if (res.status === 200) {
                console.log('file uploaded');
            }
        });
    };

    const userSubmit = async (formdata, { setSubmitting }) => {
        setSubmitting(true);
        const res = await fetch(`http://localhost:5000/Blog/update/${selBlog._id}`, {
            method: 'PUT',
            body: JSON.stringify(formdata),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(res.status);
        const data = await res.json();
        console.log(data.result);
        setSubmitting(false);

        //pop up
        if (res.status === 200) {
            setOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'You have updated successfully'
            });
        }
    };

    return (
        <div style={{ height: '20rem' }}>
            <Modal
                open={open && selBlog !== null}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ backgroundColor: 'white' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', height: '100vh' }}>
                    <Formik initialValues={selBlog} onSubmit={userSubmit}>
                        {({ values, handleSubmit, handleChange, isSubmitting, errors, touched }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <InputLabel htmlFor="heading">Heading</InputLabel>
                                        <OutlinedInput
                                            id="heading"
                                            type="text"
                                            value={values.heading}
                                            name="heading"
                                            onChange={handleChange}
                                            placeholder="Enter the heading"
                                            fullWidth
                                            inputProps={{
                                                maxLength: 100
                                            }}
                                        />
                                        {errors.heading && touched.heading ? <div>{errors.heading}</div> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <InputLabel htmlFor="content">Content</InputLabel>
                                        <OutlinedInput
                                            id="content"
                                            type="text"
                                            value={values.content}
                                            name="content"
                                            onChange={handleChange}
                                            placeholder="Enter the content"
                                            fullWidth
                                            inputProps={{
                                                maxLength: 500
                                            }}
                                        />
                                        {errors.content && touched.content ? <div>{errors.content}</div> : null}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                        <OutlinedInput id="image" type="file" onChange={uploadFile} placeholder="Enter the heading" />
                                        {errors.image && touched.image ? <div>{errors.image}</div> : null}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl >
                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Date" />
                                            </DemoContainer>
                                        </LocalizationProvider> */}
                                        <OutlinedInput
                                        id="date"
                                        type="date"                                        
                                        value={values.date}
                                        name="date"
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ width: '100vh', marginTop: '20px' }}
                                    />
                                        {errors.date && touched.date ? <div>{errors.date}</div> : null}
                                    </FormControl>
                                </Grid>

                                <FormControl style={{ width: '100vh', marginTop: '20px' }}>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category-select"
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Inspirational">Inspirational</MenuItem>
                                        <MenuItem value="Technology">Technology</MenuItem>
                                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                                        <MenuItem value="Educational">Educational</MenuItem>
                                        <MenuItem value="Consulting">Consulting</MenuItem>
                                        <MenuItem value="Marketing">Marketing</MenuItem>
                                    </Select>
                                    {errors.category && touched.category ? <div>{errors.category}</div> : null}
                                </FormControl>

                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            style={{ width: '100vh', marginTop: '20px' }}
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Submit
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </div>
            </Modal>

            <DataGrid
                // {...userList}
                rows={userList.slice()}
                columns={columns}
                pagination
                getRowId={(obj) => obj._id}
                slots={{
                    toolbar: CustomToolbar
                }}
                checkboxSelection
                onRowSelected={handleRowSelection}
            />
        </div>
    );
};

export default BlogDataGrid;
