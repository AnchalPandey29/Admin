// material-ui
import { Breadcrumbs, Divider, Grid, Link, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';

import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app_config from "../../config";
import AnimateButton from 'components/@extended/AnimateButton';
import * as Yup from "yup";


import {
   FormLabel, 
} from "@mui/material";
import { InputLabel, OutlinedInput,FormControl,  MenuItem, Select, Box, Button  } from '../../../node_modules/@mui/material/index';

const AddCampaign = () => {

  const url = app_config.apiurl;
  const navigate = useNavigate();
  const [selImage, setSelImage] = useState();

  const BlogSubmit = async (formdata, { setSubmitting }) => {
    formdata.image = selImage;
    console.log(formdata);


    // 1. URL
    // 2. request method - get, post, put, delete , etc.
    // 3. Data you want to sent.
    // 4. data format - json, etc.

    setSubmitting(true);
    const res = await fetch("http://localhost:5000/campaign/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.status)
    setSubmitting(false);

    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: 'Success',
        text: 'Campaign Added Successfully'
      })
      navigate('/');
    } else {
      // error alert
    }
  }

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelImage(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };

  return (
  
 

<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card " style={{width:"100vh"}}>
          <div className="card-body">
          <Typography variant="h3" style={{ textAlign: 'center' }}>Add Campaign</Typography>
            <hr />
            <Formik initialValues={{ title: "", content: "", startdate: "", lastdate: "" , image:""}} onSubmit={BlogSubmit}>
             {({ values, handleSubmit, handleChange, isSubmitting }) => (
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
                                        // error={Boolean(touched.email && errors.email)}
                                    />
                                    {/* {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )} */}
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
                                        // error={Boolean(touched.email && errors.email)}
                                    />
                                    {/* {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )} */}
                                </FormControl>
                            </Grid>
                   
                            <Grid item xs={12}>
                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
                                    <OutlinedInput
                                        id="image"
                                        type="file"
                                        onChange={uploadFile}                                        
                                        placeholder="Enter the image"
                                        // error={Boolean(touched.email && errors.email)}
                                    />
                                    {/* {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )} */}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
                            <label  htmlFor="startdate">Start Date</label>

                                    <OutlinedInput
                                        id="startdate"
                                        type="date"                                        
                                        value={values.startdate}
                                        name="startdate"
                                        onChange={handleChange}
                                        fullWidth
                                        // error={Boolean(touched.email && errors.email)}
                                    />
                                    {/* {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )} */}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
                            <label  htmlFor="lastdate">Last Date</label>

                                    <OutlinedInput
                                        id="lastdate"
                                        type="date"                                        
                                        value={values.lastdate}
                                        name="lastdate"
                                        onChange={handleChange}
                                        fullWidth
                                        // error={Boolean(touched.email && errors.email)}
                                    />
                                    {/* {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )} */}
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
        </div>
      </Box>
   
  )
}

export default AddCampaign;