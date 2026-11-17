import { Question } from '../types/exam';

export const EXAM_QUESTIONS: Question[] = [
  // SECTION A: Questions 1 to 25 (2 marks each)
  {
    id: 1,
    section: 'Section A',
    chapter: 'Accounting for Material',
    marks: 2,
    title: 'Economic Order Quantity (EOQ)',
    scenario:
      'Apex Manufacturing Ltd uses material RM-20 in its production process. The company has compiled the following inventory parameters for the upcoming financial year:\n\n' +
      '• Annual demand: 12,000 units\n' +
      '• Cost of placing and processing one purchase order: $45\n' +
      '• Annual holding cost per unit: $3.00\n' +
      '• Purchase price per unit: $25.00',
    questionText: 'What is the Economic Order Quantity (EOQ) for material RM-20?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '600 units' },
      { id: 'opt2', text: '400 units' },
      { id: 'opt3', text: '1,200 units' },
      { id: 'opt4', text: '850 units' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Using the EOQ formula:\n' +
      'EOQ = √[(2 × Co × D) / Ch]\n' +
      '= √[(2 × $45 × 12,000) / $3]\n' +
      '= √[1,080,000 / 3] = √360,000 = 600 units.',
    workingSteps: [
      'Identify parameters: D = 12,000 units, Co = $45, Ch = $3.00',
      'Numerator = 2 × 45 × 12,000 = 1,080,000',
      'Divide by Ch: 1,080,000 / 3 = 360,000',
      'Square root: √360,000 = 600 units',
    ],
  },
  {
    id: 2,
    section: 'Section A',
    chapter: 'Accounting for Material',
    marks: 2,
    title: 'Reorder Level Determination',
    scenario:
      'A component is consumed continuously in production. The inventory records reveal the following operating data:\n\n' +
      '• Maximum usage: 180 units per day\n' +
      '• Normal usage: 150 units per day\n' +
      '• Minimum usage: 120 units per day\n' +
      '• Lead time from supplier: 3 to 5 working days',
    questionText: 'What is the control reorder level to prevent stockouts?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '900 units' },
      { id: 'opt2', text: '750 units' },
      { id: 'opt3', text: '600 units' },
      { id: 'opt4', text: '1,050 units' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Reorder level is set to cover the worst-case scenario during replenishment:\n' +
      'Reorder level = Maximum usage × Maximum lead time\n' +
      '= 180 units/day × 5 days = 900 units.',
    workingSteps: [
      'Maximum usage = 180 units per day',
      'Maximum lead time = 5 days',
      'Reorder level = 180 × 5 = 900 units',
    ],
  },
  {
    id: 3,
    section: 'Section A',
    chapter: 'Accounting for Material',
    marks: 2,
    title: 'Maximum Inventory Level',
    scenario:
      'Kestrel Ltd operates an inventory control system with the following control parameters:\n\n' +
      '• Reorder level: 900 units\n' +
      '• Reorder quantity: 1,000 units\n' +
      '• Minimum usage: 120 units per day\n' +
      '• Minimum lead time: 3 days',
    questionText: 'What is the maximum inventory control level?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '1,540 units' },
      { id: 'opt2', text: '1,900 units' },
      { id: 'opt3', text: '1,420 units' },
      { id: 'opt4', text: '1,660 units' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Maximum stock level = Reorder level + Reorder quantity - (Minimum usage × Minimum lead time)\n' +
      '= 900 + 1,000 - (120 × 3)\n' +
      '= 1,900 - 360 = 1,540 units.',
    workingSteps: [
      'Reorder level + Reorder quantity = 900 + 1,000 = 1,900 units',
      'Minimum consumption in minimum lead time = 120 × 3 = 360 units',
      'Maximum stock level = 1,900 - 360 = 1,540 units',
    ],
  },
  {
    id: 4,
    section: 'Section A',
    chapter: 'Accounting for Material',
    marks: 2,
    title: 'Inventory Valuation: FIFO vs AVCO',
    scenario:
      'During November, Delta Traders recorded the following inventory movements for raw material X:',
    tableData: {
      title: 'Material Movements (November)',
      headers: ['Date', 'Transaction', 'Units', 'Unit Cost ($)'],
      rows: [
        ['1 Nov', 'Opening Balance', 100, '5.00'],
        ['5 Nov', 'Receipt', 200, '6.00'],
        ['12 Nov', 'Issue to production', 150, '-'],
        ['18 Nov', 'Receipt', 150, '7.00'],
        ['25 Nov', 'Issue to production', 180, '-'],
      ],
    },
    questionText: 'What is the value of closing inventory at 30 November using the First-In, First-Out (FIFO) method?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$840' },
      { id: 'opt2', text: '$780' },
      { id: 'opt3', text: '$720' },
      { id: 'opt4', text: '$910' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Closing units = 100 + 200 - 150 + 150 - 180 = 120 units.\n' +
      'Under FIFO, the remaining 120 units come from the most recent receipt on 18 Nov ($7.00/unit).\n' +
      'Closing inventory value = 120 units × $7.00 = $840.',
    workingSteps: [
      'Total units available = 100 + 200 + 150 = 450 units',
      'Total units issued = 150 + 180 = 330 units',
      'Closing units remaining = 450 - 330 = 120 units',
      'Under FIFO, the earliest receipts are issued first, so closing units are from 18 Nov batch @ $7: 120 × $7 = $840',
    ],
  },
  {
    id: 5,
    section: 'Section A',
    chapter: 'Accounting for Material',
    marks: 2,
    title: 'Average Inventory and Safety Stock',
    scenario:
      'A company maintains a safety buffer inventory of 300 units. The company orders 1,400 units every time a purchase order is placed. The annual holding cost is $4 per unit.',
    questionText: 'What is the average inventory level held by the company?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '1,000 units' },
      { id: 'opt2', text: '700 units' },
      { id: 'opt3', text: '1,400 units' },
      { id: 'opt4', text: '1,700 units' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Average inventory = Safety inventory + (Order quantity / 2)\n' +
      '= 300 + (1,400 / 2) = 300 + 700 = 1,000 units.',
    workingSteps: [
      'Safety stock = 300 units',
      'Half of order quantity = 1,400 / 2 = 700 units',
      'Average inventory = 300 + 700 = 1,000 units',
    ],
  },
  {
    id: 6,
    section: 'Section A',
    chapter: 'Accounting for Labor',
    marks: 2,
    title: 'Piecework with Guaranteed Minimum Wage',
    scenario:
      'An assembly worker is paid on a piecework rate of $3.50 per completed and inspected unit. The standard working week is 40 hours. The company guarantees a minimum basic wage of $14 per hour. In the current week, the worker completed 180 inspected units and worked 40 hours.',
    questionText: 'What are the gross wages payable to the worker for the week?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$630' },
      { id: 'opt2', text: '$560' },
      { id: 'opt3', text: '$1,190' },
      { id: 'opt4', text: '$610' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Piecework earnings = 180 units × $3.50 = $630.\n' +
      'Guaranteed minimum wage = 40 hours × $14 = $560.\n' +
      'Since piecework earnings ($630) exceed guaranteed pay ($560), the worker receives $630.',
    workingSteps: [
      'Piecework earnings = 180 × $3.50 = $630',
      'Guaranteed wage = 40 hours × $14/hour = $560',
      'Worker receives the higher of the two: $630',
    ],
  },
  {
    id: 7,
    section: 'Section A',
    chapter: 'Accounting for Labor',
    marks: 2,
    title: 'Rowan Bonus Scheme',
    scenario:
      'The standard time allowed to manufacture a custom bracket is 20 hours. An operative whose basic rate of pay is $15 per hour completes the bracket in 16 hours. The company operates the Rowan bonus incentive scheme.',
    questionText: 'What are the total gross earnings of the worker for this job?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$288' },
      { id: 'opt2', text: '$240' },
      { id: 'opt3', text: '$300' },
      { id: 'opt4', text: '$270' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Basic wage = 16 hours × $15 = $240.\n' +
      'Time saved = 20 - 16 = 4 hours.\n' +
      'Rowan Bonus = (Time Saved / Time Allowed) × Time Taken × Hourly Rate\n' +
      '= (4 / 20) × 16 × $15 = 0.20 × $240 = $48.\n' +
      'Total earnings = $240 + $48 = $288.',
    workingSteps: [
      'Basic wage for time taken = 16 hours × $15 = $240',
      'Time saved = 20 - 16 = 4 hours',
      'Bonus percentage = 4 / 20 = 20%',
      'Bonus amount = 20% × $240 = $48',
      'Total earnings = $240 + $48 = $288',
    ],
  },
  {
    id: 8,
    section: 'Section A',
    chapter: 'Accounting for Labor',
    marks: 2,
    title: 'Overtime Premium Classification',
    scenario:
      'A direct production employee whose basic pay rate is $12 per hour worked 46 hours during a busy week (standard week is 40 hours). Overtime is compensated at time-and-a-half ($18 per hour). The overtime was worked at the specific request of a customer to expedite delivery of Job #509.',
    questionText: 'How should the overtime premium of $48 (6 hours × $6) be classified in the cost accounting system?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: 'Direct labor cost charged directly to Job #509' },
      { id: 'opt2', text: 'Production overhead cost absorbed across all jobs' },
      { id: 'opt3', text: 'Administrative overhead written off to profit or loss' },
      { id: 'opt4', text: 'Direct expense shared between all open jobs' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'When overtime is worked specifically at the request of a customer to expedite an urgent order, both the basic pay and the overtime premium are charged directly to that specific job as a direct labor cost. (General overtime due to bottlenecks is treated as production overhead).',
    workingSteps: [
      'Normal overtime premium is treated as indirect labor / production overhead',
      'Exception: Overtime worked at specific customer request is charged directly to that job',
      'Therefore, the $48 premium is a Direct Labor cost of Job #509',
    ],
  },
  {
    id: 9,
    section: 'Section A',
    chapter: 'Accounting for Labor',
    marks: 2,
    title: 'Labor Turnover Rate',
    scenario:
      'A manufacturing business recorded 450 employees on its payroll at 1 January and 550 employees at 31 December. During the year, 70 employees left the company, and 50 new employees were recruited to replace those who had left.',
    questionText: 'What is the labor turnover rate for the year using the replacement method?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '10.0%' },
      { id: 'opt2', text: '14.0%' },
      { id: 'opt3', text: '12.0%' },
      { id: 'opt4', text: '8.5%' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Average workforce = (450 + 550) / 2 = 500 employees.\n' +
      'Labor turnover rate = (Replacements / Average workforce) × 100%\n' +
      '= (50 / 500) × 100% = 10.0%.',
    workingSteps: [
      'Average number of employees = (450 + 550) / 2 = 500',
      'Number of replacements = 50',
      'Turnover rate = (50 / 500) × 100% = 10.0%',
    ],
  },
  {
    id: 10,
    section: 'Section A',
    chapter: 'Accounting for Labor',
    marks: 2,
    title: 'Idle Time Cost Accounting',
    scenario:
      'During a severe power outage lasting 3 hours, 20 direct assembly workers were unable to work. Their regular wage rate is $14 per hour.',
    questionText: 'What is the appropriate accounting entry to record the idle time cost of $840?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: 'Debit: Production Overhead (Idle Time), Credit: Wages Control Account' },
      { id: 'opt2', text: 'Debit: Work-in-Progress Account, Credit: Wages Control Account' },
      { id: 'opt3', text: 'Debit: Wages Control Account, Credit: Production Overhead' },
      { id: 'opt4', text: 'Debit: Work-in-Progress Account, Credit: Cash' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Idle time cost (20 workers × 3 hrs × $14 = $840) is an indirect labor cost. It must be debited to Production Overhead (Idle time account) and credited to the Wages Control Account.',
    workingSteps: [
      'Cost = 20 × 3 × $14 = $840',
      'Direct workers idle time is not chargeable to WIP because no units were produced',
      'Entry: Dr Production Overhead Account, Cr Wages Control Account',
    ],
  },
  {
    id: 11,
    section: 'Section A',
    chapter: 'Accounting for Overheads',
    marks: 2,
    title: 'Predetermined Overhead Absorption Rate (OAR)',
    scenario:
      'Omega Ltd operates an automated CNC machining department. For the upcoming financial year, the following budget has been prepared:\n\n' +
      '• Budgeted production overheads: $420,000\n' +
      '• Budgeted machine hours: 70,000 hours\n' +
      '• Budgeted direct labor hours: 28,000 hours',
    questionText: 'What is the predetermined overhead absorption rate per machine hour?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$6.00 per machine hour' },
      { id: 'opt2', text: '$15.00 per machine hour' },
      { id: 'opt3', text: '$4.20 per machine hour' },
      { id: 'opt4', text: '$7.00 per machine hour' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Predetermined OAR = Budgeted production overheads / Budgeted activity level\n' +
      '= $420,000 / 70,000 machine hours = $6.00 per machine hour.',
    workingSteps: [
      'Budgeted overhead = $420,000',
      'Budgeted machine hours = 70,000',
      'OAR = $420,000 / 70,000 = $6.00 per machine hour',
    ],
  },
  {
    id: 12,
    section: 'Section A',
    chapter: 'Accounting for Overheads',
    marks: 2,
    title: 'Under- or Over-Absorption of Overhead',
    scenario:
      'A company absorbs production overhead based on direct labor hours with a predetermined OAR of $8.50 per hour. The actual operating results for the period were as follows:\n\n' +
      '• Actual direct labor hours worked: 32,000 hours\n' +
      '• Actual production overheads incurred: $264,000',
    questionText: 'What was the under- or over-absorption of production overhead for the period?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$8,000 over-absorbed' },
      { id: 'opt2', text: '$8,000 under-absorbed' },
      { id: 'opt3', text: '$16,000 over-absorbed' },
      { id: 'opt4', text: '$24,000 under-absorbed' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Overhead absorbed = Actual hours × Predetermined OAR\n' +
      '= 32,000 hours × $8.50 = $272,000.\n' +
      'Actual overhead incurred = $264,000.\n' +
      'Since Absorbed ($272,000) > Incurred ($264,000), overhead is OVER-ABSORBED by $8,000.',
    workingSteps: [
      'Overhead absorbed = 32,000 × $8.50 = $272,000',
      'Actual overhead incurred = $264,000',
      'Difference = $272,000 - $264,000 = $8,000 (Over-absorbed)',
    ],
  },
  {
    id: 13,
    section: 'Section A',
    chapter: 'Accounting for Overheads',
    marks: 2,
    title: 'Overhead Apportionment Basis',
    scenario:
      'In a factory comprising several production and service departments, management is selecting appropriate bases for apportioning indirect costs.',
    questionText: 'Which of the following cost-to-basis pairings is the MOST appropriate in cost accounting?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: 'Factory building insurance and heating: Floor area occupied' },
      { id: 'opt2', text: 'Factory canteen subsidy: Machine operating hours' },
      { id: 'opt3', text: 'Equipment depreciation: Number of employees' },
      { id: 'opt4', text: 'Personnel management costs: Kilowatt-hours consumed' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Building insurance, rent, rates, and heating relate directly to physical space, making floor area (or volume) the most rational apportionment basis. Canteen and personnel costs are based on employee headcount; machinery depreciation is based on machine book values.',
    workingSteps: [
      'Building space costs → Floor area',
      'Staff welfare / Canteen → Headcount',
      'Machinery depreciation → Asset carrying value',
      'Power / electricity → Machine kWh',
    ],
  },
  {
    id: 14,
    section: 'Section A',
    chapter: 'Accounting for Overheads',
    marks: 2,
    title: 'Reciprocal Service Apportionment',
    scenario:
      'Service department X provides services to Service department Y and production cost centres. The initial allocated overheads are:\n\n' +
      '• Department X: $50,000\n' +
      '• Department Y: $30,000\n' +
      '• Department X provides 10% of its services to Y\n' +
      '• Department Y provides 20% of its services to X',
    questionText: 'Using simultaneous equations, what is the total apportioned overhead of Department X?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$57,143' },
      { id: 'opt2', text: '$55,000' },
      { id: 'opt3', text: '$62,500' },
      { id: 'opt4', text: '$53,200' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Set up simultaneous equations:\n' +
      'X = 50,000 + 0.20Y\n' +
      'Y = 30,000 + 0.10X\n' +
      'Substitute Y into X: X = 50,000 + 0.20(30,000 + 0.10X)\n' +
      'X = 50,000 + 6,000 + 0.02X\n' +
      '0.98X = 56,000 => X = $57,143 (rounded).',
    workingSteps: [
      'X = 50,000 + 0.20Y',
      'Y = 30,000 + 0.10X',
      'X = 56,000 + 0.02X',
      '0.98X = 56,000 → X = $57,143',
    ],
  },
  {
    id: 15,
    section: 'Section A',
    chapter: 'Accounting for Overheads',
    marks: 2,
    title: 'Departmental vs Blanket Absorption Rates',
    scenario:
      'A factory produces three products: A, B, and C. The factory has two production departments: Department 1 is highly labor-intensive, while Department 2 is highly automated with robotic machinery.',
    questionText: 'Why is it preferable to calculate separate departmental OARs rather than a single blanket factory-wide OAR?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: 'Products consume differing proportions of resources in the two departments, so a blanket rate distorts unit costs' },
      { id: 'opt2', text: 'Blanket rates are prohibited by international accounting standards under all circumstances' },
      { id: 'opt3', text: 'A blanket rate always results in under-absorption of overheads' },
      { id: 'opt4', text: 'Departmental rates eliminate the need to calculate direct material and direct labor costs' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'When departments have markedly different cost structures (one labor-intensive, one machine-intensive) and products spend different amounts of time in each, a blanket rate causes product cross-subsidization and inaccurate pricing.',
    workingSteps: [
      'Different cost drivers in each department require distinct absorption bases (e.g. labor hours vs machine hours)',
      'A blanket rate over-costs simple products and under-costs complex ones',
    ],
  },
  {
    id: 16,
    section: 'Section A',
    chapter: 'Absorption and Marginal Costing',
    marks: 2,
    title: 'Profit Reconciliation Formula',
    scenario:
      'For a monthly reporting period, a company reported a profit of $92,000 under absorption costing. Inventory levels changed as follows:\n\n' +
      '• Opening inventory: 2,500 units\n' +
      '• Closing inventory: 3,400 units\n' +
      '• Predetermined fixed overhead absorption rate: $10 per unit',
    questionText: 'What is the reported profit under marginal costing for the period?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$83,000' },
      { id: 'opt2', text: '$101,000' },
      { id: 'opt3', text: '$92,000' },
      { id: 'opt4', text: '$74,000' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Profit difference = (Closing inventory - Opening inventory) × Fixed OAR\n' +
      '= (3,400 - 2,500) × $10 = 900 × $10 = $9,000.\n' +
      'Because inventory increased (Closing > Opening), Absorption Costing profit is HIGHER than Marginal Costing profit by $9,000.\n' +
      'Marginal Profit = $92,000 - $9,000 = $83,000.',
    workingSteps: [
      'Inventory change = 3,400 - 2,500 = +900 units',
      'Fixed overhead carried forward = 900 × $10 = $9,000',
      'Absorption profit > Marginal profit by $9,000',
      'Marginal profit = $92,000 - $9,000 = $83,000',
    ],
  },
  {
    id: 17,
    section: 'Section A',
    chapter: 'Absorption and Marginal Costing',
    marks: 2,
    title: 'Cost Behavior and High-Low Analysis',
    scenario:
      'Management wishes to separate semi-variable maintenance costs into fixed and variable elements using historical data:',
    tableData: {
      title: 'Activity and Maintenance Costs',
      headers: ['Month', 'Machine Hours', 'Total Maintenance Cost ($)'],
      rows: [
        ['January', '4,000', '31,000'],
        ['February', '6,500', '43,500'],
        ['March (Highest)', '8,000', '51,000'],
        ['April (Lowest)', '3,500', '28,500'],
      ],
    },
    questionText: 'What is the estimated total maintenance cost if 7,000 machine hours are budgeted for May?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$46,000' },
      { id: 'opt2', text: '$44,500' },
      { id: 'opt3', text: '$48,000' },
      { id: 'opt4', text: '$42,000' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'High level: 8,000 hours, $51,000\n' +
      'Low level: 3,500 hours, $28,500\n' +
      'Variable cost per hour = ($51,000 - $28,500) / (8,000 - 3,500) = $22,500 / 4,500 = $5.00/hour.\n' +
      'Fixed cost = $51,000 - (8,000 × $5.00) = $51,000 - $40,000 = $11,000.\n' +
      'Estimated cost for 7,000 hours = $11,000 + (7,000 × $5.00) = $11,000 + $35,000 = $46,000.',
    workingSteps: [
      'Variable cost = ($51,000 - $28,500) / (8,000 - 3,500) = $22,500 / 4,500 = $5.00',
      'Fixed cost = $51,000 - (8,000 × $5) = $11,000',
      'Total cost at 7,000 hours = $11,000 + (7,000 × $5) = $46,000',
    ],
  },
  {
    id: 18,
    section: 'Section A',
    chapter: 'Absorption and Marginal Costing',
    marks: 2,
    title: 'Breakeven Revenue and C/S Ratio',
    scenario:
      'Solaris Ltd manufactures solar inverters. For the coming quarter:\n\n' +
      '• Selling price: $160 per unit\n' +
      '• Variable production cost: $90 per unit\n' +
      '• Variable selling cost: $10 per unit\n' +
      '• Total fixed costs for the quarter: $180,000',
    questionText: 'What is the breakeven revenue for Solaris Ltd?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$480,000' },
      { id: 'opt2', text: '$411,429' },
      { id: 'opt3', text: '$320,000' },
      { id: 'opt4', text: '$540,000' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Total variable cost per unit = $90 + $10 = $100.\n' +
      'Contribution per unit = $160 - $100 = $60.\n' +
      'Contribution-to-Sales (C/S) ratio = $60 / $160 = 0.375 (37.5%).\n' +
      'Breakeven revenue = Fixed costs / C/S ratio = $180,000 / 0.375 = $480,000.',
    workingSteps: [
      'Contribution = $160 - ($90 + $10) = $60 per unit',
      'C/S ratio = $60 / $160 = 37.5%',
      'Breakeven revenue = $180,000 / 0.375 = $480,000 (or 3,000 units × $160 = $480,000)',
    ],
  },
  {
    id: 19,
    section: 'Section A',
    chapter: 'Absorption and Marginal Costing',
    marks: 2,
    title: 'Production Greater Than Sales',
    scenario:
      'In a manufacturing period, production volume exceeded sales volume by 4,000 units. There was no opening inventory.',
    questionText: 'Which of the following statements correctly compares reported profits under absorption costing and marginal costing?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: 'Absorption costing profit will be higher because fixed production overhead is deferred in closing inventory' },
      { id: 'opt2', text: 'Marginal costing profit will be higher because all fixed costs are expensed immediately' },
      { id: 'opt3', text: 'Both methods will report identical profits because sales volumes were identical' },
      { id: 'opt4', text: 'Absorption costing profit will be lower because under-absorbed overheads reduce gross profit' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'When production > sales, inventory increases. Under absorption costing, a portion of the period fixed production overhead is attached to the unsold closing inventory and carried forward to the next period. Under marginal costing, all fixed overhead is written off as a period expense immediately. Hence, absorption profit is higher.',
    workingSteps: [
      'Production > Sales → Closing inventory > Opening inventory',
      'Absorption costing capitalizes fixed overhead in asset inventory',
      'Absorption profit > Marginal profit',
    ],
  },
  {
    id: 20,
    section: 'Section A',
    chapter: 'Absorption and Marginal Costing',
    marks: 2,
    title: 'Unit Cost Classification',
    scenario:
      'Standard costs for product "Sigma" are provided below:\n\n' +
      '• Direct material: $18.00\n' +
      '• Direct labor: $12.00\n' +
      '• Variable production overhead: $5.00\n' +
      '• Fixed production overhead (based on normal capacity): $7.00\n' +
      '• Variable selling expense: $3.00\n' +
      '• Fixed administration expense: $4.00',
    questionText: 'What are the inventory valuation unit rates under (i) Marginal Costing and (ii) Absorption Costing?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: 'Marginal: $35.00; Absorption: $42.00' },
      { id: 'opt2', text: 'Marginal: $38.00; Absorption: $49.00' },
      { id: 'opt3', text: 'Marginal: $35.00; Absorption: $49.00' },
      { id: 'opt4', text: 'Marginal: $30.00; Absorption: $37.00' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Only production costs are included in inventory valuation (IAS 2 / ACCA rule).\n' +
      'Marginal costing unit cost = Direct material ($18) + Direct labor ($12) + Variable production overhead ($5) = $35.00.\n' +
      'Absorption costing unit cost = $35.00 + Fixed production overhead ($7.00) = $42.00.\n' +
      '(Selling and administrative costs are period costs).',
    workingSteps: [
      'Marginal production cost = 18 + 12 + 5 = $35.00',
      'Absorption production cost = 18 + 12 + 5 + 7 = $42.00',
      'Selling and admin costs are excluded from inventory valuation under both methods',
    ],
  },
  {
    id: 21,
    section: 'Section A',
    chapter: 'Job, Batch and Services Costing',
    marks: 2,
    title: 'Job Costing Selling Price Determination',
    scenario:
      'Job #880 requires the following cost inputs:\n\n' +
      '• Direct materials: $4,500\n' +
      '• Direct labor: 150 hours at $16 per hour\n' +
      '• Production overhead is absorbed at $22 per direct labor hour\n' +
      '• Non-production overheads are added at 15% of total production cost\n' +
      '• The company requires a profit margin of 20% on selling price',
    questionText: 'What is the quoted selling price for Job #880?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$14,662.50' },
      { id: 'opt2', text: '$12,240.00' },
      { id: 'opt3', text: '$13,800.00' },
      { id: 'opt4', text: '$15,300.00' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Direct material = $4,500\n' +
      'Direct labor = 150 × $16 = $2,400\n' +
      'Production overhead absorbed = 150 × $22 = $3,300\n' +
      'Total production cost = $4,500 + $2,400 + $3,300 = $10,200\n' +
      'Non-production overhead = 15% × $10,200 = $1,530\n' +
      'Total cost = $10,200 + $1,530 = $11,730\n' +
      'Profit margin is 20% of selling price => Cost is 80% of selling price.\n' +
      'Selling price = $11,730 / (1 - 0.20) = $11,730 / 0.80 = $14,662.50.',
    workingSteps: [
      'Prime cost = $4,500 + $2,400 = $6,900',
      'Production overhead = 150 × $22 = $3,300',
      'Total production cost = $6,900 + $3,300 = $10,200',
      'Non-production overhead = 15% × $10,200 = $1,530',
      'Total cost = $11,730',
      'Selling price = $11,730 / 0.80 = $14,662.50',
    ],
  },
  {
    id: 22,
    section: 'Section A',
    chapter: 'Job, Batch and Services Costing',
    marks: 2,
    title: 'Economic Batch Quantity (EBQ)',
    scenario:
      'A component is manufactured in production batches. The following data is available:\n\n' +
      '• Annual demand (D): 32,000 units\n' +
      '• Annual production capacity rate (R): 80,000 units\n' +
      '• Set-up cost per batch (Co): $250\n' +
      '• Holding cost per unit per annum (Ch): $2.00',
    questionText: 'What is the Economic Batch Quantity (EBQ)?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '3,651 units' },
      { id: 'opt2', text: '2,828 units' },
      { id: 'opt3', text: '4,000 units' },
      { id: 'opt4', text: '3,200 units' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'EBQ = √[(2 × Co × D) / (Ch × (1 - D/R))]\n' +
      'D/R = 32,000 / 80,000 = 0.40\n' +
      'Denominator = 2.00 × (1 - 0.40) = 2.00 × 0.60 = 1.20\n' +
      'Numerator = 2 × 250 × 32,000 = 16,000,000\n' +
      'EBQ = √(16,000,000 / 1.20) = √13,333,333 = 3,651.48 ≈ 3,651 units.',
    workingSteps: [
      'Demand/Production ratio (D/R) = 32,000 / 80,000 = 0.4',
      '1 - D/R = 0.6',
      'Denominator = $2.00 × 0.6 = $1.20',
      'Numerator = 2 × 250 × 32,000 = 16,000,000',
      'EBQ = √(16,000,000 / 1.20) = 3,651 units',
    ],
  },
  {
    id: 23,
    section: 'Section A',
    chapter: 'Job, Batch and Services Costing',
    marks: 2,
    title: 'Transport Cost Unit: Passenger-Kilometers',
    scenario:
      'Metro Coach Lines operates 5 buses between two regional cities situated 80 km apart.\n\n' +
      '• Each bus makes 2 round trips per day (1 round trip = 160 km; total 320 km/day per bus)\n' +
      '• Capacity of each bus is 45 passengers, with an average seat occupancy of 80%\n' +
      '• Buses operate 25 days per month\n' +
      '• Total fleet operating cost for the month is $72,000',
    questionText: 'What is the cost per passenger-kilometer for the month?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$0.050 (5.0 cents)' },
      { id: 'opt2', text: '$0.062 (6.2 cents)' },
      { id: 'opt3', text: '$0.040 (4.0 cents)' },
      { id: 'opt4', text: '$0.075 (7.5 cents)' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Average passengers per trip = 45 × 80% = 36 passengers.\n' +
      'Daily km per bus = 2 round trips × 160 km = 320 km.\n' +
      'Daily passenger-km per bus = 320 km × 36 passengers = 11,520 passenger-km.\n' +
      'Total passenger-km for 5 buses over 25 days = 5 × 25 × 11,520 = 1,440,000 passenger-km.\n' +
      'Cost per passenger-km = $72,000 / 1,440,000 = $0.050.',
    workingSteps: [
      'Passengers per bus = 45 × 0.8 = 36',
      'Distance per bus/day = 2 × 160 = 320 km',
      'Total km = 5 buses × 25 days × 320 km = 40,000 bus-km',
      'Total passenger-km = 40,000 × 36 = 1,440,000',
      'Cost per passenger-km = $72,000 / 1,440,000 = $0.050',
    ],
  },
  {
    id: 24,
    section: 'Section A',
    chapter: 'Job, Batch and Services Costing',
    marks: 2,
    title: 'Distinguishing Features of Service Costing',
    scenario:
      'Service organizations present distinct managerial accounting challenges compared with manufacturing businesses.',
    questionText: 'Which of the following represents the four classic distinguishing characteristics of services?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: 'Intangibility, Heterogeneity, Perishability, and Simultaneity' },
      { id: 'opt2', text: 'Depreciation, Overhead allocation, Direct labor, and Mark-up' },
      { id: 'opt3', text: 'Work-in-progress, Job cards, Raw materials, and Physical delivery' },
      { id: 'opt4', text: 'Standardization, Durability, Separability, and Batch production' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'The four defining characteristics of services in ACCA F2 are:\n' +
      '1. Intangibility (no physical substance)\n' +
      '2. Heterogeneity (variability of service standard)\n' +
      '3. Perishability (cannot be stored in inventory)\n' +
      '4. Simultaneity (production and consumption occur at the same moment).',
    workingSteps: [
      'Core ACCA syllabus definition of service costing characteristics',
      'Services have no finished goods inventory due to perishability and simultaneity',
    ],
  },
  {
    id: 25,
    section: 'Section A',
    chapter: 'Job, Batch and Services Costing',
    marks: 2,
    title: 'Hospital Costing: Occupied Bed-Days',
    scenario:
      'St. Jude Private Clinic has 60 inpatient beds. During the month of April (30 days), the clinic operated at an average bed occupancy rate of 80%. Total operating costs incurred by the clinic during April were $172,800.',
    questionText: 'What was the average cost per occupied bed-day for the month of April?',
    type: 'single-choice',
    options: [
      { id: 'opt1', text: '$120.00' },
      { id: 'opt2', text: '$96.00' },
      { id: 'opt3', text: '$144.00' },
      { id: 'opt4', text: '$110.00' },
    ],
    correctOptionId: 'opt1',
    explanation:
      'Total available bed-days = 60 beds × 30 days = 1,800 bed-days.\n' +
      'Occupied bed-days = 1,800 bed-days × 80% = 1,440 occupied bed-days.\n' +
      'Cost per occupied bed-day = $172,800 / 1,440 = $120.00.',
    workingSteps: [
      'Available bed days = 60 × 30 = 1,800',
      'Occupied bed days = 1,800 × 0.80 = 1,440',
      'Cost per occupied bed day = $172,800 / 1,440 = $120.00',
    ],
  },

  // SECTION B: Multi-Task Questions 26 & 27 (10 marks each)
  {
    id: 26,
    section: 'Section B',
    chapter: 'Absorption and Marginal Costing',
    marks: 10,
    title: 'Multi-Task Case: Marginal & Absorption Profit Statement',
    scenario:
      'Nova Dynamics Ltd manufactures a single specialized industrial component called "Novacore". The management accountant is preparing comparative monthly operating statements for Month 1.\n\n' +
      'Cost and revenue structure per unit:\n' +
      '• Selling price: $75.00\n' +
      '• Direct materials: $20.00\n' +
      '• Direct labor: $15.00\n' +
      '• Variable production overhead: $5.00\n' +
      '• Variable selling expense: $3.00\n\n' +
      'Fixed cost and volume data for Month 1:\n' +
      '• Budgeted fixed production overhead: $90,000 per month\n' +
      '• Budgeted normal capacity: 15,000 units\n' +
      '• Actual production achieved: 16,000 units\n' +
      '• Actual sales achieved: 13,000 units\n' +
      '• Actual fixed production overhead incurred: $92,000\n' +
      '• Fixed administration and sales overhead incurred: $28,000\n' +
      '• Opening inventory at beginning of Month 1: Nil units',
    questionText:
      'Complete the following multi-part analysis comparing marginal and absorption costing results for Month 1:',
    type: 'multi-task',
    multiTaskParts: [
      {
        id: 'q26_p1',
        label: 'Part 1: Unit Product Cost',
        prompt: 'What is the inventory valuation unit cost under Marginal Costing and Absorption Costing?',
        type: 'dropdown',
        options: [
          { id: 'p1_optA', label: 'Marginal: $40.00 | Absorption: $46.00' },
          { id: 'p1_optB', label: 'Marginal: $43.00 | Absorption: $49.00' },
          { id: 'p1_optC', label: 'Marginal: $40.00 | Absorption: $48.00' },
          { id: 'p1_optD', label: 'Marginal: $45.00 | Absorption: $51.00' },
        ],
        correctAnswer: 'p1_optA',
        marks: 2,
        explanation:
          'Fixed OAR = $90,000 / 15,000 units = $6.00 per unit.\n' +
          'Marginal unit cost = Material ($20) + Labor ($15) + Var O/H ($5) = $40.00.\n' +
          'Absorption unit cost = $40.00 + Fixed OAR ($6.00) = $46.00.',
      },
      {
        id: 'q26_p2',
        label: 'Part 2: Closing Inventory Valuation',
        prompt: 'What is the value of the 3,000 units of closing inventory under Marginal and Absorption costing?',
        type: 'dropdown',
        options: [
          { id: 'p2_optA', label: 'Marginal: $120,000 | Absorption: $138,000' },
          { id: 'p2_optB', label: 'Marginal: $129,000 | Absorption: $147,000' },
          { id: 'p2_optC', label: 'Marginal: $120,000 | Absorption: $144,000' },
          { id: 'p2_optD', label: 'Marginal: $135,000 | Absorption: $153,000' },
        ],
        correctAnswer: 'p2_optA',
        marks: 2,
        explanation:
          'Closing units = 16,000 produced - 13,000 sold = 3,000 units.\n' +
          'Marginal closing inventory = 3,000 × $40 = $120,000.\n' +
          'Absorption closing inventory = 3,000 × $46 = $138,000.',
      },
      {
        id: 'q26_p3',
        label: 'Part 3: Net Profit under Marginal Costing',
        prompt: 'Calculate the reported net profit under Marginal Costing for Month 1 (Enter number without commas):',
        type: 'number-input',
        correctAnswer: 296000,
        tolerance: 0,
        marks: 2,
        explanation:
          'Sales revenue = 13,000 units × $75 = $975,000.\n' +
          'Variable cost of sales = 13,000 × $40 = $520,000.\n' +
          'Variable selling expense = 13,000 × $3 = $39,000.\n' +
          'Total variable costs = $559,000.\n' +
          'Contribution = $975,000 - $559,000 = $416,000.\n' +
          'Less fixed costs = Fixed production ($92,000) + Fixed admin ($28,000) = $120,000.\n' +
          'Net Profit = $416,000 - $120,000 = $296,000.',
      },
      {
        id: 'q26_p4',
        label: 'Part 4: Fixed Overhead Under/Over Absorption',
        prompt: 'What was the under- or over-absorption of fixed production overhead in Month 1?',
        type: 'dropdown',
        options: [
          { id: 'p4_optA', label: '$4,000 Over-absorbed' },
          { id: 'p4_optB', label: '$4,000 Under-absorbed' },
          { id: 'p4_optC', label: '$2,000 Over-absorbed' },
          { id: 'p4_optD', label: '$6,000 Under-absorbed' },
        ],
        correctAnswer: 'p4_optA',
        marks: 2,
        explanation:
          'Fixed overhead absorbed = 16,000 units produced × $6.00 OAR = $96,000.\n' +
          'Actual fixed overhead incurred = $92,000.\n' +
          'Absorbed ($96,000) > Incurred ($92,000) => Over-absorbed by $4,000.',
      },
      {
        id: 'q26_p5',
        label: 'Part 5: Net Profit under Absorption Costing and Profit Difference',
        prompt: 'Calculate the net profit under Absorption Costing ($314,000) and identify the reason for the profit difference of $18,000:',
        type: 'dropdown',
        options: [
          { id: 'p5_optA', label: 'Absorption profit is $314,000; exactly $18,000 higher because fixed overhead is carried forward in closing inventory (3,000 units × $6)' },
          { id: 'p5_optB', label: 'Absorption profit is $278,000; exactly $18,000 lower because fixed selling costs are deducted twice' },
          { id: 'p5_optC', label: 'Absorption profit is $314,000; higher due to higher sales volume than budget' },
          { id: 'p5_optD', label: 'Absorption profit is $332,000; higher due to the $4,000 over-absorption alone' },
        ],
        correctAnswer: 'p5_optA',
        marks: 2,
        explanation:
          'Absorption net profit calculation:\n' +
          'Sales: $975,000\n' +
          'Cost of Sales at standard: 13,000 × $46 = $598,000\n' +
          'Standard Gross profit = $377,000\n' +
          'Add: Over-absorbed overhead = $4,000 => Adjusted gross profit = $381,000\n' +
          'Less: Variable selling ($39,000) + Fixed admin ($28,000) = $67,000\n' +
          'Net profit = $381,000 - $67,000 = $314,000.\n' +
          'Reconciliation difference = $314,000 - $296,000 = $18,000.\n' +
          'Change in inventory = (3,000 - 0) × $6 OAR = $18,000.',
      },
    ],
    explanation:
      'Comprehensive reconciliation between Marginal Costing ($296,000) and Absorption Costing ($314,000):\n' +
      'Difference = 3,000 units in closing inventory × $6.00 fixed OAR = $18,000.\n' +
      'Over-absorption adjustment in Absorption Costing: $96,000 absorbed - $92,000 actual = $4,000 credit.',
    workingSteps: [
      'Fixed OAR = $90,000 / 15,000 = $6.00/unit',
      'Marginal unit cost = 20 + 15 + 5 = $40.00; Absorption = $46.00',
      'Closing inventory = 16,000 - 13,000 = 3,000 units',
      'Marginal profit = Sales ($975,000) - Var costs ($559,000) - Fixed costs ($120,000) = $296,000',
      'Absorbed fixed overhead = 16,000 × $6 = $96,000; Actual = $92,000 → Over-absorbed = $4,000',
      'Absorption profit = $314,000 (which is $296,000 + $18,000 deferred fixed overhead)',
    ],
  },
  {
    id: 27,
    section: 'Section B',
    chapter: 'Accounting for Overheads',
    marks: 10,
    title: 'Multi-Task Case: Overhead Apportionment, Absorption & EOQ Evaluation',
    scenario:
      'Sterling Engineering Works operates two production cost centres (Milling and Finishing) and one service cost centre (Stores & Maintenance). The following budgeted operational data has been established for the next period:\n\n' +
      'Allocated & directly assigned overheads:\n' +
      '• Milling: $210,000\n' +
      '• Finishing: $140,000\n' +
      '• Stores & Maintenance: $70,000\n\n' +
      'Apportionment base for Stores & Maintenance:\n' +
      'Stores & Maintenance costs are apportioned based on material requisition notes issued:\n' +
      '• Milling: 60% of requisitions\n' +
      '• Finishing: 40% of requisitions\n\n' +
      'Budgeted activity:\n' +
      '• Milling department: 35,000 Machine Hours; 12,000 Labor Hours\n' +
      '• Finishing department: 4,000 Machine Hours; 28,000 Labor Hours\n\n' +
      'Stores Department Material Inventory Data:\n' +
      'The stores manager orders Steel Alloy Bar-6. Annual demand is 18,000 units. Ordering cost is $40 per order. Annual holding cost is $2.25 per unit per year.',
    questionText:
      'Complete the following multi-part analysis regarding overhead reapportionment, absorption rates, and material inventory management:',
    type: 'multi-task',
    multiTaskParts: [
      {
        id: 'q27_p1',
        label: 'Part 1: Service Department Apportionment',
        prompt: 'What are the total budgeted overheads for Milling and Finishing after apportioning Stores & Maintenance?',
        type: 'dropdown',
        options: [
          { id: 'p1_optA', label: 'Milling: $252,000 | Finishing: $168,000' },
          { id: 'p1_optB', label: 'Milling: $245,000 | Finishing: $175,000' },
          { id: 'p1_optC', label: 'Milling: $238,000 | Finishing: $182,000' },
          { id: 'p1_optD', label: 'Milling: $280,000 | Finishing: $140,000' },
        ],
        correctAnswer: 'p1_optA',
        marks: 2,
        explanation:
          'Stores overhead to Milling = 60% × $70,000 = $42,000.\n' +
          'Total Milling overhead = $210,000 + $42,000 = $252,000.\n' +
          'Stores overhead to Finishing = 40% × $70,000 = $28,000.\n' +
          'Total Finishing overhead = $140,000 + $28,000 = $168,000.',
      },
      {
        id: 'q27_p2',
        label: 'Part 2: Departmental OAR Selection & Calculation',
        prompt: 'Select the appropriate absorption basis and predetermined OAR for both production departments:',
        type: 'dropdown',
        options: [
          { id: 'p2_optA', label: 'Milling: $7.20 per machine hr | Finishing: $6.00 per labor hr' },
          { id: 'p2_optB', label: 'Milling: $21.00 per labor hr | Finishing: $42.00 per machine hr' },
          { id: 'p2_optC', label: 'Milling: $6.00 per machine hr | Finishing: $7.20 per labor hr' },
          { id: 'p2_optD', label: 'Milling: $7.20 per labor hr | Finishing: $6.00 per machine hr' },
        ],
        correctAnswer: 'p2_optA',
        marks: 3,
        explanation:
          'Milling is machine-dominant (35,000 machine hrs vs 12,000 labor hrs) => OAR = $252,000 / 35,000 machine hrs = $7.20 per machine hour.\n' +
          'Finishing is labor-dominant (28,000 labor hrs vs 4,000 machine hrs) => OAR = $168,000 / 28,000 labor hrs = $6.00 per direct labor hour.',
      },
      {
        id: 'q27_p3',
        label: 'Part 3: Under- or Over-Absorption Evaluation',
        prompt: 'In Milling, actual results were 36,500 machine hours and $260,000 actual overhead incurred. Calculate the under/over absorbed overhead:',
        type: 'dropdown',
        options: [
          { id: 'p3_optA', label: '$2,800 Over-absorbed' },
          { id: 'p3_optB', label: '$2,800 Under-absorbed' },
          { id: 'p3_optC', label: '$8,000 Over-absorbed' },
          { id: 'p3_optD', label: '$10,800 Under-absorbed' },
        ],
        correctAnswer: 'p3_optA',
        marks: 2,
        explanation:
          'Overhead absorbed = Actual machine hours × OAR = 36,500 × $7.20 = $262,800.\n' +
          'Actual overhead incurred = $260,000.\n' +
          'Absorbed ($262,800) - Actual ($260,000) = $2,800 Over-absorbed.',
      },
      {
        id: 'q27_p4',
        label: 'Part 4: Economic Order Quantity (EOQ) for Stores Alloy',
        prompt: 'What is the Economic Order Quantity (EOQ) for the Steel Alloy Bar-6?',
        type: 'dropdown',
        options: [
          { id: 'p4_optA', label: '800 units' },
          { id: 'p4_optB', label: '640 units' },
          { id: 'p4_optC', label: '1,200 units' },
          { id: 'p4_optD', label: '500 units' },
        ],
        correctAnswer: 'p4_optA',
        marks: 3,
        explanation:
          'EOQ = √[(2 × Co × D) / Ch]\n' +
          '= √[(2 × $40 × 18,000) / $2.25]\n' +
          '= √[1,440,000 / 2.25] = √640,000 = 800 units.',
      },
    ],
    explanation:
      'This multi-task question evaluates secondary overhead apportionment (Stores to Milling and Finishing), selection of appropriate departmental absorption cost drivers (machine hours for automated Milling, direct labor hours for manual Finishing), under/over absorption calculation, and EOQ optimization for raw materials.',
    workingSteps: [
      'Apportion Stores ($70,000): Milling receives 60% = $42,000; Finishing receives 40% = $28,000',
      'Total overhead: Milling = $210,000 + $42,000 = $252,000; Finishing = $140,000 + $28,000 = $168,000',
      'Milling OAR = $252,000 / 35,000 machine hrs = $7.20/machine hr',
      'Finishing OAR = $168,000 / 28,000 labor hrs = $6.00/labor hr',
      'Milling absorbed = 36,500 × $7.20 = $262,800; Over-absorbed = $262,800 - $260,000 = $2,800',
      'EOQ = √[(2 × 40 × 18,000) / 2.25] = √640,000 = 800 units',
    ],
  },
];
