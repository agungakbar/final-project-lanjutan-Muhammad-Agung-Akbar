import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, Table, TableContainer, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState('All');

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/student');
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching students:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'DELETE',
      });
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
      setFilteredStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.log('Error deleting student:', error);
    }
  };

  const handleFacultyChange = (event) => {
    const faculty = event.target.value;
    setSelectedFaculty(faculty);
    filterStudents(faculty);
  };

  const filterStudents = (faculty) => {
    if (faculty === 'All') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) => student.faculty === faculty);
      setFilteredStudents(filtered);
    }
  };

  const tableContainerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '5px 10px',
    border: 'none',
    backgroundColor: '#e74c3c',
    color: '#fff',
    cursor: 'pointer',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#c0392b',
  };

  return (
    <TableContainer style={tableContainerStyle}>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Table id="table-student" style={tableStyle}>
          <Thead>
            <Tr>
              <Th style={thStyle}>No</Th>
              <Th style={thStyle}>Full Name</Th>
              <Th style={thStyle}>Faculty</Th>
              <Th style={thStyle}>Program Study</Th>
              <Th style={thStyle}>Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStudents.map((student, index) => (
              <Tr key={student.id} className="student-data-row">
                <Td style={tdStyle}>{index + 1}</Td>
                <Td style={tdStyle}>
                  <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                </Td>
                <Td style={tdStyle}>{student.faculty}</Td>
                <Td style={tdStyle}>{student.programStudy}</Td>
                <Td style={tdStyle}>
                  <Button
                    data-testid={`delete-${student.id}`}
                    onClick={() => deleteStudent(student.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Select data-testid="filter" value={selectedFaculty} onChange={handleFacultyChange}>
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
      </Select>
    </TableContainer>
  );
};

export default Student;
