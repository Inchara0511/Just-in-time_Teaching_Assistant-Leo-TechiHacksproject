import { Student, Class, Chapter, User, Remark, Feedback } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@school.com',
    role: 'teacher',
    subject: 'Mathematics',
    grade: '8',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@school.com',
    role: 'teacher',
    subject: 'Science',
    grade: '6',
  },
  {
    id: '3',
    name: 'Dr. Patricia Williams',
    email: 'patricia.williams@school.com',
    role: 'admin',
  },
];

export const mockStudents: Student[] = [
  { id: 's1', name: 'Emma Wilson', rollNumber: '801', grade: '8', section: 'A' },
  { id: 's2', name: 'Liam Brown', rollNumber: '802', grade: '8', section: 'A' },
  { id: 's3', name: 'Olivia Davis', rollNumber: '803', grade: '8', section: 'A' },
  { id: 's4', name: 'Noah Martinez', rollNumber: '804', grade: '8', section: 'A' },
  { id: 's5', name: 'Ava Garcia', rollNumber: '805', grade: '8', section: 'A' },
  { id: 's6', name: 'Ethan Rodriguez', rollNumber: '806', grade: '8', section: 'A' },
  { id: 's7', name: 'Sophia Lee', rollNumber: '807', grade: '8', section: 'A' },
  { id: 's8', name: 'Mason Taylor', rollNumber: '808', grade: '8', section: 'A' },
  { id: 's9', name: 'Isabella Anderson', rollNumber: '809', grade: '8', section: 'A' },
  { id: 's10', name: 'Lucas Thomas', rollNumber: '810', grade: '8', section: 'A' },
  { id: 's11', name: 'Mia Jackson', rollNumber: '601', grade: '6', section: 'B' },
  { id: 's12', name: 'Aiden White', rollNumber: '602', grade: '6', section: 'B' },
  { id: 's13', name: 'Charlotte Harris', rollNumber: '603', grade: '6', section: 'B' },
  { id: 's14', name: 'James Martin', rollNumber: '604', grade: '6', section: 'B' },
  { id: 's15', name: 'Amelia Thompson', rollNumber: '605', grade: '6', section: 'B' },
];

export const mockClasses: Class[] = [
  {
    id: 'c1',
    grade: '8',
    section: 'A',
    subject: 'Mathematics',
    students: mockStudents.filter(s => s.grade === '8' && s.section === 'A'),
  },
  {
    id: 'c2',
    grade: '6',
    section: 'B',
    subject: 'Science',
    students: mockStudents.filter(s => s.grade === '6' && s.section === 'B'),
  },
];

export const mockChapters: Chapter[] = [
  {
    id: 'ch1',
    subject: 'Mathematics',
    grade: '8',
    title: 'Linear Equations in One Variable',
    summary: 'This chapter introduces linear equations with one variable, teaching students how to solve equations systematically using algebraic methods. Students learn to transpose terms, handle brackets, and solve real-world problems.',
    keyPoints: [
      'Understanding variables and constants',
      'Transposition method for solving equations',
      'Applications of linear equations in daily life',
      'Solving word problems using equations',
    ],
    activities: [
      'Create a balance scale demonstration to show equality concept',
      'Real-life problem solving: calculating ages, distances, money',
      'Group activity: Students create their own word problems',
      'Interactive quiz using equations from sports statistics',
    ],
  },
  {
    id: 'ch2',
    subject: 'Mathematics',
    grade: '8',
    title: 'Understanding Quadrilaterals',
    summary: 'Students explore properties of different quadrilaterals including parallelograms, rhombus, rectangle, square, and trapezium. The chapter covers angle sum property and properties specific to each type.',
    keyPoints: [
      'Angle sum property of quadrilaterals (360°)',
      'Properties of parallelograms and their types',
      'Special quadrilaterals: Rectangle, Square, Rhombus',
      'Trapezium and its properties',
    ],
    activities: [
      'Paper folding activity to discover properties',
      'Use geoboards to create different quadrilaterals',
      'Identify quadrilaterals in classroom and school building',
      'Create art patterns using quadrilaterals',
    ],
  },
  {
    id: 'ch3',
    subject: 'Science',
    grade: '6',
    title: 'Light, Shadows and Reflections',
    summary: 'This chapter explores the nature of light, how it travels, and its interactions with different materials. Students learn about transparent, translucent, and opaque objects, shadow formation, and reflection.',
    keyPoints: [
      'Light travels in straight lines',
      'Transparent, translucent, and opaque materials',
      'Formation of shadows and factors affecting shadow size',
      'Reflection of light and properties of mirrors',
    ],
    activities: [
      'Shadow puppet show to demonstrate shadow formation',
      'Mirror maze activity to explore reflection',
      'Classify objects as transparent, translucent, or opaque',
      'Sundial creation to understand shadow movement',
    ],
  },
  {
    id: 'ch4',
    subject: 'Science',
    grade: '6',
    title: 'Electricity and Circuits',
    summary: 'Students learn about electric cells, bulbs, and how to create simple circuits. The chapter introduces conductors and insulators, and teaches circuit diagram drawing.',
    keyPoints: [
      'Electric cell as a source of electricity',
      'Components of an electric circuit',
      'Conductors and insulators',
      'Open and closed circuits',
    ],
    activities: [
      'Build simple circuits with batteries and bulbs',
      'Test materials for conductivity',
      'Create circuit diagrams of classroom devices',
      'Design a torch using learned concepts',
    ],
  },
];

export const mockRemarks: Remark[] = [
  {
    id: 'r1',
    studentId: 's1',
    teacherId: '1',
    teacherName: 'Sarah Johnson',
    text: 'Excellent problem-solving skills in algebra. Shows great enthusiasm.',
    date: '2026-01-20',
    subject: 'Mathematics',
  },
  {
    id: 'r2',
    studentId: 's2',
    teacherId: '1',
    teacherName: 'Sarah Johnson',
    text: 'Needs extra attention in word problems. Good conceptual understanding.',
    date: '2026-01-19',
    subject: 'Mathematics',
  },
];

export const mockFeedback: Feedback[] = [
  {
    id: 'f1',
    teacherId: '1',
    adminId: '3',
    adminName: 'Dr. Patricia Williams',
    text: 'Great engagement with students during the quadrilaterals lesson. The hands-on activities were very effective.',
    date: '2026-01-18',
    type: 'praise',
  },
];

// AI response templates for different subjects and grades
export const getAIResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Math related
  if (lowerQuestion.includes('algebra') || lowerQuestion.includes('equation')) {
    return 'For teaching linear equations effectively, I recommend starting with the balance method using a visual scale. Show students that what you do to one side, you must do to the other. Begin with simple equations like x + 3 = 7, then gradually increase complexity. Use real-world examples like shopping scenarios where students need to find unknown prices. Common mistakes to watch: students forgetting to change signs when transposing, and not checking their answers. Activity idea: Give students a balance scale (or draw one) and use weights to represent variables and numbers.';
  }
  
  if (lowerQuestion.includes('quadrilateral') || lowerQuestion.includes('geometry')) {
    return 'When teaching quadrilaterals, hands-on activities work best. Start with paper folding - have students fold paper to create different shapes and discover properties themselves. Key concept: All quadrilaterals have angles that sum to 360°. Build from the general (quadrilateral) to specific types (parallelogram, rectangle, square, rhombus). Use a property chart on the board. Activity: Students create quadrilaterals using straws or popsicle sticks, then measure and record properties. Real-world connection: Architecture and building design.';
  }
  
  // Science related
  if (lowerQuestion.includes('light') || lowerQuestion.includes('shadow')) {
    return 'Teaching light and shadows: Start with a hands-on demonstration using a torch and objects. Key concepts: Light travels in straight lines; shadows form when light is blocked by opaque objects. Activities: (1) Shadow puppet theater - students create shapes and stories. (2) Measure shadows at different times of day to show Earth\'s rotation. (3) Classify objects as transparent/translucent/opaque using everyday items. Safety note: Never look directly at the sun. Common misconception: Some students think shadows are "made" rather than formed by blocking light.';
  }
  
  if (lowerQuestion.includes('circuit') || lowerQuestion.includes('electric')) {
    return 'For electric circuits: Start with identifying components - cell (battery), bulb, switch, and wires. Safety first: Only use low-voltage batteries (1.5V AA batteries). Build circuits step by step: (1) Simple circuit with one bulb, (2) Add a switch to control it, (3) Series vs parallel circuits. Key concept: Electricity needs a complete path (closed circuit). Activity: Give groups circuit-building kits and challenge them to light 2 bulbs. Draw circuit diagrams alongside building. Common issues: Loose connections, dead batteries. Test materials for conductivity - this bridges to conductors/insulators.';
  }
  
  // Classroom management
  if (lowerQuestion.includes('engage') || lowerQuestion.includes('attention') || lowerQuestion.includes('class management')) {
    return 'To maintain student engagement: (1) Start with a hook - surprising fact, demo, or question. (2) Use think-pair-share for discussions. (3) Incorporate movement - students at board, group rotations. (4) Vary activities every 10-15 minutes. (5) Connect to real life constantly. (6) Use positive reinforcement. For attention: Establish a signal (raised hand, clap pattern) that means "eyes on me". Give clear, concise instructions. Walk around the room while teaching. Call on students by name. For difficult classes, try the "SLANT" approach: Sit up, Listen, Ask questions, Nod your head, Track the speaker.';
  }
  
  // Assessment
  if (lowerQuestion.includes('assess') || lowerQuestion.includes('test') || lowerQuestion.includes('quiz')) {
    return 'Assessment strategies: (1) Formative: Quick exit tickets, thumbs up/down understanding checks, mini whiteboards for answers. (2) Summative: Mix question types - MCQ for concepts, short answer for application, long answer for analysis. (3) Alternative: Projects, presentations, peer teaching. (4) Continuous: Observe during activities, check notebooks regularly. Create rubrics beforehand and share with students. Include application-based questions, not just recall. For instant feedback in class: Use quick polls, hand signals (1-5 fingers for confidence level), or think-pair-share to check understanding before moving forward.';
  }
  
  // Differentiation
  if (lowerQuestion.includes('different level') || lowerQuestion.includes('slow learner') || lowerQuestion.includes('advanced')) {
    return 'Differentiation strategies: (1) Tiered assignments - same concept, different complexity levels. (2) Flexible grouping - mix abilities for peer learning, sometimes group by level for targeted instruction. (3) For struggling students: Break tasks into smaller steps, provide visual aids, extra practice time, buddy system. (4) For advanced: Extension questions, let them explore beyond syllabus, make them peer tutors. (5) Use multiple representation modes - visual (diagrams), auditory (explanation), kinesthetic (hands-on). Universal Design for Learning: Provide choice in how students demonstrate understanding - written, oral, visual, or project-based.';
  }
  
  // General teaching
  return 'Great question! Here are some general teaching strategies: (1) Start each lesson with clear learning objectives - tell students what they\'ll learn and why it matters. (2) Use the 5E Model: Engage, Explore, Explain, Elaborate, Evaluate. (3) Check for understanding frequently - don\'t assume silence means comprehension. (4) Make connections to prior knowledge and real-world applications. (5) End with a summary and preview of next lesson. (6) Incorporate multiple intelligences - visual, auditory, kinesthetic activities. Remember: The best teachers are flexible and responsive to student needs. What works with one class might need adjustment for another. Feel free to ask more specific questions about your subject or grade level!';
};

export const generateActivitySuggestions = (subject: string, grade: string, topic?: string): string[] => {
  const baseActivities = [
    'Think-Pair-Share discussion on key concepts',
    'Create a mind map of today\'s topic',
    'Group quiz competition with points',
    'Real-world problem solving in small groups',
    'Student-created examples and explanations',
  ];
  
  if (subject === 'Mathematics') {
    return [
      'Math relay race - teams solve problems on board',
      'Create word problems based on real-life scenarios',
      'Geometry scavenger hunt in classroom',
      'Use manipulatives (blocks, shapes) for hands-on learning',
      'Peer teaching - students explain concepts to partners',
      'Math games: Bingo with equations, 24 game, number puzzles',
    ];
  }
  
  if (subject === 'Science') {
    return [
      'Hands-on experiment with everyday materials',
      'Draw and label diagrams of concepts learned',
      'Science observation journal - record findings',
      'Role-play: Students act out scientific processes',
      'Create models using recyclable materials',
      'Video demonstration followed by discussion',
    ];
  }
  
  return baseActivities;
};
