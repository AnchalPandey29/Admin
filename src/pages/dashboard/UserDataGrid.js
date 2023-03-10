import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const UserDataGrid = () => {

    const [userList, setUserList] = useState([]);
    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 100,
    //     maxColumns: 6,
    //   });
    //   console.log(data);

    const getBlogFromBackend = async () => {
        // send request 
        const res= await fetch('http://localhost:5000/startup/getall');

        // accessing data from response
        const data = await res.json();

        console.log(data);
        setUserList(data.result.map(obj => obj.role === 'startup'));

    };
    useEffect(() => {
        getBlogFromBackend();
      }, [])

  return (
    <DataGrid
        // {...userList}
        rows={userList}
        getRowId={obj => console.log(obj)}
        columns = {['name', 'email']}
        slots={{
          toolbar: GridToolbar,
        }}
      />
  )
}

export default UserDataGrid