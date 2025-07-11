import { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const UrlInputForm = ({ index, data, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Original URL"
          fullWidth
          required
          value={data.url}
          onChange={(e) => onChange(index, 'url', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Validity (minutes)"
          type="number"
          value={data.validity}
          onChange={(e) => onChange(index, 'validity', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Custom Shortcode"
          value={data.shortcode}
          onChange={(e) => onChange(index, 'shortcode', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default UrlInputForm;
