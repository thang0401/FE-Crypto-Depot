import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
  Alert,
  Snackbar,
  SelectChangeEvent
} from "@mui/material";

// Định nghĩa kiểu dữ liệu cho props của component
interface WalletInitializationDialogProps {
  open: boolean;
  onClose: () => void;
  onWalletInitialized: () => void; // Callback khi ví đã được khởi tạo
}

const WalletInitializationDialog: React.FC<WalletInitializationDialogProps> = ({ 
  open, 
  onClose, 
  onWalletInitialized 
}) => {
  const [walletOption, setWalletOption] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setWalletOption(event.target.value);
    // Reset public key when changing options
    setPublicKey("");
  };

  const handlePublicKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(event.target.value);
  };

  const handleSubmit = () => {
    // Hiển thị thông báo thành công dựa trên tùy chọn của người dùng
    if (walletOption === "create") {
      setAlertMessage("Wallet has been successfully created!");
    } else if (walletOption === "import") {
      setAlertMessage(`Wallet successfully imported with public key: ${publicKey.substring(0, 10)}...`);
    }
    
    // Lưu trạng thái đã khởi tạo ví vào localStorage
    localStorage.setItem("walletInitialized", "true");
    
    // Có thể lưu thêm thông tin về ví nếu cần
    if (walletOption === "import" && publicKey) {
      localStorage.setItem("walletPublicKey", publicKey);
    }
    
    // Hiển thị alert
    setShowSuccessAlert(true);
    
    // Gọi callback để thông báo ví đã được khởi tạo
    setTimeout(() => {
      onWalletInitialized();
      onClose();
    }, 1500);
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Please select your wallet initialization option</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="wallet-option-label">Wallet Option</InputLabel>
              <Select
                labelId="wallet-option-label"
                id="wallet-option"
                value={walletOption}
                label="Wallet Option"
                onChange={handleOptionChange}
              >
                <MenuItem value="create">Create new wallet</MenuItem>
                <MenuItem value="import">Import wallet</MenuItem>
              </Select>
            </FormControl>

            {walletOption === "import" && (
              <TextField
                fullWidth
                label="Public key"
                variant="outlined"
                value={publicKey}
                onChange={handlePublicKeyChange}
                sx={{ mt: 2 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={walletOption === "" || (walletOption === "import" && publicKey === "")}
          >
            {walletOption === "create" ? "Create" : walletOption === "import" ? "Import" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert thông báo thành công */}
      <Snackbar 
        open={showSuccessAlert} 
        autoHideDuration={3000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default WalletInitializationDialog;
