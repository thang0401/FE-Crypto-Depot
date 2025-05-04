import { Home } from 'lucide-react'
import { NextPage } from 'next'
import React from 'react'
import Blog from 'src/components/blog'

const BlogPage : NextPage = () => {
  return (
    <Blog/>
  )
}
BlogPage.guestGuard = true
BlogPage.authGuard = false
export default BlogPage