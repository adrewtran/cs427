import { Pagination as MuiPagination, Box } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }
  
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <MuiPagination 
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="medium"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination; 