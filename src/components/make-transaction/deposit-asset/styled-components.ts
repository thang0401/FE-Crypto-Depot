import { styled } from '@mui/material/styles';
import { Card, TextField, ListItem } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
}));

export const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '24px',
  },
}));

export const RecentUserItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: '8px',
  margin: '4px 0',
  '&:hover': {
    backgroundColor: '#f0f7ff',
  },
  transition: 'background-color 0.2s ease',
}));
