import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [programStudy, setProgramStudy] = useState('');

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`http://localhost:3001/student/${id}`);
      const data = await response.json();
      setStudent(data);
      setFullname(data.fullname);
      setAddress(data.address);
      setPhoneNumber(data.phoneNumber);
      setBirthDate(data.birthDate);
      setGender(data.gender);
      setProgramStudy(data.programStudy);
    } catch (error) {
      console.log('Error fetching student:', error);
    }
  };

  const programStudiToFacultyMap = {
    'Manajemen': 'Fakultas Ekonomi',
    'Ekonomi': 'Fakultas Ekonomi',
    'Administrasi Bisnis': 'Fakultas Ilmu Sosial dan Politik',
    'Hubungan Internasional': 'Fakultas Ilmu Sosial dan Politik',
    'Teknik Sipil': 'Fakultas Teknik',
    'Arsitektur': 'Fakultas Teknik',
    'Fisika': 'Fakultas Teknologi Informasi dan Sains',
    'Informatika': 'Fakultas Teknologi Informasi dan Sains',
    'Matematika': 'Fakultas Teknologi Informasi dan Sains',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedStudent = {
        fullname,
        address,
        phoneNumber,
        birthDate,
        gender,
        programStudy,
        faculty: programStudiToFacultyMap[programStudy],
      };

      const response = await fetch(`http://localhost:3001/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });
      navigate('/student');

    } catch (error) {
      console.log('Error updating student:', error);
    }
  };

  if (!student) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="edit-student-container">
      <h2>Edit Student</h2>
      <img src={student.profilePicture} alt={`Profile picture of ${student.fullname}`} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <Input
            type="text"
            data-testid="name" 
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <Input
            type="text"
            data-testid="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <Input
            type="text"
            data-testid="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <Input
            type="text"
            data-testid="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <Input
            type="text"
            data-testid="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="programStudy">Program Study:</label>
        <select
        id="programStudy"
        data-testid="prody"
        value={programStudy}
        onChange={(e) => setProgramStudy(e.target.value)}
        className="program-study-select"
        >
        <option value="">Pilih Program Study</option>
        <option value="Ekonomi">Ekonomi</option>
        <option value="Manajemen">Manajemen</option>
        <option value="Akuntansi">Akuntansi</option>
        <option value="Administrasi Publik">Administrasi Publik</option>
        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
        <option value="Hubungan Internasional">Hubungan Internasional</option>
        <option value="Teknik Sipil">Teknik Sipil</option>
        <option value="Arsitektur">Arsitektur</option>
        <option value="Matematika">Matematika</option>
        <option value="Fisika">Fisika</option>
        <option value="Informatika">Informatika</option>
  </select>
        </div>
        <Button type="submit" data-testid="edit-btn" >Edit Student</Button>
      </form>
    </div>
  );
};

export default EditStudent;
