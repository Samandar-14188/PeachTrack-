import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { SaleRecord, getSales, saveSale, deleteSale, updateSale } from '../utils/storage';

export default function Hisobot() {
  const [form, setForm] = useState<SaleRecord>({
    date: '',
    crates: 0,
    kg: 0,
    pricePerKg: 0,
    tara: 0, // yangi qo‘shildi
  });

  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setSales(getSales());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const formatted = {
      ...form,
      crates: Number(form.crates),
      kg: Number(form.kg),
      pricePerKg: Number(form.pricePerKg),
      tara: Number(form.tara), // convert
    };

    if (editIndex !== null) {
      updateSale(editIndex, formatted);
    } else {
      saveSale(formatted);
    }

    setForm({ date: '', crates: 0, kg: 0, pricePerKg: 0, tara: 0 });
    setSales(getSales());
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    deleteSale(index);
    setSales(getSales());
  };

  const handleEdit = (index: number) => {
    const sale = sales[index];
    setForm(sale);
    setEditIndex(index);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Kunlik Hisobot</Typography>

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
          label="Yashik soni"
          name="crates"
          type="number"
          value={form.crates}
          onChange={handleChange}
        />
        <TextField
          label="Umumiy kg"
          name="kg"
          type="number"
          value={form.kg}
          onChange={handleChange}
        />
        <TextField
          label="Tara (kg)"
          name="tara"
          type="number"
          value={form.tara}
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

      <Stack spacing={2}>
        {sales.map((sale, index) => {
          const netKg = sale.kg - sale.crates * sale.tara;
          const total = netKg * sale.pricePerKg;

          return (
            <Paper elevation={3} sx={{ p: 2 }} key={index}>
              <Typography><strong>Sana:</strong> {sale.date}</Typography>
              <Typography><strong>Yashik soni:</strong> {sale.crates}</Typography>
              <Typography><strong>Umumiy kg:</strong> {sale.kg}</Typography>
              <Typography><strong>Tara (kg):</strong> {sale.tara}</Typography>
              <Typography><strong>Sof kg:</strong> {netKg}</Typography>
              <Typography><strong>Kg narxi:</strong> {sale.pricePerKg}</Typography>
              <Typography><strong>Jami:</strong> {total} so‘m</Typography>

              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                <Button variant="outlined" color="warning" size="small" onClick={() => handleEdit(index)}>
                  Tahrirla
                </Button>
                <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(index)}>
                  O‘chirish
                </Button>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
