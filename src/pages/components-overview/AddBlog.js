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
import * as Yup from "yup";
import AnimateButton from 'components/@extended/AnimateButton';


import {
   FormLabel, 
} from "@mui/material";
import { InputLabel, OutlinedInput,FormControl,  MenuItem, Select, Box, Button  } from '../../../node_modules/@mui/material/index';

const AddBlog = () => {

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
    const res = await fetch('http://localhost:5000/blog/add', {
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
        text: 'Blog Added Successfully'
      })
      navigate('/');
    } else {
      // error alert
    }
  }

  const Schema = Yup.object().shape({
   

    heading: Yup.string().required("Heading is required"),
    content: Yup.string().required("Content is required"),
    date: Yup.string().required("Date is required"),
    
  });

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
          <Typography variant="h3" style={{ textAlign: 'center' }}>Add Blog</Typography>
            <hr />
            <Formik initialValues={{ heading: "", content: "",image:"" , date:""}}
                        validationSchema={Schema}//Validation Schema
            onSubmit={BlogSubmit}>
             {({ values, handleSubmit, handleChange, isSubmitting,errors, touched}) => (
               <form onSubmit={handleSubmit} >
                 <Grid item xs={12}>
                 <FormControl style={{ width: '100vh' ,marginTop:"20px"}}>
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
                                          maxLength: 100,
                                        }}
                                    />
                                   {errors.heading && touched.heading  ? <div>{errors.heading }</div> : null}

                                    
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
                                          maxLength: 500,
                                        }}
                                    />
                     {errors.content && touched.content  ? <div>{errors.content }</div> : null}

                                </FormControl>
                            </Grid>
                   
                            <Grid item xs={12}>
                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
                                    <OutlinedInput
                                        id="image"
                                        type="file"
                                        onChange={uploadFile}                                        
                                        placeholder="Enter the heading"
                                    />
                            {errors.image && touched.image  ? <div>{errors.image }</div> : null}

                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
                                    <OutlinedInput
                                        id="date"
                                        type="date"                                        
                                        value={values.date}
                                        name="date"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                         {errors.date && touched.date  ? <div>{errors.date }</div> : null}

                                </FormControl>
                            </Grid>

                            <FormControl style={{ width: '100vh',marginTop:"20px" }}>
  <InputLabel id="category-label">Category</InputLabel>
  <Select
    labelId="category-label"
    id="category-select"
    name="category"
    value={values.category}
    onChange={handleChange}
  >
    <MenuItem value=""><em>None</em></MenuItem>
    <MenuItem value="Inspirational">Inspirational</MenuItem>
    <MenuItem value="Technology">Technology</MenuItem>
    <MenuItem value="Entertainment">Entertainment</MenuItem>
    <MenuItem value="Educational">Educational</MenuItem>
    <MenuItem value="Consulting">Consulting</MenuItem>
    <MenuItem value="Marketing">Marketing</MenuItem>
  </Select>
</FormControl>
                 
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

export default AddBlog;