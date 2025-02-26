import * as React from 'react'
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardActionArea, CardContent, CardMedia, Box, List, ListItem, ListItemText, Divider } from '@mui/material'
import { styled } from '@mui/system'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4),
}))

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 160,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 200,
  },
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: 1,
}))

const blogPosts = [
  { id: 4, title: 'SUI: Efficient and Secure Decentralized Ecosystem', excerpt: 'The SUI project is a high-performance blockchain, delivering superior security and scalability thanks to its object data model', image: '/sui-placeholder.svg?height=200&width=300' },
  { id: 5, title: 'NEAR: Developer and User-Friendly Blockchain', excerpt: 'NEAR Protocol is a high-performance blockchain, friendly to both developers and users.', image: '/near-placeholder.svg?height=200&width=300' },
  { id: 6, title: 'SOLANA: Fast and Low-Cost Blockchain', excerpt: 'Solana is an ultra-fast blockchain with extremely low transaction costs, attracting many DeFi, NFT, and Web3 projects.', image: '/solana-placeholder.svg?height=200&width=300' },
  { id: 1, title: 'The Future of DeFi', excerpt: 'Exploring the potential of decentralized finance', image: '/placeholder.svg?height=200&width=300' },
  { id: 2, title: 'NFTs: Digital Art', excerpt: 'How non-fungible tokens are revolutionizing various industries...', image: '/placeholder.svg?height=200&width=300' },
  { id: 3, title: 'Web3 and the Creator Economy', excerpt: 'How blockchain is empowering content creators', image: '/placeholder.svg?height=200&width=300' },
]

const categories = ['DeFi', 'NFTs', 'DAOs', 'Layer 2', 'Metaverse']

export default function Blog() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginLeft: 30 }}>Web3 and Crypto Blog</h2>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Latest Posts
            </Typography>
            {blogPosts.map((post) => (
              <StyledCard key={post.id}>
                <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                  <StyledCardMedia />
                  <StyledCardContent>
                    <Typography component="h2" variant="h5">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post.excerpt}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading ...
                    </Typography>
                  </StyledCardContent>
                </CardActionArea>
              </StyledCard>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Categories
            </Typography>
            <Card>
              <List>
                {categories.map((category, index) => (
                  <React.Fragment key={category}>
                    <ListItem button>
                      <ListItemText primary={category} />
                    </ListItem>
                    {index < categories.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}