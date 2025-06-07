import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { getSales, SaleRecord } from '../utils/storage';

export default function Statistika() {
  const sales = getSales();

  // Eng ko'p kilogramm sotilgan kunni topish
  const totalKgByDate: Record<string, number> = {};
  sales.forEach(({ date, kg }) => {
    totalKgByDate[date] = (totalKgByDate[date] || 0) + kg;
  });

  const maxDate = Object.keys(totalKgByDate).reduce(
    (a, b) => (totalKgByDate[a] > totalKgByDate[b] ? a : b),
    ''
  );

  const totalKg = sales.reduce((sum, s) => sum + s.kg, 0);
  const totalCrates = sales.reduce((sum, s) => sum + s.crates, 0);
  const totalSum = sales.reduce((sum, s) => sum + s.kg * s.pricePerKg, 0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // sm va kichiklar

  if (isMobile) {
    // Mobil uchun vertical "cards" ko‘rinishi
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Statistikalar
        </Typography>
        <Typography variant="h6" mb={1}>
          Eng ko'p sotilgan kun: {maxDate || 'Maʼlumot yo‘q'}
        </Typography>
        <Typography variant="body1" mb={2}>
          Ushbu kunda jami: {totalKgByDate[maxDate] || 0} kg sotilgan
        </Typography>
        <Typography variant="h6" mb={2}>
          Umumiy sotilganlar:
        </Typography>
        <Typography>Yashiklar soni: {totalCrates}</Typography>
        <Typography>Kg bo‘yicha umumiy: {totalKg} kg</Typography>
        <Typography sx={{ mb: 2 }}>
          Jami summa: {totalSum.toLocaleString('uz-UZ')} so'm
        </Typography>

        {sales.map((sale: SaleRecord, idx: number) => (
          <Paper
            key={idx}
            elevation={3}
            sx={{ mb: 2, p: 2, borderRadius: 2 }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>{sale.date}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>Yashiklar: {sale.crates}</Typography>
            <Typography>Kg: {sale.kg}</Typography>
            <Typography>Kg narxi: {sale.pricePerKg}</Typography>
            <Typography>
              Jami: {(sale.kg * sale.pricePerKg).toLocaleString('uz-UZ')} so'm
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  }

  // Desktop uchun an'anaviy jadval
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Statistikalar
      </Typography>

      <Typography variant="h6" mb={1}>
        Eng ko'p sotilgan kun: {maxDate || 'Maʼlumot yo‘q'}
      </Typography>
      <Typography variant="body1" mb={2}>
        Ushbu kunda jami: {totalKgByDate[maxDate] || 0} kg sotilgan
      </Typography>

      <Typography variant="h6" mb={2}>
        Umumiy sotilganlar:
      </Typography>
      <Typography>Yashiklar soni: {totalCrates}</Typography>
      <Typography>Kg bo‘yicha umumiy: {totalKg} kg</Typography>
      <Typography sx={{ mb: 2 }}>
        Jami summa: {totalSum.toLocaleString('uz-UZ')} so'm
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ mt: 3, overflowX: 'auto' }} // jadvalni responsiv qilish uchun
      >
        <Table sx={{ minWidth: 650 }} aria-label="sales table">
          <TableHead>
            <TableRow>
              <TableCell>Sana</TableCell>
              <TableCell>Yashiklar</TableCell>
              <TableCell>Kg</TableCell>
              <TableCell>Kg narxi</TableCell>
              <TableCell>Jami (so'm)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale: SaleRecord, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.crates}</TableCell>
                <TableCell>{sale.kg}</TableCell>
                <TableCell>{sale.pricePerKg}</TableCell>
                <TableCell>{(sale.kg * sale.pricePerKg).toLocaleString('uz-UZ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
