import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SaleRecord, getSales } from '../utils/storage';

export default function Statistika() {
  const [sales, setSales] = useState<SaleRecord[]>([]);

  useEffect(() => {
    setSales(getSales());
  }, []);

  // Umumiy daromad
  const totalIncome = sales.reduce((sum, sale) => {
    const tara = sale.tara || 0;
    const netKg = sale.kg - sale.crates * tara;
    return sum + netKg * sale.pricePerKg;
  }, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Statistika
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Umumiy daromad: {totalIncome.toLocaleString()} so'm
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Sana</strong></TableCell>
              <TableCell><strong>Yashik</strong></TableCell>
              <TableCell><strong>Kg</strong></TableCell>
              <TableCell><strong>Tara (kg)</strong></TableCell>
              <TableCell><strong>Sof Kg</strong></TableCell>
              <TableCell><strong>Kg narxi (so'm)</strong></TableCell>
              <TableCell><strong>Daromad (so'm)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale, index) => {
              const tara = sale.tara || 0;
              const netKg = sale.kg - sale.crates * tara;
              const income = netKg * sale.pricePerKg;

              return (
                <TableRow key={index}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.crates}</TableCell>
                  <TableCell>{sale.kg}</TableCell>
                  <TableCell>{tara}</TableCell>
                  <TableCell>{netKg.toFixed(2)}</TableCell>
                  <TableCell>{sale.pricePerKg}</TableCell>
                  <TableCell>{income.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
