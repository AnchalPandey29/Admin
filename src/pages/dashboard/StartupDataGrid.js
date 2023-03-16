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

    const [userList, setUserList] = useState([]);
    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 100,
    //     maxColumns: 6,
    //   });
    //   console.log(data);

    const columns = [
          { field: "_id", headerName: "ID", width: 150 },
          { field: "email", headerName: "Email Address", width: 150 },
          { field: "name", headerName: "Name", width: 200 },
          { field: "created_at", headerName: "Date of creation", width: 200 },
          { field: "tel", headerName: "Contact", width: 200 },
          { field: "city", headerName: "City", width: 200 },
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

                return alert(JSON.stringify(thisRow, null, 4));
              };
        
              return <Button onClick={onClick}>Click</Button>;
            }
          },

      //     {
      //       field: "email",
      //       headerName: "Email",
      //       width: 250,
      //     },
      //     {
      //       field: "password",
      //       headerName: "Password",
      //       width: 150,
      //     },
      //     {
      //       field: "profile",
      //       headerName: "View Profile",
      //       width: 130,
      //     },
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

  return (
    <div style={{height: '20rem'}}>

    <DataGrid
        // {...userList}
        rows={userList.slice(2)}
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