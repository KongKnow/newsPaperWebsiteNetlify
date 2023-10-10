import Helmet from 'react-helmet'

import Header from "../header/Header"
import HeaderNav from "../header/HeaderNav"
import MainNews from "../mainNews/MainNews"
import SectionWrapper from "../sectionWrapper/SectionWrapper"
import SliderNews from "../sliderNews/SliderNews"
import Footer from "../footer/Footer"

const MainPage = () => {
    return (
      <>
        <Helmet>
            <title>Mag Magazine - Breaking news, World news</title>
        </Helmet>
        <Header>
          <HeaderNav/>
        </Header>
        <MainNews/>
        <SectionWrapper/>
        <SliderNews/>
        <Footer/>
      </>
    );
  }
  
  export default MainPage;
  