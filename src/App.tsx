
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Statistika from './page/Statistika';
import Hisobot from './page/Hisobot';


export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mavsum
          </Typography>
          <Button color="inherit" component={Link} to="/statistika">
            Statistika
          </Button>
          <Button color="inherit" component={Link} to="/hisobot">
            Kunlik Hisobot
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<Statistika />} />
          <Route path="/statistika" element={<Statistika />} />
          <Route path="/hisobot" element={<Hisobot />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
