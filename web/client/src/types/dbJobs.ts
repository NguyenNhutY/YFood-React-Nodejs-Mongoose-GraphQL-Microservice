export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  benefits: string[];
  careerGrowth: string[];
  workEnvironment: string[];
  applicationPeriod: {
    startDate: string; // Định dạng ngày tháng năm, ví dụ: "2024-08-01"
    endDate: string; // Định dạng ngày tháng năm, ví dụ: "2024-09-01"
  };
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Food Menu Manager",
    location: "Hanoi",
    description:
      "As the Food Menu Manager, you will be responsible for managing and updating the food menu on our website. You will work closely with the culinary team to ensure that all items are accurately represented and reflect our current offerings. Your role is crucial in maintaining the accuracy and appeal of our online menu.",
    responsibilities: [
      "Update menu items, descriptions, and prices on the website.",
      "Collaborate with the culinary team to reflect menu changes and seasonal offerings.",
      "Monitor the menu for accuracy and consistency across all platforms.",
      "Analyze menu performance and customer feedback to make data-driven decisions.",
    ],
    requirements: [
      "Bachelor’s degree in Hospitality, Business, or a related field.",
      "Experience in food service management or menu planning.",
      "Strong attention to detail and organizational skills.",
      "Proficiency with content management systems (CMS) and basic HTML.",
    ],
    preferredQualifications: [
      "Experience with website analytics tools.",
      "Knowledge of SEO best practices.",
      "Familiarity with graphic design tools for menu updates.",
    ],
    benefits: [
      "Competitive salary with performance bonuses.",
      "Comprehensive health, dental, and vision insurance.",
      "Paid time off and holidays.",
      "Opportunities for professional development and training.",
    ],
    careerGrowth: [
      "Opportunity to lead menu strategy and innovation.",
      "Potential to advance to Senior Menu Manager or Director of Culinary Operations.",
    ],
    workEnvironment: [
      "Dynamic and collaborative team environment.",
      "Fast-paced and innovative workplace.",
      "Regular interaction with culinary and marketing teams.",
    ],
    applicationPeriod: {
      startDate: "2024-08-01",
      endDate: "2024-09-01",
    },
  },
  {
    id: "2",
    title: "UI/UX Designer",
    location: "Ho Chi Minh",
    description:
      "The UI/UX Designer will focus on designing and enhancing the user interface and user experience of our food delivery website. This role requires a creative individual who can translate complex concepts into intuitive and visually appealing designs, ensuring a seamless experience for our users.",
    responsibilities: [
      "Design user-friendly interfaces for web and mobile platforms.",
      "Conduct user research, including interviews and usability testing.",
      "Create wireframes, prototypes, and high-fidelity mockups.",
      "Work closely with developers to implement design solutions.",
      "Collaborate with stakeholders to gather requirements and feedback.",
    ],
    requirements: [
      "Bachelor’s degree in Design, HCI, or a related field.",
      "Proven experience as a UI/UX Designer with a strong portfolio.",
      "Proficiency in design tools like Figma, Sketch, or Adobe XD.",
      "Strong understanding of user-centered design principles.",
    ],
    preferredQualifications: [
      "Experience with front-end development (HTML/CSS/JavaScript).",
      "Knowledge of accessibility standards and best practices.",
      "Experience with design systems and style guides.",
    ],
    benefits: [
      "Competitive salary and stock options.",
      "Health insurance with dental and vision coverage.",
      "Flexible work hours and remote work options.",
      "Creative and supportive work environment.",
    ],
    careerGrowth: [
      "Opportunity to work on high-profile design projects.",
      "Potential to advance to Lead Designer or Design Director.",
      "Involvement in shaping the design vision of the company.",
    ],
    workEnvironment: [
      "Collaborative and creative team culture.",
      "Open office layout with modern amenities.",
      "Regular design reviews and feedback sessions.",
    ],
    applicationPeriod: {
      startDate: "2024-08-05",
      endDate: "2024-09-05",
    },
  },
  {
    id: "3",
    title: "Digital Marketing Specialist",
    location: "Hai Phong",
    description:
      "The Digital Marketing Specialist will develop and execute digital marketing strategies to drive traffic and sales for our food delivery website. This role involves managing social media campaigns, email marketing, and online advertisements to enhance our brand presence and customer engagement.",
    responsibilities: [
      "Create and implement digital marketing campaigns across various platforms.",
      "Analyze campaign performance using tools like Google Analytics and social media insights.",
      "Manage and optimize social media channels and email marketing efforts.",
      "Collaborate with the creative team to develop engaging content.",
      "Monitor industry trends and competitor activities to stay ahead.",
    ],
    requirements: [
      "Bachelor’s degree in Marketing, Business, or a related field.",
      "Experience with digital marketing and analytics tools.",
      "Strong analytical skills and ability to interpret data.",
      "Proficiency in Google Ads, Facebook Ads, and email marketing platforms.",
    ],
    preferredQualifications: [
      "Certifications in Google Analytics or Google Ads.",
      "Experience with SEO and content marketing.",
      "Knowledge of A/B testing and conversion rate optimization.",
    ],
    benefits: [
      "Attractive salary package with performance bonuses.",
      "Health and wellness benefits.",
      "Opportunities for career advancement and training.",
      "Work-life balance initiatives and flexible work options.",
    ],
    careerGrowth: [
      "Chance to lead large-scale marketing campaigns.",
      "Pathway to Senior Marketing Manager or Director of Marketing.",
      "Opportunities to influence strategic marketing decisions.",
    ],
    workEnvironment: [
      "Dynamic and fast-paced marketing team.",
      "Collaborative atmosphere with regular brainstorming sessions.",
      "Access to the latest marketing tools and technologies.",
    ],
    applicationPeriod: {
      startDate: "2024-08-10",
      endDate: "2024-09-10",
    },
  },
  {
    id: "4",
    title: "Food Delivery Coordinator",
    location: "Da Nang",
    description:
      "The Food Delivery Coordinator will oversee the food delivery process, ensuring timely and accurate delivery of orders. This role involves managing communication between delivery staff and customers, coordinating logistics, and ensuring high-quality service standards are met.",
    responsibilities: [
      "Coordinate and manage delivery schedules and routes.",
      "Ensure orders are prepared and dispatched accurately and on time.",
      "Communicate with delivery staff and customers to resolve any issues.",
      "Monitor delivery performance and customer satisfaction.",
      "Implement and enforce best practices for delivery operations.",
    ],
    requirements: [
      "Experience in logistics, transportation, or delivery coordination.",
      "Strong organizational and problem-solving skills.",
      "Ability to work in a fast-paced environment.",
      "Excellent communication and interpersonal skills.",
    ],
    preferredQualifications: [
      "Experience with route optimization software.",
      "Knowledge of supply chain management principles.",
      "Familiarity with customer service best practices.",
    ],
    benefits: [
      "Competitive salary with performance incentives.",
      "Health, dental, and vision insurance.",
      "Paid vacation and sick leave.",
      "Opportunities for career growth and development.",
    ],
    careerGrowth: [
      "Potential to advance to Logistics Manager or Operations Manager.",
      "Opportunities to take on larger-scale logistics projects.",
      "Pathway to leadership roles in operations and management.",
    ],
    workEnvironment: [
      "Fast-paced and collaborative work environment.",
      "Regular interaction with delivery staff and other departments.",
      "Focus on efficiency and quality in delivery operations.",
    ],
    applicationPeriod: {
      startDate: "2024-08-15",
      endDate: "2024-09-15",
    },
  },
  {
    id: "5",
    title: "Customer Service Representative",
    location: "Can Tho",
    description:
      "The Customer Service Representative will provide exceptional customer service through various channels. This role involves addressing customer inquiries, handling complaints, and resolving issues related to orders and deliveries to ensure a positive customer experience.",
    responsibilities: [
      "Handle customer inquiries and resolve issues via phone, email, and chat.",
      "Manage and address customer complaints and feedback.",
      "Document customer interactions and track issue resolutions.",
      "Assist customers with order placement and status inquiries.",
      "Collaborate with other teams to resolve complex issues.",
    ],
    requirements: [
      "High school diploma or equivalent; associate’s degree preferred.",
      "Experience in customer service or support roles.",
      "Strong communication and problem-solving skills.",
      "Ability to handle difficult situations calmly and professionally.",
    ],
    preferredQualifications: [
      "Experience with CRM systems and customer support software.",
      "Knowledge of food delivery industry practices.",
      "Fluency in multiple languages is a plus.",
    ],
    benefits: [
      "Competitive pay with performance bonuses.",
      "Comprehensive health benefits.",
      "Paid time off and holidays.",
      "Career advancement opportunities and training.",
    ],
    careerGrowth: [
      "Opportunities for advancement to Senior Customer Service Representative.",
      "Potential to move into supervisory or management roles.",
      "Pathway to specialized roles in customer experience or support management.",
    ],
    workEnvironment: [
      "Supportive and team-oriented atmosphere.",
      "Focus on delivering excellent customer service.",
      "Regular feedback and performance reviews.",
    ],
    applicationPeriod: {
      startDate: "2024-08-20",
      endDate: "2024-09-20",
    },
  },

  {
    id: "6",
    title: "Backend Developer",
    location: "Nha Trang",
    description:
      "As a Backend Developer, you will design, develop, and maintain the backend infrastructure of our website. You will ensure robust performance, security, and seamless integration with other systems to support our food delivery operations.",
    responsibilities: [
      "Develop and maintain server-side logic and architecture.",
      "Ensure database performance and security.",
      "Implement APIs for integration with front-end and third-party services.",
      "Monitor and optimize server performance and scalability.",
      "Troubleshoot and debug backend issues.",
    ],
    requirements: [
      "Bachelor’s degree in Computer Science, Engineering, or a related field.",
      "Proven experience with server-side programming languages (e.g., Node.js, Python, Java).",
      "Strong understanding of database management (e.g., MySQL, MongoDB).",
      "Experience with RESTful APIs and microservices architecture.",
    ],
    preferredQualifications: [
      "Experience with cloud platforms (e.g., AWS, Azure).",
      "Knowledge of containerization and orchestration (e.g., Docker, Kubernetes).",
      "Familiarity with security best practices in backend development.",
    ],
    benefits: [
      "Competitive salary with performance-based bonuses.",
      "Health, dental, and vision insurance.",
      "Flexible working hours and remote work options.",
      "Opportunities for professional growth and skill development.",
    ],
    careerGrowth: [
      "Pathway to Senior Backend Developer or Lead Developer roles.",
      "Opportunity to influence backend architecture and technology stack.",
      "Involvement in high-impact projects and strategic initiatives.",
    ],
    workEnvironment: [
      "Collaborative team atmosphere with agile development practices.",
      "Innovative environment with opportunities to experiment with new technologies.",
      "Regular code reviews and knowledge-sharing sessions.",
    ],
    applicationPeriod: {
      startDate: "2024-08-25",
      endDate: "2024-09-25",
    },
  },
  {
    id: "7",
    title: "Frontend Developer",
    location: "Ha Long",
    description:
      "As a Frontend Developer, you will build and enhance the user interface of our food delivery website. Collaborating closely with designers, you'll implement responsive and visually appealing interfaces that provide a seamless user experience.",
    responsibilities: [
      "Develop and maintain the front-end codebase using modern frameworks (e.g., React, Angular).",
      "Translate design mockups into interactive and responsive web pages.",
      "Optimize web applications for maximum speed and scalability.",
      "Ensure cross-browser and cross-device compatibility.",
      "Collaborate with backend developers to integrate APIs and data.",
    ],
    requirements: [
      "Bachelor’s degree in Computer Science, Web Development, or a related field.",
      "Experience with front-end technologies (e.g., HTML, CSS, JavaScript).",
      "Proficiency in modern front-end frameworks (e.g., React, Angular).",
      "Strong understanding of responsive design principles.",
    ],
    preferredQualifications: [
      "Experience with front-end build tools (e.g., Webpack, Babel).",
      "Familiarity with version control systems (e.g., Git).",
      "Knowledge of UX/UI best practices and accessibility standards.",
    ],
    benefits: [
      "Competitive salary and performance-based bonuses.",
      "Health, dental, and vision insurance.",
      "Flexible working hours and remote work options.",
      "Opportunities for career advancement and skill development.",
    ],
    careerGrowth: [
      "Pathway to Senior Frontend Developer or Lead Developer roles.",
      "Opportunity to work on high-impact projects and product features.",
      "Potential to influence front-end architecture and technology stack.",
    ],
    workEnvironment: [
      "Collaborative and creative team environment.",
      "Opportunities to work on diverse projects and technologies.",
      "Regular feedback and support from senior developers.",
    ],
    applicationPeriod: {
      startDate: "2024-08-30",
      endDate: "2024-09-30",
    },
  },
  {
    id: "8",
    title: "Product Manager",
    location: "Hue",
    description:
      "As a Product Manager, you will oversee the development and improvement of our food delivery website. You will define product requirements, prioritize features, and collaborate with development teams to ensure the successful delivery of products that meet customer needs.",
    responsibilities: [
      "Define product vision and roadmap based on market research and user feedback.",
      "Prioritize features and manage the product backlog.",
      "Collaborate with cross-functional teams including developers, designers, and marketers.",
      "Monitor product performance and make data-driven decisions to enhance features.",
      "Manage project timelines and ensure successful delivery of product releases.",
    ],
    requirements: [
      "Bachelor’s degree in Business, Marketing, or a related field.",
      "Proven experience in product management or project management.",
      "Strong understanding of product lifecycle and development processes.",
      "Excellent communication and leadership skills.",
    ],
    preferredQualifications: [
      "Experience in the food delivery or e-commerce industry.",
      "Knowledge of Agile methodologies and project management tools.",
      "Ability to analyze market trends and customer needs.",
    ],
    benefits: [
      "Competitive salary with performance-based bonuses.",
      "Health, dental, and vision insurance.",
      "Flexible working hours and remote work options.",
      "Opportunities for career growth and professional development.",
    ],
    careerGrowth: [
      "Opportunity to advance to Senior Product Manager or Director of Product.",
      "Involvement in strategic decision-making and product innovation.",
      "Potential to lead cross-functional teams and major product initiatives.",
    ],
    workEnvironment: [
      "Dynamic and fast-paced work environment.",
      "Collaborative team culture with opportunities for creative problem-solving.",
      "Regular interaction with stakeholders and executive leadership.",
    ],
    applicationPeriod: {
      startDate: "2024-09-01",
      endDate: "2024-10-01",
    },
  },
  {
    id: "9",
    title: "Content Writer",
    location: "Vung Tau",
    description:
      "As a Content Writer, you will create engaging content for our website, including blog posts, product descriptions, and promotional materials. Your role is to ensure that all content is optimized for SEO and resonates with our target audience.",
    responsibilities: [
      "Write and edit content for various sections of the website.",
      "Research and incorporate SEO best practices into content.",
      "Collaborate with the marketing team to create compelling promotional materials.",
      "Monitor and analyze content performance and make improvements as needed.",
      "Ensure consistency in tone and style across all content.",
    ],
    requirements: [
      "Bachelor’s degree in English, Communications, Marketing, or a related field.",
      "Proven experience in content writing or copywriting.",
      "Strong writing, editing, and proofreading skills.",
      "Familiarity with SEO and content management systems (CMS).",
    ],
    preferredQualifications: [
      "Experience in the food delivery or e-commerce industry.",
      "Knowledge of digital marketing strategies and tools.",
      "Ability to work with multimedia content and basic graphic design skills.",
    ],
    benefits: [
      "Competitive salary with performance-based bonuses.",
      "Health, dental, and vision insurance.",
      "Flexible working hours and remote work options.",
      "Opportunities for professional growth and skill development.",
    ],
    careerGrowth: [
      "Pathway to Senior Content Writer or Content Manager roles.",
      "Opportunity to shape content strategy and contribute to brand voice.",
      "Involvement in high-impact marketing and content projects.",
    ],
    workEnvironment: [
      "Creative and collaborative team atmosphere.",
      "Opportunities to work on diverse content projects.",
      "Regular feedback and support from senior content team members.",
    ],
    applicationPeriod: {
      startDate: "2024-09-05",
      endDate: "2024-10-05",
    },
  },
  {
    id: "10",
    title: "Food Safety Specialist",
    location: "Phan Thiet",
    description:
      "As a Food Safety Specialist, you will ensure that all food items meet safety and quality standards. You will implement procedures for handling, storing, and preparing food to maintain hygiene and safety across our food delivery network.",
    responsibilities: [
      "Develop and enforce food safety and quality control procedures.",
      "Conduct regular inspections of food handling and storage practices.",
      "Train staff on food safety protocols and best practices.",
      "Monitor and document compliance with health regulations and standards.",
      "Investigate and address food safety incidents and non-compliance issues.",
    ],
    requirements: [
      "Bachelor’s degree in Food Science, Nutrition, or a related field.",
      "Experience in food safety or quality assurance.",
      "Strong knowledge of food safety regulations and best practices.",
      "Excellent organizational and communication skills.",
    ],
    preferredQualifications: [
      "Certification in food safety or hygiene.",
      "Experience in the food delivery or restaurant industry.",
      "Ability to work with regulatory agencies and resolve compliance issues.",
    ],
    benefits: [
      "Competitive salary with performance-based bonuses.",
      "Health, dental, and vision insurance.",
      "Flexible working hours and remote work options.",
      "Opportunities for professional development and certifications.",
    ],
    careerGrowth: [
      "Pathway to Senior Food Safety Specialist or Food Safety Manager roles.",
      "Opportunity to lead food safety initiatives and compliance programs.",
      "Involvement in strategic planning for food safety and quality.",
    ],
    workEnvironment: [
      "Detail-oriented and compliance-focused work environment.",
      "Opportunities to work with a dedicated team of food safety professionals.",
      "Regular interaction with culinary and operations teams.",
    ],
    applicationPeriod: {
      startDate: "2024-09-05",
      endDate: "2024-10-05",
    },
  },
  {
    id: "11",
    title: "Graphic Designer",
    location: "San Francisco, CA",
    description:
      "As a Graphic Designer, you will design marketing materials, website graphics, and promotional visuals. Your role will involve working on visual branding and ensuring consistency across various platforms to enhance our online presence.",
    responsibilities: [
      "Create visually appealing graphics for the website and marketing materials.",
      "Develop branding elements and ensure consistency across all media.",
      "Collaborate with the marketing team to design promotional campaigns.",
      "Maintain and update visual content to align with brand guidelines.",
      "Stay updated with design trends and incorporate them into your work.",
    ],
    requirements: [
      "Bachelor’s degree in Graphic Design, Visual Arts, or a related field.",
      "Proven experience as a graphic designer with a strong portfolio.",
      "Proficiency in design software (e.g., Adobe Creative Suite).",
      "Strong understanding of design principles and branding.",
    ],
    preferredQualifications: [
      "Experience in the food delivery or e-commerce industry.",
      "Knowledge of web design and user experience (UX) principles.",
      "Ability to create multimedia content (e.g., video, animation).",
    ],
    benefits: [
      "Competitive salary with performance-based bonuses.",
      "Health, dental, and vision insurance.",
      "Flexible working hours and remote work options.",
      "Opportunities for creative projects and professional development.",
    ],
    careerGrowth: [
      "Pathway to Senior Graphic Designer or Art Director roles.",
      "Opportunity to lead design projects and contribute to brand strategy.",
      "Involvement in high-impact visual campaigns and initiatives.",
    ],
    workEnvironment: [
      "Creative and collaborative team environment.",
      "Opportunities to work on diverse design projects.",
      "Regular feedback and support from senior designers and marketing teams.",
    ],
    applicationPeriod: {
      startDate: "2024-08-01",
      endDate: "2024-09-01",
    },
  },
];

export default jobs;
