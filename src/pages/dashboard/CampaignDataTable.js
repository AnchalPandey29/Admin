import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import { Button, Modal, Box, Grid, FormControl, OutlinedInput,InputLabel, Select,
  MenuItem } from '../../../node_modules/@mui/material/index';
  import Swal from 'sweetalert2';
import AddCampaign from '../components-overview/AddCampaign';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { DatePicker, LocalizationProvider } from '../../../node_modules/@mui/lab/index';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { useDemoData } from '@mui/x-data-grid-generator';
const CustomToolbar =  () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const CampaignDataGrid = () => {

    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selCampaign, setselCampaign] = useState(null);
    const [selImage, setSelImage] = useState('');
  
    const columns = [
          { field: "_id", headerName: "ID", width: 150 },

          { field: "startdate", headerName: "Start Date", width: 100 ,
          valueFormatter: params => new Date(params?.value).toLocaleDateString()
        },
          { field: "lastdate", headerName: "Last Date", width: 100,
          valueFormatter: params => new Date(params?.value).toLocaleDateString()
        },
          { field: "title", headerName: "Title", width: 200 },
          { field: 'content', headerName: 'Content', width: 200 },
          { field: "image", headerName: "Image", width: 100 },
          {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
        
                const api = params.api;
                const thisRow = {};
        
                api
                  .getAllColumns()
                  .filter((c) => c.field !== "__check__" && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                  );
        
                  console.log(thisRow._id);
                  return deleteUser(thisRow._id);
               // return alert(JSON.stringify(thisRow, null, 4));
              };
              return <Button onClick={onClick}>Delete</Button>
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
                  
                    setselCampaign(thisRow);
                    setOpen(true);
                };

                return <Button onClick={onClick}> Edit</Button>;
            }
        }
       ];

    const getCampaignFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/Campaign/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result);
        setUserList(data.result);

    };
    useEffect(() => {
        getCampaignFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      };

      const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/Campaign/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getCampaignFromBackend();
          Swal.fire({
            icon: "success",
            title: 'Success',
            text: 'Campaign Data Deleted Successfully!!'
          })        }
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
  formdata.image = selImage;
  setSubmitting(true);
  const res = await fetch(`http://localhost:5000/Campaign/update/${selCampaign._id}`, {
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
    <div style={{height: '20rem'}}>
      <Modal
       open={open && selCampaign !== null}
       onClose={() => setOpen(false)}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
       style={{ backgroundColor: 'white' }}>

       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', height: '100vh' }}>
      
       <Formik initialValues={selCampaign} onSubmit={userSubmit}>
             {({ values, handleSubmit, handleChange, isSubmitting , errors, touched}) => (
               <form onSubmit={handleSubmit} >
                 <Grid item xs={12}>
                 <FormControl style={{ width: '100vh' ,marginTop:"20px"}}>
                                    <InputLabel htmlFor="heading">Heading</InputLabel>
                                    <OutlinedInput
                                        id="title"
                                        type="text"
                                        value={values.title}
                                        name="title"
                                        onChange={handleChange}
                                        placeholder="Enter the heading"
                                        fullWidth
                                        
                                    />
                                    
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
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
                                    
                                </FormControl>
                            </Grid>
                 
                   
                            <Grid item xs={12}>
                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
                                    <OutlinedInput
                                        id="image"
                                        type="file"
                                        onChange={uploadFile}                                        
                                        placeholder="Enter the image"
                                    />
                                    
                                </FormControl>
                            </Grid>

                            
                            <Grid item xs={12}>
                            <FormControl >
                           < LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label=" Start Date" />
                                </DemoContainer>
                            </LocalizationProvider>
                           

                            <label style={{marginBottom:"-20px",marginTop:"10px"}} htmlFor="startdate">Start Date</label>

                                    <OutlinedInput
                                        id="startdate"
                                        type="date"                                        
                                        value={values.startdate.slice(0, 10)}
                                        name="startdate"
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ width: '100vh', marginTop: '20px' }}
                                        // error={Boolean(touched.email && errors.email)}
                                    />
                                    {/* {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )} */}
                                    {errors.startdate && touched.startdate ? <div>{errors.startdate}</div> : null}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                            <FormControl >
                           < LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="last Date" />
                                </DemoContainer>
                            </LocalizationProvider>
                           

                            <label style={{marginBottom:"-20px",marginTop:"10px"}} htmlFor="lastdate">Last Date</label>

                                    <OutlinedInput
                                        id="lastdate"
                                        type="date"                                        
                                        value={values.lastdate.slice(0, 10)}
                                        name="lastdate"
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ width: '100vh', marginTop: '20px' }}
                                    />
                                    
                                    {errors.lastdate && touched.lastdate ? <div>{errors.lastdate}</div> : null}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                    style={{ width: '100vh',marginTop:"20px" }}
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
        columns = {columns}
        pagination
        getRowId={obj => obj._id}
        slots={{
          toolbar: CustomToolbar,
        }}
        checkboxSelection
        onRowSelected={handleRowSelection}
        
        />
        </div>
  )
}

export default CampaignDataGrid