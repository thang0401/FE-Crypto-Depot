"use client"

import React from "react"
import { motion } from "framer-motion"
import {
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    FormControlLabel,
    Checkbox,
    Alert,
    Box,
    type SelectChangeEvent,
    IconButton,
} from "@mui/material"
import { StyledCard } from "../styled-components"

interface Step1Props {
  formData: { sourceAccount: string; amount: string; term: string; interestPayment: string; agreeToTerms: boolean };
  accounts: Array<{ id: string; label: string; balance: string }>;
  terms: Array<{ value: string; label: string; interest: string }>;
  onFieldChange: (field: string, value: string | boolean) => void;
  showValidation?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  hideBalance?: boolean;
  toggleHideBalance?: () => void;
}

export const Step1 = React.memo(({ formData, accounts, terms, onFieldChange, showValidation = false, onValidationChange, hideBalance, toggleHideBalance }: Step1Props) => {
  const errors = React.useMemo(() => ({
    sourceAccount: !formData.sourceAccount && showValidation,
    amount: !formData.amount && showValidation,
    term: !formData.term && showValidation,
    interestPayment: !formData.interestPayment && showValidation,
    agreeToTerms: !formData.agreeToTerms && showValidation,
  }), [formData, showValidation]);

  const selectedAccount = accounts.find(a => a.id === formData.sourceAccount);
  const accountBalance = selectedAccount ? parseFloat(selectedAccount.balance.split(' ')[0]) : 0;
  const depositAmount = parseFloat(formData.amount.replace(/,/g, '')) || 0;

  const isFormValid = React.useMemo(() => !Object.values(errors).some(Boolean) && formData.sourceAccount && formData.amount && formData.term && formData.interestPayment && formData.agreeToTerms && depositAmount <= accountBalance, [errors, formData, depositAmount, accountBalance]);

  React.useEffect(() => {
    onValidationChange?.(Boolean(isFormValid));
  }, [isFormValid, onValidationChange]);

  const handleTextChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^0-9,.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    value = value.replace(/(?<=\.\d*),/g, '');
    onFieldChange(field, value);
  };

  const handleBlur = (field: string) => (event: React.FocusEvent<HTMLInputElement>) => {
    let value = event.target.value;
    const numericValue = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(numericValue)) value = numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    else value = '';
    onFieldChange(field, value);
  };

  const handleSelectChange = (field: string) => (event: SelectChangeEvent<string>) => {
    onFieldChange(field, event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange('agreeToTerms', event.target.checked);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {showValidation && !isFormValid && <Alert severity="error" sx={{ mb: 2 }}>Please fill in all required information</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', p: 2 }}>Source Wallet</Typography>
            <FormControl fullWidth error={errors.sourceAccount} sx={{ px: 2, pb: 2 }}>
              <InputLabel>Select account</InputLabel>
              <Select value={formData.sourceAccount} onChange={handleSelectChange('sourceAccount')} label="Select account">
                {accounts.map(account => (
                  <MenuItem key={account.id} value={account.id}>{account.label}</MenuItem>
                ))}
              </Select>
              {errors.sourceAccount && <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>Please select an account</Typography>}
            </FormControl>
            <Box sx={{ px: 2, pb: 2, borderRadius: 1, mx: 2, mb: 2, p: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2">Balance: <Typography component="span" sx={{ fontWeight: 700, fontSize: '14px' }}>{selectedAccount?.balance || '0 USDC'}</Typography></Typography>
              <IconButton onClick={toggleHideBalance} sx={{ ml: 1 }}></IconButton>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', p: 2 }}>Information</Typography>
            <Grid container spacing={3} sx={{ px: 2, pb: 2 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Amount" value={formData.amount} onChange={handleTextChange('amount')} onBlur={handleBlur('amount')} error={errors.amount} helperText={errors.amount ? 'Please enter an amount' : ''} />
                {depositAmount > accountBalance && <Typography color="error" variant="caption" sx={{ mt: 1 }}>The deposit amount exceeds the account balance.</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={errors.term}>
                  <InputLabel>Term</InputLabel>
                  <Select value={formData.term} onChange={handleSelectChange('term')} label="Term">
                    {terms.map(term => <MenuItem key={term.value} value={term.value}>{term.label}</MenuItem>)}
                  </Select>
                  {errors.term && <Typography color="error" variant="caption" sx={{ mt: 1 }}>Please select a term.</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
                  <Typography>Interest rate: {terms.find(t => t.value === formData.term)?.interest || '0%'}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={errors.interestPayment}>
                  <InputLabel>Interest Payment Method</InputLabel>
                  <Select value={formData.interestPayment} onChange={handleSelectChange('interestPayment')} label="Interest Payment Method">
                    <MenuItem value="end">End of term</MenuItem>
                    <MenuItem value="principal">Principal reinvestment</MenuItem>
                  </Select>
                  {errors.interestPayment && <Typography color="error" variant="caption" sx={{ mt: 1 }}>Please select an interest payment method.</Typography>}
                </FormControl>
              </Grid>
            </Grid>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox checked={formData.agreeToTerms} onChange={handleCheckboxChange} />} label="I agree to the terms and conditions." />
          {errors.agreeToTerms && <Typography color="error" variant="caption" display="block">Please agree to the terms and conditions.</Typography>}
        </Grid>
      </Grid>
    </motion.div>
  );
});

Step1.displayName = "Step1";
