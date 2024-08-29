import React, { useEffect, useState } from "react";
import "intro.js/introjs.css"; // Import Intro.js styles
import { homeIntroSteps } from "../../types"; // Adjust the path to your steps
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenuContainer";
import FoodDisplay from "../../containers/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import AnimatedBox from "../../helpers/Animation/AnimateBox/AnimateBox";
import ChatBotBtn from "../../components/ChatBotBtn/ChatBotBtn";
import AdSlider from "../../components/AdSlider/AdSlider";
import Infinite from "../../components/Infinite/Infinite";
import ErrorBoundary from "../../helpers/ErrorBoundary/ErrorBoundary";
import Loading from "../Loading/Loading"; // Adjust path as needed
import IntroBtn from "../../components/IntroBtn/IntroBtn";
import { useLocation } from "react-router-dom";
import "./home.scss";
import CTA from "../../components/CTA/CTA";
interface HomeProps {
  searchName: string;
}

const Home: React.FC<HomeProps> = ({ searchName }) => {
  const [category, setCategory] = useState<string>("All");
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <div className='home'>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <IntroBtn className='btn-intro-home' steps={homeIntroSteps} />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <AdSlider />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <Header />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <ExploreMenu category={category} setCategory={setCategory} />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <FoodDisplay category={category} searchName={searchName} />
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <Infinite />
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <AppDownload />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <AnimatedBox>
            <CTA />
          </AnimatedBox>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
