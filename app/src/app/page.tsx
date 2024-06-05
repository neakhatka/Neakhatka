"use client";
import {
  Banner,
  CardReview,
  Footer,
  Nav,
} from "@/components";
import "./globals.css";
import CardTip from "@/components/molecules/Card/CardTip";
import CardList from "@/components/molecules/Card/CardList";
import { CountProvider } from "@/contexts/CountContext";
import CardContext from "@/contexts/CardInfoContext";

export default function Home() {
  return (
    <>
      <CountProvider>
        <Nav />
        <CardContext>
          <Banner />
          <CardTip />
          <CardList />
          <CardReview />
        </CardContext>
        <Footer />
      </CountProvider>
    </>
  );
}
