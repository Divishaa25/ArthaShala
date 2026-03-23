const learningModules = [
  {
    id: "seed_trap",
    icon: "🌱",
    title: "बीज का कर्ज (The Seed Trap)",
    difficulty: "Easy",
    rewardType: "arthaScore",
    rewardAmount: 20,
    slides: [
      { 
        visual: "🗣️", 
        text: "चाचा कहते हैं: साहूकार कहता है 'सिर्फ 2 रुपये सैकड़ा महीना'। सुनने में कम लगता है ना? (Moneylender says 'Just ₹2 per 100 a month'. Sounds small, right?)" 
      },
      { 
        visual: "📉", 
        text: "लेकिन 2% महीना यानी साल का 24% से ज्यादा! आपका सारा मुनाफा सिर्फ ब्याज चुकाने में चला जाएगा। (But 2% a month is over 24% a year! Your entire profit will go to interest.)" 
      },
      { 
        visual: "🏦", 
        text: "बैंक का KCC (किसान क्रेडिट कार्ड) सालाना सिर्फ 4% ब्याज लेता है। हमेशा बैंक चुनें! (Bank's KCC charges only 4% a year. Always choose the bank!)" 
      }
    ],
    quiz: {
      question: "रामू काका को बीज के लिए ₹15,000 चाहिए। आप उन्हें क्या सलाह देंगे? (Ramu Kaka needs ₹15k for seeds. What is your advice?)",
      options: [
        { text: "साहूकार से तुरंत नकद ले लें (Take instant cash from Moneylender)", isCorrect: false },
        { text: "बैंक जाकर KCC लोन लें (Go to the Bank for KCC Loan)", isCorrect: true }
      ]
    },
    // Simulation Data for Map
    simulation: {
      crisis: "बुवाई का समय आ गया है! अच्छी फसल के लिए तुरंत ₹15,000 के बीज और खाद चाहिए।",
      choices: {
        good: {
          text: "KCC लोन आवेदन (4% ब्याज)",
          arthaChange: 15,
          visual: "lush_field",
          lessonText: "शानदार! 4% ब्याज के कारण आपका मुनाफा आपके पास रहा। आपकी फसल सुरक्षित है।"
        },
        bad: {
          text: "साहूकार से तुरंत नकद (24% ब्याज)",
          arthaChange: -20,
          visual: "seized_field",
          lessonText: "साहूकार के 24% चक्रवृद्धि ब्याज ने आपकी ज़मीन निगल ली। आपने अपना भविष्य बेच दिया।"
        }
      },
      images: {
        present: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=800&q=80",
        lush_field: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
        seized_field: "https://images.unsplash.com/photo-1516710404095-23136209ed9e?auto=format&fit=crop&w=800&q=80"
      }
    }
  }
];

export default learningModules;
