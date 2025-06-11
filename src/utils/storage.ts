export interface SaleRecord {
  date: string;
  crates: number;
  kg: number;
  pricePerKg: number;
  tara: number; // yangi qo‘shildi
}


const STORAGE_KEY = 'shaftoli-sales';

export function getSales(): SaleRecord[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveSale(sale: SaleRecord) {
  const current = getSales();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, sale]));
}

export function updateSale(index: number, updated: SaleRecord) {
  const current = getSales();
  current[index] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function deleteSale(index: number) {
  const current = getSales();
  current.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
