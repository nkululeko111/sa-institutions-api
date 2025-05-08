import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const InstitutionList = () => {
  const { getInstitutions } = useApi();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [provinceFilter, setProvinceFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    const data = await getInstitutions(provinceFilter, typeFilter);
    setInstitutions(data);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Filter by Province"
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
        />
        <TextField
          label="Filter by Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <Button 
          variant="contained" 
          onClick={fetchInstitutions}
          style={{ marginLeft: '10px' }}
        >
          Search
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Province</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutions.map((institution) => (
              <TableRow key={institution.id}>
                <TableCell>{institution.name}</TableCell>
                <TableCell>{institution.type}</TableCell>
                <TableCell>{institution.province}</TableCell>
                <TableCell>
                  <a href={institution.website} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};