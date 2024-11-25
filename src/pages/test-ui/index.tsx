import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { styled } from '@mui/material/styles'
import { TransitionProps } from '@mui/material/transitions'
import { Grid, Card, Button, TextField, Box, Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import TableBasic from 'src/views/table/data-grid/TableBasic'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FolderIcon from '@mui/icons-material/Folder'
import DeleteIcon from '@mui/icons-material/Delete'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})
//////////
function generate(element: React.ReactElement<any>) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  )
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}))

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  ///////////////////////////////
  const [dense, setDense] = React.useState(false)
  const [secondary, setSecondary] = React.useState(false)

  const getCommodities: string[] = ['0123456789', '0123456789']
  const getCommodityGroup: string[] = ['Nguyễn Cao Thăng', 'Thangnc0401']
  return (
    <Grid>
      <Grid container>
        <Grid item xs={12}>
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <h5 style={{ margin: 0, color: '#A9A9A9' }}>
              {' '}
              <span style={{ color: '#808080' }}>Trade now/ </span> Transfer Asset{' '}
            </h5>
            <React.Fragment>
              <Button variant='outlined' onClick={handleClickOpen}>
                Transfer Asset
              </Button>
              <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                  <Toolbar>
                    <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                      <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                      Transfer Asset to other
                    </Typography>
                    <Button autoFocus color='inherit' onClick={handleClose}>
                      Cancle
                    </Button>
                  </Toolbar>
                </AppBar>
                <Grid width={'100%'} display={'flex'}>
                  <Grid width={'50%'}>
                    <List>
                      <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
                          Available Asset In this Portfolio
                        </Typography>
                        <Demo>
                          <List dense={dense}>
                            {generate(
                              <ListItem
                                secondaryAction={
                                  <IconButton edge='end' aria-label='delete'>
                                    <DeleteIcon />
                                  </IconButton>
                                }
                              >
                                <ListItemAvatar>
                                  <Avatar>
                                    <FolderIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Solana' secondary={secondary ? 'Secondary text' : null} />
                              </ListItem>
                            )}
                          </List>
                        </Demo>
                      </Grid>
                    </List>
                  </Grid>
                  <Grid width={'50%'}>
                    <h2> TRANSFER ASSET</h2>
                    <Grid>
                      <Card sx={{ padding: 5, height: 100 }}>
                        <Grid container justifyItems={'right'} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginBottom={4}>
                          <Grid width={'100%'}>From my account</Grid>
                          <Grid item xs={3} marginLeft={2}>
                            <Autocomplete
                              options={getCommodities}
                              renderInput={params => (
                                <TextField {...params} label='From Portfolio' placeholder='From Portfolio' />
                              )}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Autocomplete
                              options={getCommodityGroup}
                              renderInput={params => (
                                <TextField {...params} label='Asset Type' placeholder='Asset Type' />
                              )}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Autocomplete
                              options={getCommodityGroup}
                              renderInput={params => <TextField {...params} label='Quantity' placeholder='Quantity' />}
                            />
                          </Grid>
                          {/* <Button
                            sx={{ borderRadius: 0 }}
                            variant='contained'
                            style={{ backgroundColor: '#0292B1', width: 56, height: 56 }}
                          >
                            <SearchIcon />
                          </Button>
                          <Button
                            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            variant='contained'
                            style={{ backgroundColor: '#AEB4AB', width: 45, height: 56 }}
                          >
                            <RefreshIcon />
                          </Button> */}
                        </Grid>
                        <Grid>
                          <h2> TO Account</h2>
                          
                        </Grid>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Dialog>
            </React.Fragment>
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginLeft: 30 }}>Transfer Now</h2>
            <Box sx={{ display: 'flex', gap: '11px' }}>
              <Box sx={{ display: 'flex', gap: '11px' }}></Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Card sx={{ padding: 5, height: 100 }}>
        <Grid container justifyItems={'right'} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginBottom={4}>
          <Grid item xs={3} marginLeft={2}>
            <Autocomplete
              options={getCommodities}
              renderInput={params => (
                <TextField {...params} label='Received portfolio name' placeholder='Received portfolio name' />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              options={getCommodityGroup}
              renderInput={params => (
                <TextField {...params} label='Received portfolio ID' placeholder='Received portfolio ID' />
              )}
            />
          </Grid>
          <Button
            sx={{ borderRadius: 0 }}
            variant='contained'
            style={{ backgroundColor: '#0292B1', width: 56, height: 56 }}
          >
            <SearchIcon />
          </Button>
          <Button
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            variant='contained'
            style={{ backgroundColor: '#AEB4AB', width: 45, height: 56 }}
          >
            <RefreshIcon />
          </Button>
        </Grid>
      </Card>

      <Grid item xs={12} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <TableBasic />
        </Grid>
      </Grid>
    </Grid>
  )
}
