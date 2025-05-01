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
  { id: 4, title: 'SUI: Hệ Sinh Thái Phi Tập Trung Hiệu Quả và An Toàn', excerpt: 'Dự án SUI là một blockchain hiệu suất cao, mang lại bảo mật và khả năng mở rộng vượt trội nhờ mô hình dữ liệu đối tượng.', image: '/sui-placeholder.svg?height=200&width=300' },
  { id: 5, title: 'NEAR: Blockchain Thân Thiện Với Nhà Phát Triển và Người Dùng', excerpt: 'NEAR Protocol là một blockchain hiệu suất cao, thân thiện với cả nhà phát triển và người dùng.', image: '/near-placeholder.svg?height=200&width=300' },
  { id: 6, title: 'USDC: Blockchain Nhanh và Chi Phí Thấp', excerpt: 'USDC là một blockchain cực nhanh với chi phí giao dịch cực thấp, thu hút nhiều dự án DeFi, NFT và Web3.', image: '/USDC-placeholder.svg?height=200&width=300' },
  { id: 1, title: 'Tương Lai của Tài Chính Phi Tập Trung', excerpt: 'Khám phá tiềm năng của tài chính phi tập trung.', image: '/placeholder.svg?height=200&width=300' },
  { id: 2, title: 'NFT: Nghệ Thuật Kỹ Thuật Số', excerpt: 'Cách các mã thông báo không thể thay thế đang cách mạng hóa nhiều ngành công nghiệp...', image: '/placeholder.svg?height=200&width=300' },
  { id: 3, title: 'Web3 và Kinh Tế Sáng Tạo', excerpt: 'Cách blockchain đang trao quyền cho các nhà sáng tạo nội dung.', image: '/placeholder.svg?height=200&width=300' },
]

const categories = ['Tài Chính Phi Tập Trung', 'NFT', 'DAO', 'Layer 2', 'Vũ Trụ Ảo']

export default function Blog() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginLeft: 30 }}>Blog Web3 và Tiền Mã Hóa</h2>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Bài Viết Mới Nhất
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
                      {new Date().toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post.excerpt}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Đọc tiếp ...
                    </Typography>
                  </StyledCardContent>
                </CardActionArea>
              </StyledCard>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Tài khoản
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
