import { NextPage } from 'next'
import React from 'react'
import AboutUs from 'src/components/about-us/AboutUs'

const AboutUsPage: NextPage = () => {
  return (
    <AboutUs/>
  )
}
AboutUsPage.guestGuard = true
AboutUsPage.authGuard = false
export default AboutUsPage