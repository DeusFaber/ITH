
// Skill level distribution data for team skills visualization
export type SkillLevelDistribution = {
  name: string;
  value: number;
  color: string;
};

// Calculate team skill distribution from mockTeamSkills in mockSkillsData.ts
// This would normally be calculated from actual team data
export const teamSkillDistribution: SkillLevelDistribution[] = [
  { 
    name: "Expert", 
    value: 35, 
    color: "var(--color-blue)" 
  },
  { 
    name: "Advanced", 
    value: 25, 
    color: "var(--color-gold)" 
  },
  { 
    name: "Intermediate", 
    value: 30, 
    color: "var(--color-primary)" 
  },
  { 
    name: "Beginner", 
    value: 10, 
    color: "var(--color-navy)" 
  }
];

// Skill category distribution data
export const skillCategoryDistribution = [
  { 
    name: "Infrastructure", 
    value: 28, 
    color: "var(--color-blue)" 
  },
  { 
    name: "Security", 
    value: 25, 
    color: "var(--color-primary)" 
  },
  { 
    name: "Cloud", 
    value: 22, 
    color: "var(--color-gold)" 
  },
  { 
    name: "Support", 
    value: 15, 
    color: "var(--color-navy)" 
  },
  { 
    name: "Other", 
    value: 10, 
    color: "#6c7281" // Using muted-foreground color
  }
];
