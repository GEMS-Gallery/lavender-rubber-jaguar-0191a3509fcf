import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import DataTable from 'react-data-table-component';
import TaxPayerForm from './components/TaxPayerForm';
import SearchForm from './components/SearchForm';

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
};

const columns = [
  {
    name: 'TID',
    selector: (row: TaxPayer) => row.tid,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: (row: TaxPayer) => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: (row: TaxPayer) => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: TaxPayer) => row.address,
    sortable: true,
  },
];

function App() {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    setLoading(true);
    try {
      const result = await backend.getTaxPayers();
      setTaxPayers(result);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: TaxPayer) => {
    setLoading(true);
    try {
      await backend.addTaxPayer(newTaxPayer);
      await fetchTaxPayers();
    } catch (error) {
      console.error('Error adding tax payer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (tid: string) => {
    setLoading(true);
    try {
      const result = await backend.getTaxPayerByTID(tid);
      if (result.length > 0) {
        setTaxPayers([result[0]]);
      } else {
        setTaxPayers([]);
      }
    } catch (error) {
      console.error('Error searching for tax payer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TaxPayer Record Management
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <SearchForm onSearch={handleSearch} />
          <TaxPayerForm onSubmit={handleAddTaxPayer} />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={taxPayers}
            pagination
            responsive
            highlightOnHover
          />
        )}
      </Box>
    </Container>
  );
}

export default App;
