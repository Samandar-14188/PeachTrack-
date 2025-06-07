import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
// Grid importini olib tashladik

import React, { useState, useEffect } from 'react';
import { SaleRecord, getSales, saveSale, deleteSale, updateSale } from '../utils/storage';

export default function Hisobot() {
  const [form, setForm] = useState<SaleRecord>({
    date: '',
    crates: 0,
    kg: 0,
    pricePerKg: 0,
  });

  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSales(getSales());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.date) {
      setError('Sana kiritilishi shart.');
      return false;
    }
    if (form.crates <= 0 || isNaN(form.crates)) {
      setError('Yashik soni musbat bo‘lishi kerak.');
      return false;
    }
    if (form.kg <= 0 || isNaN(form.kg)) {
      setError('Kg musbat bo‘lishi kerak.');
      return false;
    }
    if (form.pricePerKg <= 0 || isNaN(form.pricePerKg)) {
      setError('Kg narxi musbat bo‘lishi kerak.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formatted = {
      ...form,
      crates: Number(form.crates),
      kg: Number(form.kg),
      pricePerKg: Number(form.pricePerKg),
    };

    if (editIndex !== null) {
      updateSale(editIndex, formatted);
    } else {
      saveSale(formatted);
    }

    setForm({ date: '', crates: 0, kg: 0, pricePerKg: 0 });
    setSales(getSales());
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    deleteSale(index);
    setSales(getSales());
  };

  const handleEdit = (index: number) => {
    setForm(sales[index]);
    setEditIndex(index);
    setError(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Kunlik Hisobot
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <TextField
          label="Sana"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Yashik"
          name="crates"
          type="number"
          value={form.crates}
          onChange={handleChange}
        />
        <TextField
          label="Kg"
          name="kg"
          type="number"
          value={form.kg}
          onChange={handleChange}
        />
        <TextField
          label="Kg narxi"
          name="pricePerKg"
          type="number"
          value={form.pricePerKg}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ height: 'fit-content' }}
        >
          {editIndex !== null ? 'Tahrirlash' : 'Qo‘shish'}
        </Button>
      </Box>

      {/* Grid o‘rniga Box flex container */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'flex-start',
        }}
      >
        {sales.map((sale, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 2,
              width: { xs: '100%', sm: '48%', md: '31%' }, // 12, 6, 4 ga mos responsive kengliklar
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="subtitle1">
              <strong>Sana:</strong> {sale.date}
            </Typography>
            <Typography variant="body2">
              <strong>Yashik:</strong> {sale.crates}
            </Typography>
            <Typography variant="body2">
              <strong>Kg:</strong> {sale.kg}
            </Typography>
            <Typography variant="body2">
              <strong>Kg narxi:</strong> {sale.pricePerKg}
            </Typography>
            <Typography variant="body2">
              <strong>Jami:</strong> {sale.kg * sale.pricePerKg}
            </Typography>

            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="warning"
                size="small"
                onClick={() => handleEdit(index)}
              >
                Tahrirla
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(index)}
              >
                O‘chirish
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
