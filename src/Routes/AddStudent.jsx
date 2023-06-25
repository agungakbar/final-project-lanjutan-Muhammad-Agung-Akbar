import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';

const AddStudent = ({ setStudents }) => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [programStudy, setProgramStudy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine faculty based on programStudy
    let faculty = '';
    switch (programStudy) {
      case 'Ekonomi':
      case 'Manajemen':
      case 'Akuntansi':
        faculty = 'Fakultas Ekonomi';
        break;
      case 'Administrasi Publik':
      case 'Administrasi Bisnis':
      case 'Hubungan Internasional':
        faculty = 'Fakultas Ilmu Sosial dan Politik';
        break;
      case 'Teknik Sipil':
      case 'Arsitektur':
        faculty = 'Fakultas Teknik';
        break;
      case 'Matematika':
      case 'Fisika':
      case 'Informatika':
        faculty = 'Fakultas Teknologi Informasi dan Sains';
        break;
      default:
        break;
    }

    // Create the student object
    const student = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      faculty,
      programStudy,
    };

    try {
      // Send the student data to the server
      const response = await fetch('http://localhost:3001/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      
      /*if (response.ok) {
        // Redirect to the Student page
        navigate('/student');
      } else {
        console.log('Error creating student');
      }*/
      // Ambil data siswa terbaru
    //const updatedResponse = await fetch('http://localhost:3001/students');
    //const updatedData = await updatedResponse.json();

    // Setel data siswa yang diperbarui
    //setStudents();

    navigate('/student');
    } catch (error) {
      console.log('Error creating student:', error);
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <Input
            type="text"
            id="fullname"
            data-testid="name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <Input
            type="text"
            id="profilePicture"
            data-testid="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <Input
            type="text"
            id="address"
            data-testid="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <Input
            type="text"
            id="phoneNumber"
            data-testid="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <Input
            type="text"
            id="birthDate"
            data-testid="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <Input
            type="text"
            id="gender"
            data-testid="gender"
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
        <Button type="submit" data-testid="add-btn">Add Student</Button>
      </form>
    </div>
  );
};

export default AddStudent;

