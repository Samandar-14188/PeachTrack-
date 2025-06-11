import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { saveSale } from '../utils/storage';

export default function EntryForm() {
  const [date, setDate] = useState('');
  const [crates, setCrates] = useState('');
  const [kg, setKg] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !crates || !kg || !pricePerKg) {
      setMessage('Iltimos, barcha maydonlarni to‘ldiring');
      return;
    }

    saveSale({
      date,
      crates: Number(crates),
      kg: Number(kg),
      pricePerKg: Number(pricePerKg),
      tara: 0, // yoki foydalanuvchidan kiritilgan qiymat bo‘lsa, shuni yozing
    });
    
    setMessage('Maʼlumot saqlandi!');
    setDate('');
    setCrates('');
    setKg('');
    setPricePerKg('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" mb={2}>Sotish maʼlumotlarini kiriting</Typography>
      <TextField
        label="Sana"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Yashik soni"
        type="number"
        value={crates}
        onChange={(e) => setCrates(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Sotilgan kilogramm"
        type="number"
        value={kg}
        onChange={(e) => setKg(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Kg boshiga narx"
        type="number"
        value={pricePerKg}
        onChange={(e) => setPricePerKg(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Saqlash
      </Button>
      {message && (
        <Typography mt={2} color={message === 'Maʼlumot saqlandi!' ? 'green' : 'error'}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
