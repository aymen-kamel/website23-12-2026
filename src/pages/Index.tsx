import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import LoveQuestionSection from "@/components/LoveQuestionSection";
import StorySection from "@/components/StorySection";
import FunnyGeneratorSection from "@/components/FunnyGeneratorSection";
import HeartCatchGame from "@/components/HeartCatchGame";
import MemoriesSection from "@/components/MemoriesSection";
import BucketListSection from "@/components/BucketListSection";
import DailyMessageSection from "@/components/DailyMessageSection";
import LoveMessageSection from "@/components/LoveMessageSection";
import FinalSection from "@/components/FinalSection";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <HeroSection onStart={scrollToContent} />
      <div ref={contentRef}>
        <LoveQuestionSection />
        <StorySection />
        <DailyMessageSection />
        <FunnyGeneratorSection />
        <HeartCatchGame />
        <MemoriesSection />
        <BucketListSection />
        <LoveMessageSection />
        <FinalSection onReplay={scrollToTop} />
      </div>
    </div>
  );
};

export default Index;
