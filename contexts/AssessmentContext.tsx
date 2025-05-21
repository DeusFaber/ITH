
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AssessmentResult, SavedAssessment } from '../lib/assessmentTypes';

// Define the context types
interface AssessmentContextType {
  currentResult: AssessmentResult | null;
  assessmentHistory: SavedAssessment[];
  saveAssessment: (result: AssessmentResult, answers: Record<string, string>) => void;
  setCurrentResult: (result: AssessmentResult | null) => void;
  clearCurrentResult: () => void;
  compareWithPrevious: (assessmentId: string) => {
    current: SavedAssessment | null;
    previous: SavedAssessment | null;
    improvement: number;
  } | null;
  getAssessmentById: (id: string) => SavedAssessment | undefined;
  deleteAssessment: (id: string) => void;
}

// Create the context with default values
const AssessmentContext = createContext<AssessmentContextType>({
  currentResult: null,
  assessmentHistory: [],
  saveAssessment: () => {},
  setCurrentResult: () => {},
  clearCurrentResult: () => {},
  compareWithPrevious: () => null,
  getAssessmentById: () => undefined,
  deleteAssessment: () => {},
});

// Hook for easy use of the context
export const useAssessment = () => useContext(AssessmentContext);

// Create the provider component
export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<SavedAssessment[]>([]);

  // Load assessment history from localStorage on initial render
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('assessmentHistory');
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          // Make sure it's an array
          if (Array.isArray(parsedHistory)) {
            // Additional validation - ensure each item has required fields
            const validHistory = parsedHistory.filter(item => {
              return item && 
                     typeof item === 'object' && 
                     item.id && 
                     item.date && 
                     item.result && 
                     typeof item.result === 'object';
            });
            
            setAssessmentHistory(validHistory);
            
            // Log if items were filtered out
            if (validHistory.length !== parsedHistory.length) {
              console.warn(`Filtered out ${parsedHistory.length - validHistory.length} invalid assessment records`);
            }
          } else {
            console.error("Assessment history is not an array, initializing empty array");
            setAssessmentHistory([]);
          }
        } catch (error) {
          console.error("Failed to parse assessment history:", error);
          setAssessmentHistory([]);
        }
      }
    } catch (e) {
      // Handle potential localStorage access exceptions
      console.error("Error accessing localStorage:", e);
      setAssessmentHistory([]);
    }
  }, []);

  // Save assessment history to localStorage whenever it changes
  useEffect(() => {
    try {
      // Always save history, even if empty (to clear previous data)
      localStorage.setItem('assessmentHistory', JSON.stringify(assessmentHistory || []));
    } catch (error) {
      console.error("Failed to save assessment history to localStorage:", error);
    }
  }, [assessmentHistory]);

  // Save a new assessment to history
  const saveAssessment = (result: AssessmentResult, answers: Record<string, string>) => {
    // Ensure we have valid input data
    if (!result || typeof result !== 'object') {
      console.error("Invalid assessment result data");
      return "";
    }
    
    // Validate that answers exist
    const validAnswers = answers && typeof answers === 'object' ? answers : {};
    
    // Create a standardized assessment object with all required fields
    const newAssessment: SavedAssessment = {
      id: `assessment-${Date.now()}`,
      date: new Date().toISOString(),
      result: { 
        ...result,
        // Ensure critical fields exist with defaults if missing
        score: result.score ?? 0,
        maturityLevel: result.maturityLevel ?? "basic",
        insights: Array.isArray(result.insights) ? result.insights : []
      },
      answers: { ...validAnswers },
    };

    setAssessmentHistory(prev => {
      // Ensure prev is an array
      const validPrev = Array.isArray(prev) ? prev : [];
      return [newAssessment, ...validPrev];
    });
    
    return newAssessment.id;
  };

  // Clear the current result
  const clearCurrentResult = () => {
    setCurrentResult(null);
  };

  // Get assessment by ID
  const getAssessmentById = (id: string) => {
    return assessmentHistory.find(a => a.id === id);
  };

  // Delete an assessment from history
  const deleteAssessment = (id: string) => {
    setAssessmentHistory(prev => prev.filter(a => a.id !== id));
  };

  // Compare an assessment with the previous one
  const compareWithPrevious = (assessmentId: string) => {
    if (!assessmentId || !Array.isArray(assessmentHistory) || assessmentHistory.length < 2) {
      return null;
    }
    
    const currentIndex = assessmentHistory.findIndex(a => a && a.id === assessmentId);
    
    if (currentIndex === -1 || currentIndex === assessmentHistory.length - 1) {
      return null;
    }

    const current = assessmentHistory[currentIndex];
    const previous = assessmentHistory[currentIndex + 1];
    
    // Additional validation to ensure we have valid objects with required properties
    if (!current || !previous || !current.result || !previous.result || 
        !current.result.maturityLevel || !previous.result.maturityLevel) {
      console.error("Invalid assessment data for comparison");
      return null;
    }

    // Calculate improvement (simplified example - in reality, this would be more complex)
    const calculateMaturityScore = (level: "basic" | "stable" | "smart") => {
      switch (level) {
        case "basic": return 1;
        case "stable": return 2;
        case "smart": return 3;
        default: return 0;
      }
    };

    try {
      const currentScore = calculateMaturityScore(current.result.maturityLevel);
      const previousScore = calculateMaturityScore(previous.result.maturityLevel);
      
      // Avoid division by zero
      const improvement = previousScore === 0 
        ? 0 
        : ((currentScore - previousScore) / previousScore) * 100;

      return {
        current,
        previous,
        improvement
      };
    } catch (error) {
      console.error("Error calculating assessment improvement:", error);
      return null;
    }
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentResult,
        assessmentHistory,
        saveAssessment,
        setCurrentResult,
        clearCurrentResult,
        compareWithPrevious,
        getAssessmentById,
        deleteAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};
