import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import * as XLSX from 'xlsx';
import { ClipLoader } from 'react-spinners';
import '../App.css'


const Allrequests = () => {
  const [tableData, setTableData] = useState([]);
  const [columnKeys, setColumnKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secTableData, setSectableData] = useState([]);
  DataTable.use(DT);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
      const responseData = await response.json();
      if (responseData.length > 0) {
        const firstItem = responseData[0];
        const allowedKeys = ['id', 'body', 'email'];
        const generatedColumns = [];
        const filteredData = responseData.map(item => {
          const filteredItem = {};
          allowedKeys.forEach(key => {
            if (key in item) {
              filteredItem[key] = item[key];
            }
          });
          return filteredItem;
        });

        setTableData(filteredData);

        allowedKeys.forEach(key => {
          if (key in firstItem) {
            const customTitle = key.toUpperCase();
            generatedColumns.push({ data: key, title: customTitle });
          }
        });

        setColumnKeys(generatedColumns);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'postexcel');
    XLSX.writeFile(wb, 'postexcel.xlsx');
  };

  return (
    <div className='m-10'>
      {/* <div className='flex items-center w-10 border-2 cursor-pointer border-grey-500' onClick={exportToExcel}>
                <PiMicrosoftExcelLogoFill color="green" fontSize="3em" />
            </div> */}

      {loading ? (
        <div className="flex items-center justify-center w-full">
          <ClipLoader data-testid="loading-spinner" loading={true} size={50} color="#123abc" />
        </div>
      ) : (
        <DataTable
          data={tableData}
          columns={columnKeys}
          className="display"
          options={{
            responsive: true,
            select: true,
          }}
        />

      )}
    </div>
  );
};

export default Allrequests;
