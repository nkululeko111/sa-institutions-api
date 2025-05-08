import { useState } from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';

export const ApiKeyGenerator = () => {
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');

  const generateKey = () => {
    // Simulate API key generation
    const mockKey = `sa_api_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(mockKey);
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">API Key Generator</Typography>
      <TextField
        label="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={generateKey} disabled={!email}>
        Generate API Key
      </Button>
      {apiKey && (
        <div style={{ marginTop: '20px' }}>
          <Typography>Your API Key:</Typography>
          <code style={{ wordBreak: 'break-all' }}>{apiKey}</code>
          <Typography variant="caption" display="block" style={{ marginTop: '10px' }}>
            (This is a demo key. No real authentication is implemented.)
          </Typography>
        </div>
      )}
    </Paper>
  );
};