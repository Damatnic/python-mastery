// Mini datasets for Project Threads - embedded in each challenge so Pyodide can run them

export const PERMITS_MINI_CSV = `Permit Number|Permit Type|Street Number|Street Name|Status|Filed Date|Issued Date|Neighborhood|Existing Use|Proposed Use
BP2023-0001|alterations|450|Market St|issued|2023-01-15|2023-02-10|Financial District|office|office
BP2023-0002|new construction|1200|Mission St|complete|2023-01-18|2023-02-28|SoMa|vacant lot|apartments
BP2023-0003|additions|2847|24th St|issued|2023-01-22|2023-03-05|Mission|1 family dwelling|1 family dwelling
BP2023-0004|alterations|555|California St|cancelled|2023-01-25||Nob Hill|office|office
BP2023-0005|demolition|890|Folsom St|complete|2023-02-01|2023-02-15|SoMa|warehouse|vacant lot
BP2023-0006|new construction|3200|16th St|issued|2023-02-05|2023-04-01|Mission|parking lot|retail
BP2023-0007|alterations|100|Van Ness Ave|withdrawn|2023-02-10||Civic Center|retail|restaurant
BP2023-0008|sign erection|1800|Haight St|complete|2023-02-12|2023-02-20|Haight-Ashbury|retail|retail
BP2023-0009|additions|4521|Judah St|issued|2023-02-15|2023-04-10|Sunset|1 family dwelling|2 family dwelling
BP2023-0010|alterations|601|Montgomery St|issued|2023-02-18|2023-03-25|Financial District|office|office
BP2023-0011|new construction|2100|Folsom St|expired|2023-02-20|2023-03-30|Mission|vacant lot|apartments
BP2023-0012|alterations|789|Brannan St|complete|2023-02-22|2023-04-05|SoMa|warehouse|office
BP2023-0013|demolition|1550|Howard St|complete|2023-02-25|2023-03-10|SoMa|industrial|vacant lot
BP2023-0014|additions|3845|Noriega St|issued|2023-03-01|2023-05-01|Sunset|1 family dwelling|1 family dwelling
BP2023-0015|new construction|425|Mission St|issued|2023-03-05|2023-06-15|Financial District|parking lot|office tower`;

export const SURVEY_MINI_CSV = `RespondentID,Country,Age,YearsExperience,LanguageUsed,Salary,RemoteWork,Education,JobTitle
1001,USA,28,5,Python,95000,Yes,Bachelor's,Data Scientist
1002,India,24,2,Python,28000,Yes,Master's,Data Analyst
1003,USA,35,12,Python,145000,No,Master's,Senior Data Engineer
1004,Canada,29,6,R,82000,Yes,PhD,Research Scientist
1005,UK,31,8,Python,78000,Hybrid,Master's,Machine Learning Engineer
1006,Germany,27,4,SQL,65000,No,Bachelor's,Data Analyst
1007,USA,42,18,Python,175000,Yes,PhD,Principal Data Scientist
1008,India,26,3,Python,32000,Yes,Bachelor's,Data Analyst
1009,USA,33,9,Java,125000,No,Master's,Data Engineer
1010,Canada,38,14,Python,115000,Hybrid,Bachelor's,Senior Data Scientist
1011,UK,25,2,R,45000,Yes,Master's,Junior Data Scientist
1012,India,30,7,Python,48000,Yes,Master's,Data Scientist
1013,USA,29,5,Python,98000,Hybrid,Bachelor's,Data Scientist
1014,Australia,34,10,Python,105000,Yes,Master's,Machine Learning Engineer
1015,Germany,28,4,SQL,58000,No,Bachelor's,Business Analyst`;

export const SALES_MINI_CSV = `SaleID,SalesRep,Region,Product,Category,Quantity,UnitPrice,SaleDate,CustomerSegment
S001,Alice Chen,North,Widget Pro,Electronics,15,49.99,2023-01-05,Enterprise
S002,Bob Martinez,South,Gadget Plus,Tools,8,29.99,2023-01-08,SMB
S003,Carol Davis,East,Widget Pro,Electronics,22,49.99,2023-01-10,Enterprise
S004,Dan Wilson,West,Super Tool,Tools,45,19.99,2023-01-12,Consumer
S005,Eva Brown,North,Power Unit,Electronics,10,89.99,2023-01-15,Enterprise
S006,Alice Chen,North,Gadget Plus,Tools,30,29.99,2023-01-18,SMB
S007,Bob Martinez,South,Widget Pro,Electronics,18,49.99,2023-01-20,Consumer
S008,Carol Davis,East,Super Tool,Tools,55,19.99,2023-02-01,SMB
S009,Dan Wilson,West,Power Unit,Electronics,8,89.99,2023-02-05,Enterprise
S010,Eva Brown,North,Widget Basic,Electronics,65,24.99,2023-02-10,Consumer
S011,Alice Chen,North,Super Tool,Tools,40,19.99,2023-02-15,Consumer
S012,Bob Martinez,South,Power Unit,Electronics,12,89.99,2023-02-20,Enterprise
S013,Carol Davis,East,Gadget Plus,Tools,25,29.99,2023-03-01,SMB
S014,Dan Wilson,West,Widget Pro,Electronics,20,49.99,2023-03-05,Enterprise
S015,Eva Brown,North,Widget Basic,Electronics,80,24.99,2023-03-10,Consumer`;

export const PROJECT_THREAD_INFO = {
  permits: {
    id: "permits" as const,
    title: "SF Permits Analysis",
    description: "You are a junior data analyst for the SF city planning department. Analyze building permit data to produce a weekly summary report.",
    icon: "🏗️",
    modules: [1, 2],
  },
  survey: {
    id: "survey" as const,
    title: "Survey Insights Report",
    description: "A tech recruiter hired you to analyze a developer survey and produce insights for their clients.",
    icon: "📊",
    modules: [3, 4],
  },
  sales: {
    id: "sales" as const,
    title: "Sales Performance Dashboard",
    description: "A retail startup hired you to automate their sales reporting pipeline.",
    icon: "💰",
    modules: [5, 6, 7],
  },
};
