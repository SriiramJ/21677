import { useEffect, useState } from 'react';
import { fetchStats } from '../api/shorturlApi';
import { Container, Typography, Box } from '@mui/material';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats().then(setStats).catch(console.error);
  }, []);

  return (
    <Container>
      <Typography variant="h4" mt={4} gutterBottom>URL Stats</Typography>
      {stats.map((item, idx) => (
        <Box key={idx} my={2}>
          <Typography><strong>Short URL:</strong> {item.shortUrl}</Typography>
          <Typography>Created At: {new Date(item.createdAt).toLocaleString()}</Typography>
          <Typography>Expires At: {new Date(item.expiry).toLocaleString()}</Typography>
          <Typography>Clicks: {item.clicks}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default StatsPage;
