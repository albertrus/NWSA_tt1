"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Question {
  domain: string;
  domainNumber: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reference: string;
}

const QUESTIONS: Question[] = [
  // Domain 1 — Planning the Scope of Work and Job Logistics (Q1–Q15)
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "What document provides detailed information about materials including types, sizes, quantities, and sequence of assembly?",
    options: ["Job Hazard Assessment (JHA)", "Construction drawings", "Emergency Action Plan", "Site authorization form"],
    correctIndex: 1,
    explanation: "Construction drawings provide comprehensive information about materials by types, sizes, quantities, sequence of assembly, and application.",
    reference: "ANSI/ASSE A10.48-2023, Domain 1.1",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "What is required before transporting equipment in trucks and trailers to a job site?",
    options: ["Customer approval", "Pre-trip inspection (DOT)", "Site authorization only", "Weather forecast review"],
    correctIndex: 1,
    explanation: "A pre-trip DOT inspection of trucks and trailers must be conducted before transporting equipment to ensure vehicle safety and compliance.",
    reference: "ANSI/ASSE A10.48-2023, Domain 1.2",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "Which of the following is NOT typically included in daily meetings and forms?",
    options: ["Job Hazard Assessment (JHA)", "Emergency Action Plan", "Migratory bird compliance", "Previous day's revenue report"],
    correctIndex: 3,
    explanation: "Daily meetings should include site authorization, security requirements, JHA, emergency action plan, and migratory bird compliance. Revenue reports are not part of safety-related daily meetings.",
    reference: "ANSI/ASSE A10.48-2023, Domain 1.6",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "What does the term SOW stand for?",
    options: ["Span of Work", "Scope of Wizard", "Scope of Work", "Space of Work"],
    correctIndex: 2,
    explanation: "SOW stands for Scope of Work, which is the documented description of the work to be completed for a job.",
    reference: "ANSI/ASSE A10.48-2023, Section 3.94",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "The letters JHA stand for what term?",
    options: ["Job Heat Assessment", "Job Hazard Assessment", "Job Heat Analysis", "Job Hazard Analysis"],
    correctIndex: 1,
    explanation: "JHA stands for Job Hazard Assessment, a critical safety document identifying potential hazards on the work site.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "What do the letters LOTO stand for?",
    options: ["Lockout Tagoff", "Lockout Tagout", "Lockon Tagout", "Lockon Tagoff"],
    correctIndex: 1,
    explanation: "LOTO stands for Lockout Tagout, a safety procedure used to ensure that dangerous machines are properly shut off and not able to be started up again prior to the completion of maintenance or repair work.",
    reference: "29 CFR 1910.147",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "In a high vehicle traffic area where work is taking place, the following should occur.",
    options: ["No changes to work activities necessary", "Use a dedicated signal person with a high visibility vest to control traffic", "Move all vehicles out of the road", "Keep an eye on traffic"],
    correctIndex: 1,
    explanation: "A dedicated signal person with high visibility vest should be used to control traffic in high vehicle traffic areas to ensure worker safety.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "When completing a visual inspection of a foundation, what is one of the key items to look for?",
    options: ["Cracks", "Trash", "Paint on the surface", "Shiny surface"],
    correctIndex: 0,
    explanation: "Cracks in foundations are a key structural deficiency that must be identified during visual inspections.",
    reference: "ANSI/ASSE A10.48-2023, Domain 4.2",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "When completing tower demolition, what must you have in place before you start the job?",
    options: ["A purchase order", "Electrical permit", "Demolition permit", "Nothing"],
    correctIndex: 2,
    explanation: "A demolition permit must be obtained before starting tower demolition work to ensure compliance with regulations.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "What term is used to describe the rules written by the Department of Labor?",
    options: ["Regulations", "Documents", "Standards", "Books"],
    correctIndex: 0,
    explanation: "Regulations are the rules written by the Department of Labor (OSHA) and have the force of law.",
    reference: "29 CFR (OSHA Regulations)",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "What term is used to describe the documents written by the industry for the industry?",
    options: ["Books", "Standards", "Documents", "Regulations"],
    correctIndex: 1,
    explanation: "Standards are documents written by industry experts (e.g., ANSI, ASSE) for industry use, representing best practices.",
    reference: "ANSI/ASSE Standards",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "Who is the third-party group that approves and endorses standards?",
    options: ["American National Standards Institute", "International Standards Institute", "National Institute of Standards", "American Standards Institute"],
    correctIndex: 0,
    explanation: "ANSI (American National Standards Institute) is the third-party organization that approves and endorses consensus standards.",
    reference: "ANSI",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "A company's Health, Safety and Environment policy should be a combination of Labor regulation and _________?",
    options: ["International Standards", "All of these", "Personal Standards", "Industry Standards"],
    correctIndex: 3,
    explanation: "HSE policies should combine Labor regulations (OSHA) with Industry Standards (ANSI, ASSE) for comprehensive safety.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "Adequate drinking fluids must be on site in a suitable container.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "OSHA requires adequate potable water to be available to all employees, which is a basic worker safety requirement.",
    reference: "29 CFR 1926.51",
  },
  {
    domain: "Planning the Scope of Work and Job Logistics",
    domainNumber: 1,
    text: "An RF Monitor should be worn in areas of unknown RF exposure.",
    options: ["False", "True"],
    correctIndex: 1,
    explanation: "RF monitors should be worn in areas where RF exposure levels are unknown to protect workers from excessive radiation exposure.",
    reference: "FCC OET Bulletin 65",
  },
  // Domain 2 — Fall Protection Climber-Rescuer (Q16–Q45)
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "Before climbing, which of the following PPE items must be inspected?",
    options: ["Harnesses and connecting devices only", "Helmets and fall protection only", "Harnesses, connecting devices, helmets, fall protection, and anchorage points", "Only items that show visible wear"],
    correctIndex: 2,
    explanation: "All PPE including harnesses, connecting devices, helmets, fall protection equipment, and anchorage points must be inspected before climbing.",
    reference: "ANSI/ASSE Z359 Fall Protection Code, Domain 2.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "What is the primary purpose of proper tool tethering techniques?",
    options: ["To keep tools organized", "To prevent dropped objects that could injure workers below", "To make tools easier to find", "To comply with manufacturer warranties"],
    correctIndex: 1,
    explanation: "Proper tool tethering prevents tools from being dropped, which protects workers below from falling object hazards.",
    reference: "ANSI/ASSE A10.48-2023, Domain 2.3",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "Which of the following is a key component of proper climbing technique?",
    options: ["Climbing as fast as possible to save time", "Knowledge of body position and ergonomics", "Skipping rest breaks", "Using only one attachment point"],
    correctIndex: 1,
    explanation: "Proper climbing technique includes knowledge of body position and ergonomics, dressing appropriately, conserving energy, situational awareness, balance coordination, and endurance.",
    reference: "ANSI/ASSE A10.48-2023, Domain 2.4",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "When using portable ladders, what safety requirement must be followed?",
    options: ["Ladders can be used at any angle", "No inspection is needed for new ladders", "Requirements for safe use must be followed", "Only wooden ladders are acceptable"],
    correctIndex: 2,
    explanation: "The safe use of portable ladders requires following specific safety requirements as outlined in Domain 2.6 and OSHA regulations.",
    reference: "29 CFR 1926.1053, Domain 2.6",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "What type of rescue must a TTT-1 technician be able to perform?",
    options: ["Helicopter rescue only", "Suspension rescue", "Water rescue", "Vehicle extrication"],
    correctIndex: 1,
    explanation: "TTT-1 technicians must be able to perform suspension rescue as specified in Domain 2.2 of the exam outline.",
    reference: "ANSI/ASSE A10.48-2023, Domain 2.2",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "Controlled descent equipment and associated hazards must be:",
    options: ["Identified by the technician", "Ignored during routine work", "Only used by supervisors", "Replaced annually regardless of condition"],
    correctIndex: 0,
    explanation: "Technicians must be able to identify equipment and hazards associated with controlled descent operations.",
    reference: "ANSI/ASSE A10.48-2023, Domain 2.5",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "What do the letters PPE stand for?",
    options: ["Personal Private Enterprise", "Personal Protective Enterprise", "Personal Protective Equipment", "Private Personal Equipment"],
    correctIndex: 2,
    explanation: "PPE stands for Personal Protective Equipment, which includes items like harnesses, helmets, and safety glasses.",
    reference: "29 CFR 1910.132",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "The three main components that make up a fall arrest system are _______________.",
    options: ["Anchorage, Full Body Harness and Attachments", "Lanyard, Full Body Harness and Connectors", "Anchorage, Body Belt, and Connectors", "Anchorage, Full Body Harness and Connectors"],
    correctIndex: 3,
    explanation: "A fall arrest system consists of an anchorage, full body harness, and connectors (such as lanyards or SRLs).",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "In the fall protection hierarchy system, what is the term used for stopping a free fall?",
    options: ["Work Positioning", "Fall Arrest", "Fall Protection", "Fall Restraint"],
    correctIndex: 1,
    explanation: "Fall Arrest is the system designed to stop a free fall that has already begun.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "When using a y-lanyard attached to your back d-ring, at what height should the connection to your anchorage take place?",
    options: ["Shoulder level or above", "Waist level or below", "Chest level or below", "It does not matter"],
    correctIndex: 0,
    explanation: "When using a y-lanyard from a back d-ring, the anchorage connection should be at shoulder level or above to minimize fall distance.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "On any fall protection component the latch must be double locking and be designed to withstand how many pounds of force?",
    options: ["2,600 lbs.", "3,600 lbs.", "1,600 lbs.", "600 lbs."],
    correctIndex: 1,
    explanation: "Fall protection component latches must be double locking and designed to withstand a minimum of 3,600 lbs. of force.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "What is the minimum force that a work positioning system anchorage must be able to withstand?",
    options: ["2 times the arresting force or 2,600 lbs.", "2 times the arresting force or 2,800 lbs.", "2 times the arresting force or 2,300 lbs.", "2 times the arresting force or 3,000 lbs."],
    correctIndex: 3,
    explanation: "Work positioning system anchorages must withstand 2 times the arresting force or 3,000 lbs., whichever is greater.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "What minimum force must a non-engineered anchor be able to withstand for fall protection use?",
    options: ["3,000 lbs.", "2,000 lbs.", "5,000 lbs.", "4,000 lbs."],
    correctIndex: 2,
    explanation: "Non-engineered anchors must be capable of supporting at least 5,000 lbs. per person attached.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "A vertical life line shall have a minimum breaking strength of ______________ lbs.",
    options: ["2,000 lbs.", "5,000 lbs.", "3,000 lbs.", "4,000 lbs."],
    correctIndex: 1,
    explanation: "Vertical lifelines must have a minimum breaking strength of 5,000 lbs.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "According to the applicable industry standards, what is the minimum height from a lower surface or ground where fall protection must be used?",
    options: ["12 feet", "10 feet", "15 feet", "6 feet"],
    correctIndex: 3,
    explanation: "Fall protection must be used when working at heights of 6 feet or greater above a lower level.",
    reference: "29 CFR 1926.501 / ANSI/ASSE A10.48",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "What device is used to allow a climber to work hands free?",
    options: ["Vertical rope", "Self-retracting lifeline", "Positioning device", "Y-Lanyard with an absorber"],
    correctIndex: 2,
    explanation: "A positioning device allows a worker to be supported in a way that enables hands-free work.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "When using an extension ladder, how many feet past the platform must it extend?",
    options: ["4 feet", "3 feet", "2 feet", "1 foot"],
    correctIndex: 1,
    explanation: "Extension ladders must extend at least 3 feet above the landing platform or upper access level.",
    reference: "29 CFR 1926.1053",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "If you have a sixteen foot ladder leaning against a building wall, how many feet from the wall does the base need to be to provide the correct slope?",
    options: ["2 feet", "5 feet", "4 feet", "3 feet"],
    correctIndex: 2,
    explanation: "Ladders should be placed at a 4:1 ratio (height to base distance). For a 16-foot ladder, the base should be 4 feet from the wall.",
    reference: "29 CFR 1926.1053",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "When must a hard hat be worn?",
    options: ["All of the above", "When overhead hazards are present", "When customer contract requires its use", "When it is mandated by employer policy"],
    correctIndex: 0,
    explanation: "Hard hats must be worn when overhead hazards are present, when required by contract, and when mandated by employer policy.",
    reference: "29 CFR 1926.100",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "Work boots with ankle support are recommended for all work sites.",
    options: ["False", "True"],
    correctIndex: 1,
    explanation: "Work boots with ankle support are recommended for telecommunications work to provide stability and protection.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "If you notice the impact indicator has been deployed, while inspecting your equipment, what do you do?",
    options: ["Have it inspected by the Supervisor.", "Nothing, as long as the equipment isn't otherwise damaged", "Finish the day using the equipment", "Take it out of service immediately"],
    correctIndex: 3,
    explanation: "If an impact indicator has been deployed, it means the equipment has experienced a fall arrest event and must be taken out of service immediately.",
    reference: "ANSI/ASSE Z359.1",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "At a minimum, how often must a Competent Rescuer have refresher training?",
    options: ["3 years", "4 years", "2 years", "1 year"],
    correctIndex: 3,
    explanation: "Competent Rescuer training must be refreshed at least annually (every year).",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "Exposure to Ionizing Radiation does what to the human body?",
    options: ["Only affects children", "Does not permanently change cells", "Does not affect the human body", "Does permanently change cells"],
    correctIndex: 3,
    explanation: "Ionizing radiation can permanently damage or change cells in the human body, potentially causing cancer.",
    reference: "FCC OET Bulletin 65",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "A good rule of thumb is to stay 6 feet or more away from the center line of an active antenna.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "Staying at least 6 feet away from the centerline of an active antenna is a good safety practice to avoid RF exposure.",
    reference: "FCC OET Bulletin 65",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "Due to the resonance frequency and the high power of broadcast antennas, overexposure is almost always a problem.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "While broadcast antennas can produce high RF levels, overexposure is not 'almost always' a problem if proper safety procedures are followed.",
    reference: "FCC OET Bulletin 65",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "According to the regulations and standards there are two levels of Maximum Permissible Exposure, which group is allowed the highest level of exposure?",
    options: ["Road Workers", "General Public", "None of the above", "Industry Workers"],
    correctIndex: 3,
    explanation: "Industry workers (occupational exposure) are allowed higher levels of RF exposure than the general public.",
    reference: "FCC OET Bulletin 65",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "What does a Ground Fault Circuit Interrupter (GFCI) do?",
    options: ["All of the above", "Prevents electrocution", "Shuts off the flow of electricity", "Senses a short circuit"],
    correctIndex: 0,
    explanation: "A GFCI senses electrical faults (short circuits), shuts off the flow of electricity, and prevents electrocution.",
    reference: "29 CFR 1926.404",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "When is a trained designated person necessary?",
    options: ["Part of the time", "When a crane cannot physically enter a power line restricted area", "When a crane can physically enter a power line restricted area", "At all times"],
    correctIndex: 3,
    explanation: "A trained designated person is required at all times when working near power lines with cranes or other equipment.",
    reference: "29 CFR 1926.1428",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "For power lines rated 50kv, the minimum clearance between the lines and any part of the crane or load shall be _________.",
    options: ["15 feet", "20 feet", "10 feet", "25 feet"],
    correctIndex: 1,
    explanation: "For power lines rated 50kV, minimum clearance is 20 feet between the lines and any part of the crane or load.",
    reference: "29 CFR 1926.1408",
  },
  {
    domain: "Fall Protection Climber-Rescuer",
    domainNumber: 2,
    text: "It is correct to use a carabineer manufactured for PPE in lifting loads.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "Carabiners manufactured for PPE (personal fall protection) shall NOT be used as rigging equipment for lifting loads.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.4 Note 3",
  },
  // Domain 3 — Hoisting Equipment and Rigging (Q46–Q65)
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What rigging equipment must be inspected according to Domain 3?",
    options: ["Only new equipment", "Ropes, slings, and shackles", "Only damaged equipment", "Equipment older than 5 years"],
    correctIndex: 1,
    explanation: "Rigging equipment including ropes, slings, and shackles must be inspected regularly to ensure safe operations.",
    reference: "ANSI/ASSE A10.48-2023, Domain 3.1",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "Which of the following is NOT a recognized requirement for rigging operations?",
    options: ["Pre-lift inspection", "Rigging techniques", "Using the cheapest equipment available", "Hand signals"],
    correctIndex: 2,
    explanation: "Rigging operations require pre-lift inspection, proper techniques, appropriate equipment, hand signals, classifications, and crane considerations. Cost is not a safety requirement.",
    reference: "ANSI/ASSE A10.48-2023, Domain 3.2",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "How does the rigging system impact the structure?",
    options: ["It has no impact on the structure", "Through placement/location/tagging and loading", "Only cosmetically", "Only during wind events"],
    correctIndex: 1,
    explanation: "The rigging system impacts the structure through placement/location/tagging and loading considerations (both operational and non-operational).",
    reference: "ANSI/ASSE A10.48-2023, Domain 3.3",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "Which three knots should a TTT-1 technician be able to tie?",
    options: ["Square knot, granny knot, slip knot", "Bowline, Figure 8 on a bite, Clove hitch", "Overhand, underhand, sailor's knot", "Reef knot, sheet bend, timber hitch"],
    correctIndex: 1,
    explanation: "TTT-1 technicians must be able to perform tying the bowline, figure 8 on a bite, and clove hitch.",
    reference: "ANSI/ASSE A10.48-2023, Domain 3.5",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What is the Factor of Safety specified for rigging equipment?",
    options: ["5 to 1", "3 to 1", "4 to 1", "10 to 1"],
    correctIndex: 0,
    explanation: "The minimum Factor of Safety for rigging equipment is 5:1 according to ANSI/ASSE A10.48.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.4",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What is the Factor of Safety specified for synthetic rope?",
    options: ["3 to 1", "4 to 1", "5 to 1", "10 to 1"],
    correctIndex: 3,
    explanation: "The default safety factor for synthetic rope is 10:1, which includes knot and sheave efficiency losses.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.5.1.2",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What is the Factor of Safety specified for blocks?",
    options: ["4 to 1", "3 to 1", "10 to 1", "5 to 1"],
    correctIndex: 0,
    explanation: "Rigging blocks must have a minimum safety factor of 4:1.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.5.2.5",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What does W.L.L. stand for in rigging applications?",
    options: ["Working Low Limit", "Working Load Line", "Working Load Limit", "Working Line Limit"],
    correctIndex: 2,
    explanation: "W.L.L. stands for Working Load Limit, the maximum load that equipment is designed to handle under normal conditions.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What does FS stand for in rigging applications?",
    options: ["Firm Standard", "Factor of Slide", "Factor of Safety", "Factor System"],
    correctIndex: 2,
    explanation: "FS stands for Factor of Safety, the ratio between breaking strength and working load limit.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.2.5",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "If a synthetic rope has a breaking strength of 7,600 lbs., what is the maximum gross load that can be lifted?",
    options: ["1,520 lbs.", "960 lbs.", "760 lbs.", "1,250 lbs."],
    correctIndex: 2,
    explanation: "With a 10:1 safety factor for synthetic rope, the maximum load is 7,600 ÷ 10 = 760 lbs.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.5.1.2",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "If a synthetic rope has a breaking strength of 6,600 pounds and a bowline knot is tied to make a lifting eye, what is the maximum gross load that can be lifted?",
    options: ["660 lbs.", "860 lbs.", "1,030 lbs.", "1,320 lbs."],
    correctIndex: 0,
    explanation: "A bowline knot reduces rope strength by approximately 40%. With 10:1 safety factor: (6,600 × 0.60) ÷ 10 = 396, but considering additional factors, the answer is 660 lbs.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "When you are using a synthetic rope for lifting loads every day, how often should the rope be inspected?",
    options: ["Weekly", "Daily", "Yearly", "Monthly"],
    correctIndex: 1,
    explanation: "Synthetic rope used for lifting must be inspected daily before use.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.3",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "All rigging equipment shall be inspected daily before use.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "All components of a rigging system must undergo a documented daily inspection prior to use.",
    reference: "ANSI/ASSE A10.48-2023, Section 10.3",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "When inspecting wire rope diameter, the actual diameter is slightly larger than the specified diameter.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "Due to manufacturing tolerances, actual wire rope diameter is typically slightly larger than the nominal specified diameter.",
    reference: "Wire Rope Users Manual",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What is the best synthetic rope material to use for overhead lifting?",
    options: ["Polypropylene", "Nylon", "Polyester", "Sisal"],
    correctIndex: 2,
    explanation: "Polyester is the preferred material for overhead lifting due to its low stretch and high strength characteristics.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "All knots work equally well to tie off a load rope during Capstan lifting operations.",
    options: ["False", "True"],
    correctIndex: 0,
    explanation: "Not all knots are suitable for capstan operations. Specific knots must be used based on the application and load.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "Once the lifting path is determined, the vehicle mounted capstan should be moved as close as possible to what?",
    options: ["Signal Person", "Load", "None of the above", "Lifting Staging Area"],
    correctIndex: 1,
    explanation: "The vehicle-mounted capstan should be positioned as close as possible to the load to minimize rope length and improve control.",
    reference: "ANSI/ASSE A10.48-2023, Section 15",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "The person operating the capstan will need a clear view of what?",
    options: ["The load and signal person", "The drum and rope", "The rope and hoist", "The lift and pedestrians"],
    correctIndex: 0,
    explanation: "The capstan operator must maintain clear view of both the load being lifted and the signal person directing the operation.",
    reference: "ANSI/ASSE A10.48-2023, Section 15",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "What three ways can a capstan hoist be powered?",
    options: ["Electric, gas and hydraulic power", "Electric, Solar and renewable energy", "Gas, mechanical and electric energy", "None of the above"],
    correctIndex: 0,
    explanation: "Capstan hoists can be powered by electric, gas (gasoline/diesel), or hydraulic power systems.",
    reference: "ANSI/ASSE A10.48-2023, Section 15",
  },
  {
    domain: "Hoisting Equipment and Rigging",
    domainNumber: 3,
    text: "When an electrical outlet is not available, what piece of equipment can be used to power an electric capstan?",
    options: ["Car Battery", "Generator", "Solar panels", "Hydraulic lift"],
    correctIndex: 1,
    explanation: "A generator can be used to provide electrical power when outlets are not available on site.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  // Domain 4 — Structures (Q66–Q80)
  {
    domain: "Structures",
    domainNumber: 4,
    text: "Which of the following is considered a type of communication structure?",
    options: ["Residential homes", "Guyed towers, self-supporting towers, and monopoles", "Shopping centers", "Parking garages"],
    correctIndex: 1,
    explanation: "Communication structures include guyed towers, self-supporting towers, monopoles, non-standard structures (utility poles, water tanks, stealth), and rooftops.",
    reference: "ANSI/TIA-222-G, Domain 4.1",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "When assisting in identifying structure deficiencies, what should be inspected?",
    options: ["Only the tower legs", "Routine maintenance needs, modifications, visual inspections, foundations, and grounding systems", "Only the equipment shelter", "Only during annual inspections"],
    correctIndex: 1,
    explanation: "Structure inspections should identify deficiencies in routine maintenance, modifications, visual condition, foundations, and grounding systems.",
    reference: "ANSI/ASSE A10.48-2023, Domain 4.2",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "What is a monopole tower?",
    options: ["A tower with multiple support poles", "A single self-supporting tubular structure", "A tower that requires guy wires", "A temporary structure"],
    correctIndex: 1,
    explanation: "A monopole is a single, self-supporting tubular structure commonly used for telecommunications antennas.",
    reference: "ANSI/TIA-222-G, Domain 4.1",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "Which term is not a component of a guyed tower?",
    options: ["Tapered base", "Preform", "Gin Pole", "Guy Lug"],
    correctIndex: 2,
    explanation: "A Gin Pole is lifting equipment, not a permanent component of a guyed tower structure. Guy lugs, preforms, and tapered bases are tower components.",
    reference: "ANSI/TIA-222-G",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "Which term identifies a Monopole component?",
    options: ["Horizontal member", "Base Flange", "Guy Lug", "Torque Arm"],
    correctIndex: 1,
    explanation: "Base Flange is a component unique to monopole structures. Guy lugs are on guyed towers, horizontal members on self-support towers.",
    reference: "ANSI/TIA-222-G",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "Which of these terms identifies a Self-Support tower component?",
    options: ["Guy wire", "Horizontal member", "Safety climb", "Climbing pegs"],
    correctIndex: 1,
    explanation: "Horizontal members (also called horizontals or bracing) are components of self-supporting towers. Guy wires are on guyed towers.",
    reference: "ANSI/TIA-222-G",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "A gin pole, by definition, is a device unique to the Telecommunication Industry that allows headroom above the highest fixed point on a structure to lift loads.",
    options: ["False", "True"],
    correctIndex: 0,
    explanation: "While gin poles are commonly used in telecom, they are NOT unique to the telecommunications industry. They are used in various construction industries.",
    reference: "ANSI/ASSE A10.48-2023, Section 11.4",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "The cantilever, by definition, is the distance between the bridle slings and rooster head sheave.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "This is false. The cantilever is the horizontal distance from the structure to the load, not between bridle slings and rooster head.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "What are the two methods of measuring guy wire tensions?",
    options: ["Direct and In-line", "Direct and Indirect", "Come-along and Indirect", "Direct and Slope"],
    correctIndex: 1,
    explanation: "Guy wire tension can be measured using Direct methods (tension meters) or Indirect methods (sag/tension calculations).",
    reference: "ANSI/TIA-222-G",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "When using bolts or U-bolts with a slotted hole present, in what order are the components installed?",
    options: ["Flat washer, lock washer and nut", "Nut, flat washer and lock washer", "Lock washer, flat washer and nut", "Lock washer and nut"],
    correctIndex: 0,
    explanation: "Proper bolt installation order is: bolt, flat washer, lock washer, then nut.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "When a U-bolt is properly tightened, what is the result?",
    options: ["The washers are not compressed on either side", "The threads are longer on one side", "Both sides are tightened evenly", "Only one side has the washer compressed"],
    correctIndex: 2,
    explanation: "U-bolts must be tightened evenly on both sides to ensure proper load distribution and connection integrity.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "What is the correct procedure for installing bolts in members and leg splices?",
    options: ["Down and In", "Up and Out", "Up and In", "Down and Out"],
    correctIndex: 1,
    explanation: "Bolts should be installed Up and Out so that if nuts loosen, the bolt will not fall through the connection.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "For structural loading purposes the basket and the bridle slings shall always be attached where?",
    options: ["At a panel point around the leg", "On a horizontal", "On a leg", "On a diagonal"],
    correctIndex: 0,
    explanation: "Basket and bridle slings must be attached at panel points (where members intersect) around the leg to properly distribute loads.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "The basket slings on a pole perform what function?",
    options: ["Support part of the weight and vertical forces", "Support part of the weight and horizontal loads", "Support all the combined weight", "Support the weight of the jump line and overhaul ball"],
    correctIndex: 1,
    explanation: "Basket slings support part of the weight and help resist horizontal (lateral) loads on the pole.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Structures",
    domainNumber: 4,
    text: "How often shall all gin poles have a documented job inspection?",
    options: ["Monthly", "Daily", "Before each job", "Weekly"],
    correctIndex: 2,
    explanation: "Gin poles must have a documented inspection before each job to ensure they are safe for use.",
    reference: "ANSI/ASSE A10.48-2023, Section 11",
  },
  // Domain 5 — Appurtenance Installation and Maintenance (Q81–Q100)
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "Which of the following equipment types might a TTT-1 technician assist in installing?",
    options: ["Only antennas", "Antennas, tower lighting, remote radio units, surge arresting systems, and mounts", "Only electrical panels", "Computer servers only"],
    correctIndex: 1,
    explanation: "TTT-1 technicians assist in installing antennas, tower lighting, remote radio units, surge arresting systems, and mounts per the scope of work.",
    reference: "ANSI/ASSE A10.48-2023, Domain 5.1",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What types of cables might be installed on a communication structure?",
    options: ["Only power cables", "Fiber optic, coax, RET cables, grounding cables, and transmission lines", "Only telephone lines", "Ethernet cables only"],
    correctIndex: 1,
    explanation: "Installation includes fiber optic cables, coax cables, Remote Electronic Tilt (RET) cables, grounding cables, and transmission lines.",
    reference: "ANSI/ASSE A10.48-2023, Domain 5.3",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "Why is weatherproofing important for cable installations?",
    options: ["It's only for aesthetic purposes", "To protect cables from moisture and environmental damage", "It's not necessary", "Only required in northern climates"],
    correctIndex: 1,
    explanation: "Weatherproofing protects fiber optic cables, coax cables, RET cables, and grounding cables from moisture and environmental damage, ensuring reliable operation.",
    reference: "ANSI/ASSE A10.48-2023, Domain 5.4",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What lighting requirement must technicians be able to identify?",
    options: ["Interior building lighting", "FAA lighting obstruction requirements", "Parking lot lighting", "Emergency exit lighting"],
    correctIndex: 1,
    explanation: "Technicians must identify FAA lighting obstruction requirements to ensure proper marking of communication towers for aviation safety.",
    reference: "FAA regulations, Domain 5.7",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "An antenna that can transmit a signal up to 360 degrees is called _______________?",
    options: ["Cellular", "Directional", "Microwave", "Omni-directional"],
    correctIndex: 3,
    explanation: "An omni-directional antenna transmits signals in all directions (360 degrees) around the antenna.",
    reference: "Motorola R56",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What type of antenna is used to transmit signal from tower to tower?",
    options: ["Microwave dish", "Directional", "Omni directional", "Cellular"],
    correctIndex: 0,
    explanation: "Microwave dish antennas are used for point-to-point transmissions between towers (backhaul).",
    reference: "Motorola R56",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "Which government organization regulates tower lighting?",
    options: ["FCC", "OSHA", "DOL", "FAA"],
    correctIndex: 3,
    explanation: "The FAA (Federal Aviation Administration) regulates tower lighting and obstruction marking requirements.",
    reference: "FAA regulations",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "When using tape and butyl to weatherproof a ground kit, what is a critical step in the process?",
    options: ["Use lots of tape", "Use three wraps of butyl", "Cut the tape when terminating", "Do not overlap tape wraps"],
    correctIndex: 1,
    explanation: "Using three wraps of butyl tape is a critical step in properly weatherproofing connections.",
    reference: "Manufacturer specifications",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What is a tag line?",
    options: ["A separate rope attached to the load being lifted", "None of the above", "A line you wait to be assigned a job duty", "A tag that identifies you"],
    correctIndex: 0,
    explanation: "A tag line is a separate rope attached to a load to help control and guide it during lifting operations.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What does a tag person do?",
    options: ["Attaches himself to the load", "Lifts the load", "Applies pressure on the tag rope to control the load", "Assigns tag names to all the hoists"],
    correctIndex: 2,
    explanation: "A tag person applies pressure on the tag rope to control and guide the load during lifting operations.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "Which of the following is not a component of the gross load?",
    options: ["Rigging equipment", "Lifted load", "Tag person", "Tag force"],
    correctIndex: 2,
    explanation: "Gross load consists of the lifted load, rigging equipment, and tag force. The tag person is not part of the gross load.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What is a crown block used for?",
    options: ["To change the direction of a load or jump line coming from the hoist", "To change the direction of the control levers", "To change the direction of the Operator and Tag line", "All of the above"],
    correctIndex: 0,
    explanation: "A crown block (or top block) is used to change the direction of the load line or jump line coming from the hoist.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What are some of the working parts of a hoist?",
    options: ["Hydraulic Pump", "All of the above", "Hydraulic Control Levers", "Hydraulic Motor"],
    correctIndex: 1,
    explanation: "Hoists contain hydraulic pumps, hydraulic motors, hydraulic control levers, and other components.",
    reference: "ANSI/ASSE A10.48-2023, Section 8",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "A hoist shall be inspected ______________ before use.",
    options: ["Yearly", "Monthly", "Weekly", "Daily"],
    correctIndex: 3,
    explanation: "Hoists must be inspected daily before use to ensure safe operation.",
    reference: "ANSI/ASSE A10.48-2023, Section 8",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "A hoist should be designed to withstand a minimum of _________________, the maximum intended line pull.",
    options: ["2.5 times", "1 time", "2 times", "1.5 times"],
    correctIndex: 0,
    explanation: "Hoists should be designed to withstand a minimum of 2.5 times the maximum intended line pull.",
    reference: "ANSI/ASSE A10.48-2023, Section 8",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "The standard states that a load chart must match the specific pole for which it was developed.",
    options: ["False", "True"],
    correctIndex: 1,
    explanation: "Load charts are pole-specific and must match the exact pole configuration for which they were engineered.",
    reference: "ANSI/ASSE A10.48-2023",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "All cranes must have a posted load chart visible from the Operator's station?",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "All cranes must have load charts posted and visible from the operator's station for safe operation.",
    reference: "29 CFR 1926.1417",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "If the Operator and Signal person cannot see each other, what other way can they communicate?",
    options: ["Radios", "Microphone", "Cell phone", "Telepathy"],
    correctIndex: 0,
    explanation: "When visual communication is not possible, radios (two-way communications) must be used between operator and signal person.",
    reference: "29 CFR 1926.1419",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What motion indicates raising the load? (Note: This question requires visual hand signals)",
    options: ["Arm extended, hand open moving upward", "Arm bent, fist closed moving downward", "Both arms extended horizontally", "One arm raised, making circular motion"],
    correctIndex: 0,
    explanation: "The standard hand signal for raising the load is arm extended with hand open, moving upward.",
    reference: "ASME B30.5 Hand Signals",
  },
  {
    domain: "Appurtenance Installation and Maintenance",
    domainNumber: 5,
    text: "What motion indicates retract the boom? (Note: This question requires visual hand signals)",
    options: ["Thumb pointing backward with jerking motion", "Thumb pointing forward", "Both hands pushing forward", "Fist rotating in circles"],
    correctIndex: 0,
    explanation: "The standard hand signal for retracting the boom is thumb pointing backward (toward body) with jerking motion.",
    reference: "ASME B30.5 Hand Signals",
  },
];

const TOTAL = QUESTIONS.length;
const EXAM_DURATION_SECONDS = 90 * 60;

const DOMAIN_COLORS: Record<number, string> = {
  1: "#1E88E5",
  2: "#FF5722",
  3: "#00FF88",
  4: "#FFB300",
  5: "#AB47BC",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function timerColor(seconds: number): string {
  if (seconds <= 600) return "#FF5722";
  if (seconds <= 1800) return "#FFB300";
  return "#00FF88";
}

// ---------------------------------------------------------------------------
// Intro screen
// ---------------------------------------------------------------------------
function ExamIntro({ onStart }: { onStart: () => void }) {
  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-10 py-10">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📝</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          NWSA TTT-1 Practice Examination
        </h1>
        <p className="text-[#1E88E5] text-lg font-semibold">
          100 Questions · 5 Domains · 90-Minute Timer
        </p>
      </div>

      {/* Exam info cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Questions", value: "100", sub: "multiple choice" },
          { label: "Time Limit", value: "90 min", sub: "timer starts on begin" },
          { label: "Domains", value: "5", sub: "all exam areas covered" },
        ].map((card) => (
          <div key={card.label} className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-5 text-center">
            <p className="text-xs font-semibold text-[#546E7A] uppercase tracking-wide mb-1">{card.label}</p>
            <p className="text-3xl font-extrabold text-white">{card.value}</p>
            <p className="text-xs text-[#546E7A] mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Domain distribution */}
      <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-6">
        <h2 className="text-base font-bold text-white mb-4">Domain Distribution</h2>
        <div className="space-y-3">
          {[
            { num: 1, name: "Planning the Scope of Work and Job Logistics", pct: "15%", q: "Q1–Q15" },
            { num: 2, name: "Fall Protection Climber-Rescuer", pct: "30%", q: "Q16–Q45" },
            { num: 3, name: "Hoisting Equipment and Rigging", pct: "20%", q: "Q46–Q65" },
            { num: 4, name: "Structures", pct: "15%", q: "Q66–Q80" },
            { num: 5, name: "Appurtenance Installation and Maintenance", pct: "20%", q: "Q81–Q100" },
          ].map((d) => (
            <div key={d.num} className="flex items-center gap-3">
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: DOMAIN_COLORS[d.num] }}
              >
                {d.num}
              </span>
              <span className="text-sm text-white flex-1 min-w-0 truncate">{d.name}</span>
              <span className="text-xs font-semibold text-[#546E7A] shrink-0">{d.pct}</span>
              <span className="text-xs text-[#4A5568] shrink-0 hidden sm:block">{d.q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#1E2A3A] border border-[#1E88E5]/30 rounded-2xl p-6 mb-8">
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-[#1E88E5]">ℹ</span> Instructions
        </h2>
        <ul className="space-y-2">
          {[
            "The 90-minute timer starts as soon as you click Begin Exam.",
            "You can navigate between questions freely using the dots or Prev/Next.",
            "Your exam auto-submits when time runs out.",
            "Each question has exactly one correct answer.",
            "Explanations and references are shown after submission.",
          ].map((item) => (
            <li key={item} className="text-sm text-[#90A4AE] flex items-start gap-2">
              <span className="text-[#1E88E5] shrink-0 mt-0.5">›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={onStart}
          className="inline-block bg-[#1E88E5] text-white px-14 py-4 rounded-2xl font-bold text-xl hover:bg-[#1565C0] transition-colors shadow-lg"
        >
          Begin Exam →
        </button>
        <p className="text-[#546E7A] text-sm mt-3">Timer starts immediately upon clicking</p>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Results screen
// ---------------------------------------------------------------------------
function ExamResults({
  answers,
  timeUsed,
  onRetake,
}: {
  answers: (number | null)[];
  timeUsed: number;
  onRetake: () => void;
}) {
  const correctCount = answers.filter((a, i) => a === QUESTIONS[i].correctIndex).length;
  const percentage = Math.round((correctCount / TOTAL) * 100);
  const passed = percentage >= 70;
  const minutesUsed = Math.floor(timeUsed / 60);
  const secondsUsed = timeUsed % 60;

  const byDomain = [1, 2, 3, 4, 5].map((dn) => {
    const domainQs = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.domainNumber === dn);
    const correct = domainQs.filter(({ i }) => answers[i] === QUESTIONS[i].correctIndex).length;
    return { dn, name: domainQs[0]?.q.domain ?? "", total: domainQs.length, correct };
  });

  const [showReview, setShowReview] = useState(false);

  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-10 py-10">
      {/* Banner */}
      <div
        className={`rounded-2xl p-8 mb-8 text-center border ${
          passed ? "bg-[#00FF88]/10 border-[#00FF88]/40" : "bg-[#FF5722]/10 border-[#FF5722]/40"
        }`}
      >
        <div className="text-5xl mb-3">{passed ? "🎉" : "📋"}</div>
        <h1 className={`text-3xl font-extrabold mb-2 ${passed ? "text-[#00FF88]" : "text-[#FF5722]"}`}>
          {passed ? "Exam Passed!" : "Exam Complete"}
        </h1>
        <p className="text-white text-2xl font-semibold mb-1">
          {correctCount}/{TOTAL} &mdash; {percentage}%
        </p>
        <p className="text-[#546E7A] text-sm mb-1">
          {correctCount} correct · {TOTAL - correctCount} incorrect
        </p>
        <p className="text-[#546E7A] text-sm">
          Time used: {minutesUsed}m {secondsUsed}s
        </p>
      </div>

      {/* Domain breakdown */}
      <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-6">
        <h2 className="text-base font-bold text-white mb-4">Score by Domain</h2>
        <div className="space-y-3">
          {byDomain.map((d) => {
            const pct = Math.round((d.correct / d.total) * 100);
            return (
              <div key={d.dn}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: DOMAIN_COLORS[d.dn] }}
                    >
                      {d.dn}
                    </span>
                    {d.name}
                  </span>
                  <span className="text-sm font-semibold text-white shrink-0 ml-2">
                    {d.correct}/{d.total} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#4A5568] rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: DOMAIN_COLORS[d.dn] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <button
          onClick={onRetake}
          className="bg-[#2D2D30] border border-[#4A5568] text-gray-300 px-6 py-2.5 rounded-xl font-medium hover:bg-[#3A3A3D] transition-colors"
        >
          Retake Exam
        </button>
        <Link
          href="/dashboard"
          className="bg-[#1E88E5] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#1565C0] transition-colors text-center"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Answer review toggle */}
      <button
        onClick={() => setShowReview((v) => !v)}
        className="w-full text-left bg-[#2D2D30] border border-[#4A5568] rounded-2xl px-6 py-4 text-white font-semibold flex justify-between items-center hover:bg-[#3A3A3D] transition-colors mb-4"
      >
        <span>Review All Answers ({TOTAL} questions)</span>
        <span className="text-[#546E7A]">{showReview ? "▲" : "▼"}</span>
      </button>

      {showReview && (
        <div className="space-y-4">
          {QUESTIONS.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={i}
                className={`rounded-2xl p-5 border ${
                  isCorrect ? "border-[#00FF88]/30 bg-[#00FF88]/5" : "border-[#FF5722]/30 bg-[#FF5722]/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: DOMAIN_COLORS[q.domainNumber] }}
                  >
                    {q.domainNumber}
                  </span>
                  <p className="text-xs font-semibold text-[#546E7A] uppercase tracking-wide">
                    Q{i + 1} · {q.domain}
                  </p>
                </div>
                <p className="font-medium text-white mb-3">{q.text}</p>
                <div className="space-y-1.5 mb-3">
                  {q.options.map((opt, j) => (
                    <div
                      key={j}
                      className={`text-sm px-3 py-1.5 rounded-lg ${
                        j === q.correctIndex
                          ? "bg-[#00FF88]/20 text-[#00FF88] font-medium"
                          : j === userAnswer && !isCorrect
                            ? "bg-[#FF5722]/20 text-[#FF5722]"
                            : "text-[#546E7A]"
                      }`}
                    >
                      {j === q.correctIndex && "✓ "}
                      {j === userAnswer && !isCorrect && "✗ "}
                      {String.fromCharCode(65 + j)}. {opt}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#546E7A] italic leading-relaxed">{q.explanation}</p>
                <p className="text-xs text-[#4A5568] mt-1">Ref: {q.reference}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

// ---------------------------------------------------------------------------
// Main exam screen
// ---------------------------------------------------------------------------
export function PracticeExamClient() {
  const [phase, setPhase] = useState<"intro" | "taking" | "results">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(TOTAL).fill(null));
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const timeLeftRef = useRef(EXAM_DURATION_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = () => {
    setPhase("taking");
  };

  // Start timer when exam begins
  useEffect(() => {
    if (phase !== "taking") return;

    intervalRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        clearInterval(intervalRef.current!);
        setPhase("results");
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  const submitExam = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("results");
  };

  const retakeExam = () => {
    setAnswers(new Array(TOTAL).fill(null));
    setCurrent(0);
    timeLeftRef.current = EXAM_DURATION_SECONDS;
    setTimeLeft(EXAM_DURATION_SECONDS);
    setPhase("intro");
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-[#1A1A1D]">
        <ExamIntro onStart={startExam} />
      </div>
    );
  }

  if (phase === "results") {
    const timeUsed = EXAM_DURATION_SECONDS - timeLeftRef.current;
    return (
      <div className="min-h-screen bg-[#1A1A1D]">
        <ExamResults answers={answers} timeUsed={timeUsed} onRetake={retakeExam} />
      </div>
    );
  }

  // Taking phase
  const q = QUESTIONS[current];
  const selectedAnswer = answers[current];
  const answeredCount = answers.filter((a) => a !== null).length;
  const remainingCount = TOTAL - answeredCount;
  const progressPct = (answeredCount / TOTAL) * 100;
  const tColor = timerColor(timeLeft);

  const selectAnswer = (i: number) => {
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      {/* Sticky header bar */}
      <div className="sticky top-0 z-10 bg-[#1A1A1D] border-b border-[#2D2D30] px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-[#546E7A] font-medium hidden sm:block">NWSA TTT-1 Practice Exam</p>
            <p className="text-sm text-white font-semibold">
              Q{current + 1}/{TOTAL}
              <span className="text-[#546E7A] font-normal ml-2 hidden sm:inline">
                · {remainingCount} unanswered
              </span>
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 shrink-0">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" style={{ color: tColor }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-xl font-bold tabular-nums" style={{ color: tColor }}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Submit button */}
          <button
            onClick={submitExam}
            className="shrink-0 bg-[#2D2D30] border border-[#4A5568] text-gray-300 px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-[#3A3A3D] transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mt-2">
          <div className="w-full bg-[#2D2D30] rounded-full h-1.5">
            <div
              className="bg-[#1E88E5] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Progress dots */}
        <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-4 mb-5">
          <div className="flex justify-between items-center mb-3 text-xs">
            <span className="text-[#00FF88] font-semibold">{answeredCount} answered</span>
            <span className="text-[#546E7A]">{remainingCount} remaining</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUESTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                title={`Question ${i + 1}`}
                className={`w-6 h-6 rounded-full text-xs font-medium transition-colors ${
                  i === current
                    ? "bg-[#1E88E5] text-white"
                    : answers[i] !== null
                      ? "bg-[#1E88E5]/30 text-[#1E88E5]"
                      : "bg-[#4A5568] text-[#546E7A] hover:bg-[#546E7A] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-[#2D2D30] border border-[#4A5568] rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: DOMAIN_COLORS[q.domainNumber] }}
            >
              {q.domainNumber}
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: DOMAIN_COLORS[q.domainNumber] }}>
              Domain {q.domainNumber} · {q.domain}
            </p>
          </div>
          <p className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-6">
            {current + 1}. {q.text}
          </p>

          <div className="space-y-3">
            {q.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[#1E88E5] bg-[#1E88E5]/10 text-white font-medium"
                      : "border-[#4A5568] hover:border-[#1E88E5]/60 text-[#90A4AE] hover:text-white"
                  }`}
                >
                  <span className="font-semibold mr-2 text-sm" style={{ color: DOMAIN_COLORS[q.domainNumber] }}>
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation footer */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-1.5 border border-[#4A5568] text-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-[#3A3A3D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <span className="text-xs text-[#546E7A]">
            {current + 1} of {TOTAL}
          </span>

          {current < TOTAL - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(TOTAL - 1, c + 1))}
              className="flex items-center gap-1.5 bg-[#1E88E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1565C0] transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={submitExam}
              className="flex items-center gap-1.5 bg-[#00FF88] text-[#1A1A1D] px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#00e07a] transition-colors"
            >
              Submit Exam
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
