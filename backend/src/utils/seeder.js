const { connectDB, disconnectDB } = require('../config/database');
const { Content, User } = require('../models');

// Sample Preamble data
const preambleData = {
  contentId: 'preamble-001',
  contentType: 'preamble',
  title: 'Preamble to the Constitution of India',
  shortTitle: 'Preamble',
  content: {
    en: 'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.',
    hi: 'हम भारत के लोग, भारत को एक सम्पूर्ण प्रभुत्व सम्पन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य बनाने के लिए तथा उसके समस्त नागरिकों को: सामाजिक, आर्थिक और राजनीतिक न्याय, विचार, अभिव्यक्ति, विश्वास, धर्म और उपासना की स्वतंत्रता, प्रतिष्ठा और अवसर की समता प्राप्त कराने के लिए तथा उन सब में व्यक्ति की गरिमा और राष्ट्र की एकता और अखंडता सुनिश्चित करने वाली बंधुता बढ़ाने के लिए दृढ संकल्प होकर अपनी इस संविधान सभा में आज तारीख 26 नवम्बर, 1949 ई० को एतद्द्वारा इस संविधान को अंगीकृत, अधिनियमित और आत्मार्पित करते हैं।'
  },
  explanation: {
    en: 'The Preamble declares India as a sovereign, socialist, secular, democratic republic. It promises justice, liberty, equality, and fraternity to all citizens. These are the guiding principles and objectives of our Constitution.',
    hi: 'प्रस्तावना भारत को एक संप्रभु, समाजवादी, धर्मनिरपेक्ष, लोकतांत्रिक गणराज्य घोषित करती है। यह सभी नागरिकों को न्याय, स्वतंत्रता, समानता और बंधुत्व का वादा करती है। ये हमारे संविधान के मार्गदर्शक सिद्धांत और उद्देश्य हैं।'
  },
  keyPoints: [
    'India is a Sovereign state - independent and not controlled by any other country',
    'Socialist - promoting social and economic equality',
    'Secular - no official state religion, all religions are equal',
    'Democratic - government elected by the people',
    'Republic - head of state is elected, not hereditary'
  ],
  keywords: ['preamble', 'sovereign', 'socialist', 'secular', 'democratic', 'republic', 'justice', 'liberty', 'equality', 'fraternity'],
  difficulty: 'beginner',
  estimatedReadTime: 5,
  isActive: true
};

// Sample Fundamental Rights
const fundamentalRightsData = [
  {
    contentId: 'fr-article-14',
    contentType: 'fundamental-right',
    title: 'Equality before law',
    articleNumber: '14',
    content: {
      en: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
      hi: 'राज्य, भारत के राज्यक्षेत्र में किसी व्यक्ति को विधि के समक्ष समता से या विधियों के समान संरक्षण से वंचित नहीं करेगा।'
    },
    explanation: {
      en: 'This article guarantees that all persons, whether citizens or foreigners, are equal before the law. No one is above the law, and everyone has the right to equal protection under the law.',
      hi: 'यह अनुच्छेद गारंटी देता है कि सभी व्यक्ति, चाहे नागरिक हों या विदेशी, कानून के समक्ष समान हैं। कोई भी कानून से ऊपर नहीं है, और हर किसी को कानून के तहत समान सुरक्षा का अधिकार है।'
    },
    keyPoints: [
      'All persons are equal before law',
      'No one is above the law',
      'Equal protection of laws for everyone',
      'Applies to both citizens and non-citizens'
    ],
    keywords: ['equality', 'law', 'equal protection', 'fundamental right'],
    part: { number: '3', title: 'Fundamental Rights' },
    difficulty: 'beginner',
    estimatedReadTime: 3,
    isActive: true
  },
  {
    contentId: 'fr-article-19',
    contentType: 'fundamental-right',
    title: 'Protection of certain rights regarding freedom of speech, etc.',
    articleNumber: '19',
    content: {
      en: 'All citizens shall have the right to freedom of speech and expression; to assemble peaceably and without arms; to form associations or unions; to move freely throughout the territory of India; to reside and settle in any part of the territory of India; and to practice any profession, or to carry on any occupation, trade or business.',
      hi: 'सभी नागरिकों को वाक् और अभिव्यक्ति की स्वतंत्रता का; शांतिपूर्वक और बिना हथियारों के इकट्ठे होने का; संघ या संगम बनाने का; भारत के राज्यक्षेत्र में सर्वत्र अबाध संचरण का; भारत के राज्यक्षेत्र के किसी भाग में निवास करने और बस जाने का; तथा कोई वृत्ति, उपजीविका, व्यापार या कारोबार करने का अधिकार होगा।'
    },
    explanation: {
      en: 'This is one of the most important fundamental rights. It guarantees six freedoms: speech and expression, peaceful assembly, forming associations, movement, residence, and profession. However, reasonable restrictions can be imposed in the interest of public order, morality, and security.',
      hi: 'यह सबसे महत्वपूर्ण मौलिक अधिकारों में से एक है। यह छह स्वतंत्रताओं की गारंटी देता है: भाषण और अभिव्यक्ति, शांतिपूर्ण सभा, संघ बनाना, आवागमन, निवास और पेशा। हालांकि, सार्वजनिक व्यवस्था, नैतिकता और सुरक्षा के हित में उचित प्रतिबंध लगाए जा सकते हैं।'
    },
    keyPoints: [
      'Freedom of speech and expression',
      'Right to peaceful assembly',
      'Right to form associations',
      'Freedom of movement throughout India',
      'Right to reside anywhere in India',
      'Freedom to practice any profession'
    ],
    keywords: ['freedom', 'speech', 'expression', 'assembly', 'association', 'movement', 'profession'],
    part: { number: '3', title: 'Fundamental Rights' },
    difficulty: 'intermediate',
    estimatedReadTime: 5,
    isActive: true
  }
];

// Sample Fundamental Duties
const fundamentalDutiesData = [
  {
    contentId: 'fd-article-51a-a',
    contentType: 'fundamental-duty',
    title: 'To abide by the Constitution and respect its ideals',
    articleNumber: '51A(a)',
    content: {
      en: 'It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem.',
      hi: 'प्रत्येक नागरिक का यह कर्तव्य होगा कि वह संविधान का पालन करे और उसके आदर्शों, संस्थाओं, राष्ट्रध्वज और राष्ट्रगान का आदर करे।'
    },
    explanation: {
      en: 'Every Indian citizen has a duty to follow the Constitution, respect national symbols like the flag and anthem, and uphold constitutional institutions. This creates responsible citizenship.',
      hi: 'प्रत्येक भारतीय नागरिक का कर्तव्य है कि वह संविधान का पालन करे, राष्ट्रीय प्रतीकों जैसे ध्वज और गान का सम्मान करे, और संवैधानिक संस्थाओं को बनाए रखे। यह जिम्मेदार नागरिकता बनाता है।'
    },
    keyPoints: [
      'Abide by the Constitution',
      'Respect national symbols',
      'Respect constitutional institutions',
      'Creates responsible citizenship'
    ],
    keywords: ['duty', 'constitution', 'national flag', 'national anthem', 'respect'],
    part: { number: '4A', title: 'Fundamental Duties' },
    difficulty: 'beginner',
    estimatedReadTime: 2,
    isActive: true
  }
];

// Function to seed database
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await connectDB();

    // Clear existing content
    console.log('🗑️  Clearing existing content...');
    await Content.deleteMany({});

    // Insert preamble
    console.log('📝 Inserting Preamble...');
    await Content.create(preambleData);

    // Insert fundamental rights
    console.log('⚖️  Inserting Fundamental Rights...');
    await Content.insertMany(fundamentalRightsData);

    // Insert fundamental duties
    console.log('✅ Inserting Fundamental Duties...');
    await Content.insertMany(fundamentalDutiesData);

    console.log('✨ Database seeded successfully!');
    console.log(`
    Inserted:
    - 1 Preamble
    - ${fundamentalRightsData.length} Fundamental Rights
    - ${fundamentalDutiesData.length} Fundamental Duties
    `);

    // Disconnect
    await disconnectDB();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
