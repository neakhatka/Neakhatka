'use client'
import React, { createContext, useState, ReactNode } from "react";

interface CardModal {
  id: string;
  companyId: string;
  companyLogo: string;
  title: string;
  description: string;
  location: string;
  type: string;
  deadline: string;
  salary: number[];
  available_position: number;
  people: number;
  duration: number;
  gender: string;
  language: string[];
  requirements: string[];
  responsibilities: string[];
  createdAt: string;
  updatedAt: string;
}

interface CardContextProp {
  children: ReactNode;
}

interface ContextProps {
  CardInfo: CardModal[];
  setCardInfo: React.Dispatch<React.SetStateAction<CardModal[]>>;
}

export const MyContext = createContext<ContextProps>({
  CardInfo: [], // Initial state should match CardModal[]
  setCardInfo: () => {},
});

const CardContext: React.FC<CardContextProp> = ({ children }) => {
  const [CardInfo, setCardInfo] = useState<CardModal[]>([]); // Initialize with an empty array of CardModal

  const Contextvalue = {
    CardInfo,
    setCardInfo,
  };

  return (
    <MyContext.Provider value={Contextvalue}>{children}</MyContext.Provider>
  );
};

export default CardContext;
