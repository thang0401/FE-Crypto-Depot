import type React from "react"
import { useState, useEffect } from "react"
import { Box, Grid, Typography } from "@mui/material"
import RecipientSearch from "./recipient-search"
import TransactionForm from "./transaction-form"
import EmptyState from "./empty-state"
import type { User, TransactionDetails } from "./type"

//Pass code data
const samplePasscodeData = "123456"

interface DialogState {
  open: boolean
  message: string
}

const TransferDebit = () => {
  const [phoneFilter, setPhoneFilter] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([]) // Thêm state cho tất cả users
  const [availableBalance, setAvailableBalance] = useState("500.00")
  const [transaction, setTransaction] = useState<TransactionDetails>({
    amount: "",
    fee: "0.25",
    note: "",
    passCode: "",
  })
  const [formErrors, setFormErrors] = useState({
    amount: false,
    passCode: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showPasscode, setShowPasscode] = useState(false)
  const [passcodeErrorDialog, setPasscodeErrorDialog] = useState(false)
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    message: "",
  })

  // Load mock data
  useEffect(() => {
    // Mock data cho recent transactions (5 người gần đây nhất)
    const mockRecentUsers: User[] = [
      {
        id: "user1",
        name: "Nguyen Van An",
        phone: "0901234567",
        lastTransaction: "Today",
        avatar: "A",
      },
      {
        id: "user2",
        name: "Tran Thi Mai",
        phone: "0912345678",
        lastTransaction: "Yesterday",
        avatar: "M",
      },
      {
        id: "user3",
        name: "Le Hoang Bao",
        phone: "0923456789",
        lastTransaction: "3 days ago",
        avatar: "B",
      },
      {
        id: "user4",
        name: "Pham Minh Tuan",
        phone: "0934567890",
        lastTransaction: "1 week ago",
        avatar: "T",
      },
      {
        id: "user5",
        name: "Hoang Thi Ngoc",
        phone: "0945678901",
        lastTransaction: "2 weeks ago",
        avatar: "N",
      },
    ]

    // Mock data cho tất cả users (bao gồm cả người thứ 6)
    const mockAllUsers: User[] = [
      ...mockRecentUsers,
      {
        id: "user1",
        name: "Nguyen Van An",
        phone: "0901234567",
        lastTransaction: "Today",
        avatar: "A",
      },
      {
        id: "user2",
        name: "Tran Thi Mai",
        phone: "0912345678",
        lastTransaction: "Yesterday",
        avatar: "M",
      },
      {
        id: "user3",
        name: "Le Hoang Bao",
        phone: "0923456789",
        lastTransaction: "3 days ago",
        avatar: "B",
      },
      {
        id: "user4",
        name: "Pham Minh Tuan",
        phone: "0934567890",
        lastTransaction: "1 week ago",
        avatar: "T",
      },
      {
        id: "user5",
        name: "Hoang Thi Ngoc",
        phone: "0945678901",
        lastTransaction: "2 weeks ago",
        avatar: "N",
      },
      {
        id: "user6",
        name: "Do Van Hung",
        phone: "0911111111",
        avatar: "H",
      },
    ]

    setRecentUsers(mockRecentUsers)
    setAllUsers(mockAllUsers)
  }, [])

  // Handlers
  const handlePhoneFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneFilter(value)

    if (selectedUser) {
      setSelectedUser(null)
    }

  
    if (value.length === 10) {
      const foundUser = allUsers.find((user) => user.phone === value)
      if (foundUser) {
        setSelectedUser(foundUser)
      } else {
        setDialog({
          open: true,
          message: "This user does not exist.",
        })
      }
    }
  }

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setPhoneFilter(user.phone)
  }

  const handleTransactionChange = (field: keyof TransactionDetails, value: string) => {
    // For passCode: limit to 6 digits
    if (field === "passCode" && value.length > 6) {
      return
    }

    // Update transaction state first
    setTransaction((prev) => ({ ...prev, [field]: value }))

    // Validate amount
    if (field === "amount") {
      const numValue = Number.parseFloat(value) || 0
      const available = Number.parseFloat(availableBalance)
      setFormErrors((prev) => ({
        ...prev,
        amount: numValue + Number.parseFloat(transaction.fee) > available || value === "" || numValue <= 0,
      }))
    }
  }

  const handleSubmit = () => {
    const available = Number.parseFloat(availableBalance)
    const totalAmount = Number.parseFloat(transaction.amount || "0") + Number.parseFloat(transaction.fee)

    const errors = {
      amount: transaction.amount === "" || Number.parseFloat(transaction.amount) <= 0 || totalAmount > available,
      passCode: transaction.passCode.length !== 6,
    }

    setFormErrors(errors)

    if (errors.amount || errors.passCode) {
      return
    }

    if (transaction.passCode !== samplePasscodeData) {
      setPasscodeErrorDialog(true)
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage(`Successfully transferred ${transaction.amount} USDC to ${selectedUser?.name}`)

      setTimeout(() => {
        setTransaction({
          amount: "",
          fee: "0.25",
          note: "",
          passCode: "",
        })
        setSelectedUser(null)
        setPhoneFilter("")
        setSuccessMessage("")
      }, 7000)
    }, 5000)
  }

  const handleCloseDialog = () => {
    setDialog({
      open: false,
      message: "",
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        USDC Transfer in CryptoBank
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <RecipientSearch
            phoneFilter={phoneFilter}
            selectedUser={selectedUser}
            recentUsers={recentUsers}
            onPhoneFilterChange={handlePhoneFilterChange}
            onUserSelect={handleUserSelect}
            dialog={dialog}
            onCloseDialog={handleCloseDialog}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          {selectedUser ? (
            <TransactionForm
              selectedUser={selectedUser}
              availableBalance={availableBalance}
              transaction={transaction}
              formErrors={formErrors}
              isSubmitting={isSubmitting}
              successMessage={successMessage}
              showPasscode={showPasscode}
              passcodeErrorDialog={passcodeErrorDialog}
              onTransactionChange={handleTransactionChange}
              onSubmit={handleSubmit}
              onTogglePasscode={() => setShowPasscode(!showPasscode)}
              onClosePasscodeError={() => setPasscodeErrorDialog(false)}
            />
          ) : (
            <EmptyState />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
export default TransferDebit