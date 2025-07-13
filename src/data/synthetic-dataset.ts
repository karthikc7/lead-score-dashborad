// Synthetic dataset for ML model training
export interface LeadData {
  email: string;
  phoneNumber: string;
  creditScore: number;
  ageGroup: string;
  familyBackground: string;
  income: number;
  employmentStatus: string;
  region: string;
  propertyType: string;
  budgetRange: string;
  previousInquiries: number;
  timeOnSite: number;
  pageViews: number;
  downloadedBrochure: boolean;
  attendedWebinar: boolean;
  intent: number; // 0-100 target variable
}

// Generate synthetic dataset with meaningful relationships
export const generateSyntheticDataset = (size: number = 10000): LeadData[] => {
  const data: LeadData[] = [];
  
  const ageGroups = ['18-25', '26-35', '36-50', '51+'];
  const familyBackgrounds = ['Single', 'Married', 'Married with Kids'];
  const employmentStatuses = ['Employed - Full Time', 'Employed - Part Time', 'Self Employed', 'Unemployed', 'Student', 'Retired'];
  const regions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad'];
  const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial'];
  const budgetRanges = ['Below 50L', '50L-1Cr', '1Cr-2Cr', '2Cr+'];
  
  for (let i = 0; i < size; i++) {
    // Generate correlated features
    const ageGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)];
    const familyBackground = familyBackgrounds[Math.floor(Math.random() * familyBackgrounds.length)];
    const employmentStatus = employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)];
    
    // Income correlation with age and employment
    let baseIncome = 300000;
    if (ageGroup === '26-35') baseIncome = 600000;
    else if (ageGroup === '36-50') baseIncome = 900000;
    else if (ageGroup === '51+') baseIncome = 700000;
    
    if (employmentStatus === 'Self Employed') baseIncome *= 1.5;
    else if (employmentStatus === 'Unemployed') baseIncome *= 0.3;
    else if (employmentStatus === 'Student') baseIncome *= 0.2;
    
    const income = Math.max(100000, baseIncome + (Math.random() - 0.5) * 400000);
    
    // Credit score correlation with income and age
    let baseCreditScore = 600;
    if (income > 800000) baseCreditScore = 750;
    else if (income > 500000) baseCreditScore = 680;
    else if (income > 300000) baseCreditScore = 640;
    
    if (ageGroup === '18-25') baseCreditScore -= 50;
    else if (ageGroup === '51+') baseCreditScore += 30;
    
    const creditScore = Math.max(300, Math.min(850, baseCreditScore + (Math.random() - 0.5) * 100));
    
    // Digital engagement patterns
    const timeOnSite = Math.random() * 3600; // seconds
    const pageViews = Math.floor(Math.random() * 50) + 1;
    const previousInquiries = Math.floor(Math.random() * 10);
    const downloadedBrochure = Math.random() > 0.7;
    const attendedWebinar = Math.random() > 0.85;
    
    // Calculate intent score based on multiple factors
    let intent = 30; // base intent
    
    // Credit score influence
    if (creditScore >= 750) intent += 25;
    else if (creditScore >= 650) intent += 15;
    else if (creditScore >= 550) intent += 5;
    
    // Income influence
    if (income >= 800000) intent += 20;
    else if (income >= 500000) intent += 15;
    else if (income >= 300000) intent += 10;
    
    // Age group influence
    if (ageGroup === '26-35' || ageGroup === '36-50') intent += 15;
    else if (ageGroup === '18-25') intent += 10;
    
    // Family background influence
    if (familyBackground === 'Married with Kids') intent += 12;
    else if (familyBackground === 'Married') intent += 8;
    
    // Employment influence
    if (employmentStatus === 'Employed - Full Time') intent += 8;
    else if (employmentStatus === 'Self Employed') intent += 6;
    
    // Digital engagement influence
    if (downloadedBrochure) intent += 15;
    if (attendedWebinar) intent += 20;
    if (timeOnSite > 1800) intent += 10; // spent more than 30 minutes
    if (pageViews > 20) intent += 8;
    if (previousInquiries > 5) intent += 12;
    
    // Add some randomness
    intent += (Math.random() - 0.5) * 20;
    
    // Ensure intent is within bounds
    intent = Math.max(0, Math.min(100, Math.round(intent)));
    
    data.push({
      email: `user${i + 1}@example.com`,
      phoneNumber: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      creditScore: Math.round(creditScore),
      ageGroup,
      familyBackground,
      income: Math.round(income),
      employmentStatus,
      region: regions[Math.floor(Math.random() * regions.length)],
      propertyType: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
      budgetRange: budgetRanges[Math.floor(Math.random() * budgetRanges.length)],
      previousInquiries,
      timeOnSite: Math.round(timeOnSite),
      pageViews,
      downloadedBrochure,
      attendedWebinar,
      intent
    });
  }
  
  return data;
};

// Export the dataset
export const syntheticDataset = generateSyntheticDataset();