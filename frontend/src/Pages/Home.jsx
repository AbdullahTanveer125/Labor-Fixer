import React from 'react'
import FirstNavbar from '../Components/FirstNavbar'
import Footer from '../Components/Footer'
import FirstMainSection from '../Components/FirstMainSection'
import StatsSection from '../Components/StatsSection'
import FAQsSection from '../Components/FAQsSection'
import TestimonialsSection from '../Components/TestimonialsSection'
import { useSelector } from "react-redux";


function Home() {

    const { user, token, isAuthenticated } = useSelector((state) => state.user);


    console.log("User in Home Page: ", user);
    console.log("Token in Home Page: ", token);

    
    return (
        <div className='bg-slate-100'>
            <FirstNavbar />
            <FirstMainSection />
            <StatsSection />
            <FAQsSection />
            <TestimonialsSection />
            <Footer />
        </div>
    )
}

export default Home
