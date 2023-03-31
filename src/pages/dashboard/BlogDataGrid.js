import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Button } from '../../../node_modules/@mui/material/index';
import Swal from 'sweetalert2';
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

const BlogDataGrid = () => {

    const [userList, setUserList] = useState([]);
    // function formatDate(setUserList) {
    //   const date = new Date(setUserList.date);
    //   return date.toLocaleDateString();
    // }
    
  
    const columns = [
          { field: "_id", headerName: "ID", width: 150 },
        
          { 
            field: "date", 
            headerName: "Date", 
            width: 150, 
            valueFormatter: params => new Date(params?.value).toLocaleDateString()
          },
          { field: "heading", headerName: "Heading", width: 200 },
          { field: "content", headerName: "Content", width: 200 },
          { field: "image", headerName: "Image", width: 200 },
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
       ];

    const getBlogFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/blog/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data.result);
        setUserList(data.result);

    };
    useEffect(() => {
        getBlogFromBackend();
      }, [])

      const handleRowSelection = (e) => {
        console.log(e);
      }

      const deleteUser = async (id) => {
        console.log(id);
        const res = await fetch('http://localhost:5000/blog/delete/'+id, {
            method : 'DELETE'
        })

        if(res.status===200){
          getBlogFromBackend();
         Swal.fire({
          icon: "success",
          title: 'Success',
          text: 'Blog Data Deleted Successfully!!'
        })
        }
    }

  return (
    <div style={{height: '20rem'}}>

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

export default BlogDataGrid