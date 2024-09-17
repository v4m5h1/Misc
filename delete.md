Here's an example of a modern responsive React grid component using Bootstrap, with sorting, searching, and exporting to Excel:
GridComponent.jsx
Jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useCrudOperations } from './crudOperations'; // import CRUD operations
import XLSX from 'xlsx'; // for Excel export

const GridComponent = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [loading, setLoading] = useState(true);

  const { get } = useCrudOperations();

  useEffect(() => {
    const fetchData = async () => {
      const response = await get('/api/data'); // replace with your API endpoint
      const { data, columns } = response;
      setData(data);
      setColumns(columns);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSort = (column) => {
    const direction = sortColumn === column ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filteredData = data.filter((row) => {
      return Object.values(row).some((value) => value.toString().toLowerCase().includes(term.toLowerCase()));
    });
    setData(filteredData);
  };

  const handleSearchByColumn = (event, column) => {
    const term = event.target.value;
    const filteredData = data.filter((row) => {
      return row[column].toString().toLowerCase().includes(term.toLowerCase());
    });
    setData(filteredData);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Grid Component</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="search">
              <Form.Label>Search:</Form.Label>
              <Form.Control type="text" value={searchTerm} onChange={handleSearch} />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleExportToExcel}>
            Export to Excel
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.name}>
                    {column.name}
                    <Button variant="link" onClick={() => handleSort(column.name)}>
                      {sortColumn === column.name ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                    </Button>
                    <Form>
                      <Form.Group controlId={column.name}>
                        <Form.Label>Search by {column.name}:</Form.Label>
                        <Form.Control type="text" onChange={(event) => handleSearchByColumn(event, column.name)} />
                      </Form.Group>
                    </Form>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.name}>{row[column.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {loading ? <p>Loading...</p> : null}
    </Container>
  );
};

export default GridComponent;
crudOperations.jsx (same as before)
Jsx
// ...
API Response
JSON
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "age": 30
    },
    {
      "id": 2,
      "
