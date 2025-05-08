import React from 'react';
import { InstitutionList } from './components/InstitutionList';
import { ApiKeyGenerator } from './components/ApiKeyGenerator';
import ApiDocs from './components/ApiDocs';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import { SnackbarProvider } from 'notistack';

function App() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>SA Institutions API</Typography>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Institutions" />
              <Tab label="API Key" />
              <Tab label="Documentation" />
            </Tabs>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
            <InstitutionList />
          </Box>
          <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
            <ApiKeyGenerator />
          </Box>
          <Box sx={{ display: tabValue === 2 ? 'block' : 'none' }}>
            <ApiDocs />
          </Box>
        </Container>
      </div>
    </SnackbarProvider>
  );
}

export default App;