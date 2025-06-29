import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Paper, 
  TextField,
  Button,
  Box,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnackbar } from 'notistack';

const ApiDocs = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [apiKey, setApiKey] = useState('your-api-key-here');
  // Store response per endpoint path (string) to allow multiple responses
  const [exampleResponses, setExampleResponses] = useState<Record<string, any>>({});
  const [loadingEndpoint, setLoadingEndpoint] = useState<string | null>(null);

  type EndpointParameter = {
    name: string;
    type: string;
    required: boolean;
    example?: string;
  };

  type Endpoint = {
    method: string;
    path: string;
    description: string;
    parameters: EndpointParameter[];
    example: string;
  };

  const endpoints: Endpoint[] = [
    {
      method: 'GET',
      path: '/api/institutions',
      description: 'Get all institutions',
      parameters: [],
      example: 'http://localhost:8080/api/institutions'
    },
    {
      method: 'GET',
      path: '/api/institutions/search',
      description: 'Filter institutions by province or type',
      parameters: [
        { name: 'province', type: 'string', required: false, example: 'Western Cape' },
        { name: 'type', type: 'string', required: false, example: 'University' }
      ],
      example: 'http://localhost:8080/api/institutions/search?province=Western+Cape&type=University'
    },
    {
      method: 'POST',
      path: '/api/institutions',
      description: 'Create a new institution (Admin only)',
      parameters: [
        { name: 'name', type: 'string', required: true },
        { name: 'type', type: 'string', required: true },
        { name: 'province', type: 'string', required: true },
        { name: 'website', type: 'string', required: false },
        { name: 'accreditation', type: 'string', required: false }
      ],
      example: 'http://localhost:8080/api/institutions'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' });
  };

  const tryEndpoint = async (url: string, path: string) => {
    setLoadingEndpoint(path);
    setExampleResponses(prev => ({ ...prev, [path]: null })); // clear previous response

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExampleResponses(prev => ({ ...prev, [path]: data }));
      enqueueSnackbar('Response fetched successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Error fetching data: ${error}`, { variant: 'error' });
      setExampleResponses(prev => ({ ...prev, [path]: { error: String(error) } }));
    } finally {
      setLoadingEndpoint(null);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        API Documentation
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          <strong>Base URL:</strong> http://localhost:8080
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">
            <strong>API Key:</strong>
          </Typography>
          <TextField 
            size="small" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)}
            sx={{ width: '300px' }}
          />
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<ContentCopyIcon />}
            onClick={() => copyToClipboard(apiKey)}
          >
            Copy
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Include in headers: <code>Authorization: Bearer {apiKey}</code>
        </Typography>
      </Box>

      {endpoints.map((endpoint, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={endpoint.method} 
                color={
                  endpoint.method === 'GET' ? 'success' : 
                  endpoint.method === 'POST' ? 'primary' : 'default'
                } 
                size="small"
              />
              <Typography>{endpoint.path}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>{endpoint.description}</Typography>
            
            {endpoint.parameters.length > 0 && (
              <>
                <Typography variant="subtitle2">Parameters:</Typography>
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  {endpoint.parameters.map((param, i) => (
                    <li key={i}>
                      <Typography variant="body2">
                        <code>{param.name}</code> ({param.type}) - {param.required ? 'Required' : 'Optional'}
                        {param.example && ` - Example: ${param.example}`}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </>
            )}

            <Typography variant="subtitle2">Example Request:</Typography>
            <Paper variant="outlined" sx={{ p: 1, mb: 2, position: 'relative' }}>
              <Typography variant="body2" component="code" sx={{ wordBreak: 'break-all' }}>
                {endpoint.example}
              </Typography>
              <Button
                size="small"
                startIcon={<ContentCopyIcon />}
                onClick={() => copyToClipboard(endpoint.example)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                Copy
              </Button>
            </Paper>

            <Button
              variant="contained"
              size="small"
              onClick={() => tryEndpoint(endpoint.example, endpoint.path)}
              disabled={loadingEndpoint === endpoint.path}
              sx={{ mb: 2 }}
            >
              {loadingEndpoint === endpoint.path ? 'Loading...' : 'Try it out'}
            </Button>

            {exampleResponses[endpoint.path] && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>Example Response:</Typography>
                <Paper variant="outlined" sx={{ p: 2, whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
                  <pre style={{ margin: 0 }}>
                    {JSON.stringify(exampleResponses[endpoint.path], null, 2)}
                  </pre>
                </Paper>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default ApiDocs;
