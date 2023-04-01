
import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Button, Modal, Box } from '../../../node_modules/@mui/material/index';
import { Navigate, useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import {Formik} from 'formik';
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

const StartupDataGrid = () => {

  const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selStartup, setSelStartup] = useState(null);
    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 100,
    //     maxColumns: 6,
    //   });
    //   console.log(data);

    const columns = [
          { field: "_id", headerName: "ID", width: 150 },
          { field: "email", headerName: "Email Address", width: 150 },
          { field: "name", headerName: "Name", width: 140 },
          { field: "ownername", headerName: "Founder name", width: 130 },
          { field: "tel", headerName: "Contact", width: 130 },
          { field: "city", headerName: "City", width: 120 }, 
          { field: "aadhar", headerName: "Aadhar no", width: 150 },         
          { field: "productdescription", headerName: "Product/Service Detail", width: 200 },
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

            };
        
              return <Button onClick={onClick}>Delete</Button>
            }
              
          },
          {
            field: "action2",
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
                  return setSelStartup(thisRow);
                // return deleteUser(thisRow._id);

            };
        
              return <Button onClick={onClick}> Edit</Button>
            }
              
          },

          // {
          //   field: "action",
          //   headerName: "Update",
          //   sortable: false,
          //   renderCell: (params) => {
          //     const onUpdate = (e) => {
          //       e.stopPropagation(); // don't select this row after clicking
        
          //       const api = params.api;
          //       const thisRow = {};
        
          //       api
          //         .getAllColumns()
          //         .filter((c) => c.field !== "__check__" && !!c)
          //         .forEach(
          //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          //         );
        
          //         console.log(thisRow._id);
          //       return updateUser(thisRow._id);

          //   };
        
          //     return <Button onClick={onUpdate}>Update</Button>
          //   }
              
          // },


     
        ];

    const getStartupFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/startup/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result.filter(obj => obj.role === 'startup'));
        setUserList(data.result.filter(obj => obj.role === 'startup'));
    };
    useEffect(() => {
        getStartupFromBackend();
      }, [])


      const handleRowSelection = (e) => {
        console.log(e);
      }

     

      const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/startup/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getStartupFromBackend();
          Swal.fire({
            icon: "success",
            title: 'Success',
            text: 'Startup Data Deleted Successfully!!'
          })        }
    }


    const updateUser = async (id) => {
      console.log(id);
      const res = await fetch('http://localhost:5000/startup/update/'+id, {
          method : 'UPDATE',
 
      })
      navigate('/pages/dashboard/startup/register');

      if(res.status===200){
        getStartupFromBackend();
          toast.success('User Data Updated Successfully!!');
      }
  }

  const userSubmit = async (formdata, { setSubmitting }) => {
    
    setSubmitting(true);
    const res = await fetch(`http://localhost:5000/startup/update/${formdata._id}`, {
      method: "PUT",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.status);
    setSubmitting(false);

    //pop up
    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have updated successfully",
      });

      
  };

}

  return (
    <div style={{height: '20rem'}}>
      <Modal
        open={open && selStartup !==null}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
        <Formik
                initialValues={selStartup}
                // validationSchema={SignupSchema} // Add the validation schema here
                onSubmit={userSubmit}
              >
                {({
                  values,
                  handleSubmit,
                  handleChange,
                  isSubmitting,
                  errors,
                  touched,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {/* 2 column grid layout with text inputs for the first and last names */}
                    <div className="row form-floating" onSubmit={handleSubmit}>
                      <div className="col">
                        <div className="form-outline mb-4">
                          <MDBInput
                            label="Name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            name="name"
                          />
                          {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <MDBInput
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </div>

                    {/* Password input */}
                    <div className="form-outline mb-4">
                      <MDBInput
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                      ) : null}
                    </div>
                    <div>
                      <FormControl className="ps-3 pb-4">
                        <FormLabel id="demo-radio-buttons-group-label">
                          Role
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="startup"
                          onChange={(e, v) => setSelRole(v)}
                          value={selRole}
                        >
                          <div className="">
                            <FormControlLabel
                              value="startup"
                              control={<Radio />}
                              label="Startup"
                            />
                            <FormControlLabel
                              value="investor"
                              control={<Radio />}
                              label="Investor"
                            />
                            <FormControlLabel
                              value="user"
                              control={<Radio />}
                              label="Common User"
                            />
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>

                   
                    <div>
                      <button
                        className="btn"
                        type="submit"
                        style={{
                          backgroundColor: "#9c3353",
                          color: "#fffefe",
                          width: "100%",
                        }}
                      >
                        Submit
                      </button>
                    </div>
                    
                  </form>
                )}
              </Formik>
        </Box>
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
        />
        </div>
  )
}

export default StartupDataGrid