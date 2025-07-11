import { useState } from 'react';
import { createShortUrls } from '../api/shorturlApi';
import UrlInputForm from '../components/UrlInputForm';
import { Button, Typography, Container, Box } from '@mui/material';

const ShortenerPage = () => {
  const [inputs, setInputs] = useState(Array(5).fill({ url: '', validity: 30, shortcode: '' }));
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    const filtered = inputs.filter(i => i.url);
    try {
      const response = await createShortUrls(filtered);
      setResults(response);
    } catch (err) {
      alert('Error creating URLs');
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} gutterBottom>URL Shortener</Typography>
      {inputs.map((data, i) => (
        <Box key={i} my={2}>
          <UrlInputForm index={i} data={data} onChange={handleChange} />
        </Box>
      ))}
      <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Results:</Typography>
          {results.map((r, i) => (
            <Box key={i}>
              <a href={r.shortLink} target="_blank">{r.shortLink}</a>
              <Typography variant="body2">Expires: {r.expiry}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ShortenerPage;
