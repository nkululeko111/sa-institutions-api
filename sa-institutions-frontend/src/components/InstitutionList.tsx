import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

type Institution = {
  id: string | number;
  name: string;
  type: string;
  province: string;
  website: string;
  // add other fields as needed
};

export const InstitutionList = () => {
  const { getInstitutions } = useApi();

  const [pageData, setPageData] = useState<{
    content: Institution[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    number: 0
  });

  const [provinceFilter, setProvinceFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const data = await getInstitutions(provinceFilter.trim(), typeFilter.trim());
      console.log('📦 API Response:', data);

      if (data && Array.isArray(data.content)) {
        setPageData({
          content: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          size: data.size,
          number: data.number
        });
      } else {
        setPageData({
          content: [],
          totalPages: 0,
          totalElements: 0,
          size: 10,
          number: 0
        });
      }
    } catch (error) {
      console.error('❌ Failed to fetch institutions:', error);
      setPageData({
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 10,
        number: 0
      });
    }
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
            {pageData.content.length > 0 ? (
              pageData.content.map((institution: Institution) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No institutions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: '10px' }}>
        Page {pageData.totalPages > 0 ? pageData.number + 1 : 0} of {pageData.totalPages}
      </div>
    </div>
  );
};
