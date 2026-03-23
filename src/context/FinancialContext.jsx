import React, { createContext, useContext, useState, useCallback } from 'react';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  // ── CORE STATE ──────────────────────────
  const [farmerProfile, setFarmerProfile] = useState({ name: '', landSize: 0, incomeGroup: 'medium' });
  const [walletBalance, setWalletBalance] = useState(10000);
  const [bankDebt, setBankDebt] = useState(0);
  const [sahukarDebt, setSahukarDebt] = useState(5000);
  const [arthaScore, setArthaScore] = useState(50);
  const [language, setLanguage] = useState('hi');
  const [claimedSchemes, setClaimedSchemes] = useState([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const BANK_INTEREST = 0.04;    // 4% Annual
  const SAHUKAR_INTEREST = 0.24; // 24% Annual

  // Log a financial mistake silently into the tracker (Stubbed for backward compatibility if needed)
  const logMistake = useCallback(() => {}, []);

  const advanceMonth = useCallback(() => {}, []);

  const registerTransaction = useCallback((amount, type, options = {}) => {
    setWalletBalance(prev => prev + amount);
    
    // Handle Debt Logic
    if (type === 'loan') {
      if (options.debtType === 'bank') setBankDebt(prev => prev + Math.abs(amount));
      else setSahukarDebt(prev => prev + Math.abs(amount));
    }
    
    if (type === 'loan_repay') {
      const repayAmount = Math.abs(amount);
      if (options.debtType === 'bank') setBankDebt(prev => Math.max(0, prev - repayAmount));
      else setSahukarDebt(prev => Math.max(0, prev - repayAmount));
    }

    if (options.scoreChange !== undefined) {
      setArthaScore(prev => Math.min(100, Math.max(0, prev + options.scoreChange)));
    } else if (type === 'loan' && amount > 0) {
      setArthaScore(prev => Math.max(0, prev - 10));
    } else if (type === 'loan_repay') {
      setArthaScore(prev => Math.min(100, prev + 15));
    }
  }, []);

  const claimScheme = useCallback((amount, schemeId) => {
    setWalletBalance(prev => prev + amount);
    setClaimedSchemes(prev => [...prev, schemeId]);
    setArthaScore(prev => Math.min(100, prev + 10));
  }, []);

  const resetGame = useCallback(() => {
    setWalletBalance(farmerProfile.incomeGroup === 'poor' ? 5000 : 15000);
    setBankDebt(0);
    setSahukarDebt(5000);
    setArthaScore(50);
    setClaimedSchemes([]);
  }, [farmerProfile]);

  const completeFirstVisit = useCallback(() => setIsFirstVisit(false), []);

  const value = {
    farmerProfile, setFarmerProfile,
    walletBalance, setWalletBalance,
    bankDebt, setBankDebt,
    sahukarDebt, setSahukarDebt,
    arthaScore, setArthaScore,
    language, setLanguage,
    claimedSchemes,
    isFirstVisit,
    logMistake,
    advanceMonth,
    registerTransaction,
    claimScheme,
    resetGame,
    completeFirstVisit,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFinancials = () => {
  const context = useContext(FinancialContext);
  if (!context) throw new Error('useFinancials must be used within a FinancialProvider');
  return context;
};
 
 
