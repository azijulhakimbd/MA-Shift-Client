import React from 'react';
import Banner from './Banner/Banner';
import HowItWorks from './HowitsWorks/HowItWorks';
import OurServices from './OurServices/OurServices';
import OurClient from './OurClient/OurClient';
import InfoCard from './InfoCard/InfoCard';
import Merchant from './Merchant/Merchant';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import FAQ from './FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <OurClient></OurClient>
            <InfoCard></InfoCard>
            <Merchant></Merchant>
            <CustomerReviews></CustomerReviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;