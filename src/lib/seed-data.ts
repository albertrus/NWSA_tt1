export const regulationsStandardsQuestions = [
  {
    order: 1,
    text: "Which OSHA standard applies to construction activities such as tower erection and modification?",
    options: JSON.stringify([
      "29 CFR 1910 – General Industry",
      "29 CFR 1926 – Construction",
      "29 CFR 1915 – Shipyard Employment",
      "29 CFR 1904 – Recordkeeping",
    ]),
    correctAnswer: 1,
    explanation:
      "29 CFR 1926 is OSHA's construction standard and governs tower erection, modification, and other construction-related telecom work.",
  },
  {
    order: 2,
    text: "29 CFR 1910 is OSHA's standard for which type of workplace?",
    options: JSON.stringify([
      "Construction sites",
      "Maritime operations",
      "General industry (permanent workplaces)",
      "Agricultural operations",
    ]),
    correctAnswer: 2,
    explanation:
      "29 CFR 1910 covers General Industry — permanent facilities and non-construction environments such as manufacturing plants and warehouses.",
  },
  {
    order: 3,
    text: "When might 29 CFR 1910 apply to a tower technician instead of 29 CFR 1926?",
    options: JSON.stringify([
      "When working at heights above 50 feet",
      "When performing routine maintenance at a permanent facility with no construction activity",
      "When a contractor rather than an employee is doing the work",
      "1910 never applies to tower technicians",
    ]),
    correctAnswer: 1,
    explanation:
      "If tower work is classified as routine maintenance at an existing permanent facility — not 'construction' — OSHA may apply 1910 (General Industry) standards.",
  },
  {
    order: 4,
    text: "What structural design standard governs the loading and analysis of antenna-supporting structures in the United States?",
    options: JSON.stringify([
      "ANSI/TIA-568",
      "ANSI/TIA-222",
      "NFPA 70E",
      "IEEE 802.11",
    ]),
    correctAnswer: 1,
    explanation:
      "ANSI/TIA-222 (currently Revision H) is the primary structural standard for the design, analysis, and construction of antenna-supporting structures and antennas.",
  },
  {
    order: 5,
    text: "TIA-222-H introduced which major change compared to earlier revisions?",
    options: JSON.stringify([
      "Required all towers to be painted orange and white",
      "Adopted a strength-based (Load and Resistance Factor Design) methodology",
      "Eliminated wind load calculations for towers under 200 feet",
      "Mandated GPS monitoring on all guyed towers",
    ]),
    correctAnswer: 1,
    explanation:
      "TIA-222-H (2017) transitioned to a Load and Resistance Factor Design (LRFD) approach, replacing the allowable stress design method used in prior revisions.",
  },
  {
    order: 6,
    text: "Which federal agency has authority over tower obstruction marking and lighting for aviation safety?",
    options: JSON.stringify([
      "FCC (Federal Communications Commission)",
      "FAA (Federal Aviation Administration)",
      "OSHA (Occupational Safety and Health Administration)",
      "NEC (National Electrical Code)",
    ]),
    correctAnswer: 1,
    explanation:
      "The FAA establishes obstruction marking and lighting requirements for towers through Advisory Circulars (e.g., AC 70/7460-1) to protect air navigation.",
  },
  {
    order: 7,
    text: "Under FAA rules, at what height above ground level (AGL) must the owner of a proposed structure notify the FAA?",
    options: JSON.stringify([
      "100 feet AGL",
      "150 feet AGL",
      "200 feet AGL",
      "500 feet AGL",
    ]),
    correctAnswer: 0,
    explanation:
      "FAA regulations (14 CFR Part 77) require owners to notify the FAA of any proposed structure that will exceed 200 feet AGL — but notification is required at 100 feet AGL near airports.",
  },
  {
    order: 8,
    text: "What does the FCC regulate that directly affects tower technicians regarding RF energy?",
    options: JSON.stringify([
      "Tower structural load limits",
      "Maximum permissible exposure (MPE) limits for radiofrequency radiation",
      "Tower painting color codes",
      "Fall arrest system specifications",
    ]),
    correctAnswer: 1,
    explanation:
      "The FCC establishes Maximum Permissible Exposure (MPE) limits for RF electromagnetic fields to protect workers and the general public from excessive RF energy.",
  },
  {
    order: 9,
    text: "Which FCC document defines RF exposure limits and requires site evaluations for transmitter sites?",
    options: JSON.stringify([
      "FCC Part 15 – Unlicensed devices",
      "FCC OET Bulletin 65 – Evaluating Compliance with RF Exposure Guidelines",
      "FCC Part 68 – Connection of terminal equipment",
      "FCC Part 90 – Land mobile radio",
    ]),
    correctAnswer: 1,
    explanation:
      "FCC OET Bulletin 65 provides guidelines and procedures for evaluating compliance with RF exposure limits at transmitter sites, which technicians must understand before climbing.",
  },
  {
    order: 10,
    text: "What is the key difference between a 'regulation' and a 'standard' in the context of tower work?",
    options: JSON.stringify([
      "Regulations are written by industry; standards are written by government",
      "Regulations are legally enforceable by government; standards are voluntary guidelines unless adopted by law",
      "Standards are more strict than regulations",
      "There is no practical difference",
    ]),
    correctAnswer: 1,
    explanation:
      "Regulations (such as OSHA rules) are government-mandated and legally enforceable; standards (such as TIA-222) are developed by industry bodies and become mandatory only when adopted into law or regulation.",
  },
  {
    order: 11,
    text: "OSHA compliance officers have the right to do which of the following without advance notice?",
    options: JSON.stringify([
      "Shut down a job site permanently",
      "Conduct unannounced workplace inspections",
      "Arrest employees for safety violations",
      "Impose criminal charges without a court order",
    ]),
    correctAnswer: 1,
    explanation:
      "OSHA inspectors have the legal right to conduct unannounced inspections of worksites; employers generally cannot refuse entry, though employers may request a warrant.",
  },
  {
    order: 12,
    text: "After an OSHA inspection, the agency may issue a citation with a proposed penalty. How long does an employer have to contest the citation?",
    options: JSON.stringify([
      "5 working days",
      "15 working days",
      "30 calendar days",
      "60 calendar days",
    ]),
    correctAnswer: 1,
    explanation:
      "Employers have 15 working days from receipt of the citation to formally contest it before the Occupational Safety and Health Review Commission (OSHRC).",
  },
  {
    order: 13,
    text: "Which of the following is an employer's responsibility under the OSH Act's General Duty Clause?",
    options: JSON.stringify([
      "Provide employees with free transportation to the job site",
      "Furnish a workplace free from recognized hazards likely to cause death or serious harm",
      "Supply employees with personal cell phones for emergency contact",
      "Guarantee that no injuries will ever occur",
    ]),
    correctAnswer: 1,
    explanation:
      "Section 5(a)(1) of the OSH Act — the General Duty Clause — requires employers to provide a workplace free from recognized hazards that could cause death or serious physical harm.",
  },
  {
    order: 14,
    text: "Under OSHA, employees have the right to:",
    options: JSON.stringify([
      "Refuse all hazardous work without consequence regardless of circumstances",
      "Review the OSHA 300 log of work-related injuries and illnesses",
      "Negotiate their own safety standards with management",
      "Conduct their own official OSHA inspections",
    ]),
    correctAnswer: 1,
    explanation:
      "Employees have the right to access their employer's OSHA 300 Log, which records work-related injuries and illnesses, as guaranteed under 29 CFR 1904.",
  },
  {
    order: 15,
    text: "Employers covered by OSHA's recordkeeping rule must post the OSHA 300A Summary for how long each year?",
    options: JSON.stringify([
      "January 1 through March 31",
      "February 1 through April 30",
      "January 1 through June 30",
      "Throughout the entire calendar year",
    ]),
    correctAnswer: 1,
    explanation:
      "The OSHA 300A Annual Summary must be posted in the workplace from February 1 through April 30 of the year following the year covered by the form.",
  },
  {
    order: 16,
    text: "How quickly must an employer report a work-related fatality to OSHA?",
    options: JSON.stringify([
      "Within 24 hours",
      "Within 8 hours",
      "Within 72 hours",
      "Within 5 business days",
    ]),
    correctAnswer: 1,
    explanation:
      "OSHA requires employers to report any work-related fatality to OSHA within 8 hours of learning about it (29 CFR 1904.39).",
  },
  {
    order: 17,
    text: "Under OSHA reporting requirements, a work-related in-patient hospitalization must be reported within:",
    options: JSON.stringify([
      "8 hours",
      "24 hours",
      "48 hours",
      "72 hours",
    ]),
    correctAnswer: 1,
    explanation:
      "In-patient hospitalizations, amputations, and losses of an eye must be reported to OSHA within 24 hours of the employer learning of the event (29 CFR 1904.39).",
  },
  {
    order: 18,
    text: "OSHA defines a 'competent person' as someone who:",
    options: JSON.stringify([
      "Holds a four-year engineering degree",
      "Is capable of identifying existing and predictable hazards and has authority to take prompt corrective measures",
      "Has completed a 30-hour OSHA training course",
      "Is licensed by the state as a safety professional",
    ]),
    correctAnswer: 1,
    explanation:
      "OSHA's competent person must be able to identify hazards in the surroundings or working conditions that are unsanitary, hazardous, or dangerous, and have authorization to take prompt corrective action.",
  },
  {
    order: 19,
    text: "How does OSHA define a 'qualified person'?",
    options: JSON.stringify([
      "Any employee who has received on-the-job training",
      "One who, by possession of a recognized degree, certificate, or professional standing, or by extensive knowledge, training, and experience, has demonstrated the ability to solve problems relating to the subject matter and work",
      "A person who has passed a background check",
      "An employee who has worked for the company for at least one year",
    ]),
    correctAnswer: 1,
    explanation:
      "A qualified person has demonstrated the ability to solve problems related to the work, either through formal credentials or extensive knowledge and experience.",
  },
  {
    order: 20,
    text: "An 'authorized person' in OSHA terminology is best described as:",
    options: JSON.stringify([
      "A government inspector approved to enter the site",
      "A person approved or assigned by the employer to perform a specific duty or to be present in a specific location",
      "Any worker who has signed a safety waiver",
      "A person holding a valid state contractor's license",
    ]),
    correctAnswer: 1,
    explanation:
      "An authorized person is designated by the employer to perform specific duties in specific locations — distinct from a competent person or qualified person.",
  },
  {
    order: 21,
    text: "Under what specific conditions does OSHA allow an employee to refuse to perform assigned work?",
    options: JSON.stringify([
      "Whenever the employee personally feels uncomfortable with the task",
      "When there is a genuine, reasonable belief of imminent danger of death or serious injury and the employer refuses to correct the hazard",
      "When overtime would result from completing the task",
      "Whenever a supervisor is not present on site",
    ]),
    correctAnswer: 1,
    explanation:
      "OSHA's right to refuse unsafe work applies when an employee has a reasonable belief that the hazard poses imminent danger of death or serious injury and the employer will not correct it in time.",
  },
  {
    order: 22,
    text: "Which section of the OSH Act protects employees from retaliation for reporting safety violations?",
    options: JSON.stringify([
      "Section 5 – General Duty Clause",
      "Section 11(c) – Whistleblower protection",
      "Section 8 – Inspections and investigations",
      "Section 17 – Penalties",
    ]),
    correctAnswer: 1,
    explanation:
      "Section 11(c) of the OSH Act prohibits employers from retaliating against employees who exercise their safety and health rights, including reporting hazards or participating in OSHA inspections.",
  },
  {
    order: 23,
    text: "An employee who believes they were fired for reporting a safety hazard must file an OSHA whistleblower complaint within:",
    options: JSON.stringify([
      "30 days of the adverse action",
      "60 days of the adverse action",
      "90 days of the adverse action",
      "180 days of the adverse action",
    ]),
    correctAnswer: 0,
    explanation:
      "Under Section 11(c) of the OSH Act, employees must file a whistleblower retaliation complaint with OSHA within 30 days of the alleged adverse action.",
  },
  {
    order: 24,
    text: "OSHA's Hazard Communication Standard (HazCom) aligns with which international system?",
    options: JSON.stringify([
      "ISO 9001 Quality Management",
      "Globally Harmonized System (GHS) of Classification and Labeling of Chemicals",
      "UN Model Regulations for Transport of Dangerous Goods",
      "EU REACH chemical regulation",
    ]),
    correctAnswer: 1,
    explanation:
      "OSHA's HazCom Standard (29 CFR 1910.1200) was updated to align with the Globally Harmonized System (GHS), standardizing chemical hazard classification and communication worldwide.",
  },
  {
    order: 25,
    text: "Under HazCom/GHS, chemical containers must be labeled with which of the following?",
    options: JSON.stringify([
      "Product identifier, signal word, hazard pictograms, precautionary statements, and supplier information",
      "Only the product name and net weight",
      "The SDS section numbers that apply to the chemical",
      "The employee's name who last used the chemical",
    ]),
    correctAnswer: 0,
    explanation:
      "GHS labels require the product identifier, signal word (Danger/Warning), hazard pictograms, hazard statements, precautionary statements, and supplier identification.",
  },
  {
    order: 26,
    text: "How many sections does a GHS-compliant Safety Data Sheet (SDS) contain?",
    options: JSON.stringify([
      "8 sections",
      "12 sections",
      "16 sections",
      "20 sections",
    ]),
    correctAnswer: 2,
    explanation:
      "A GHS-compliant SDS contains exactly 16 standardized sections, ensuring consistent chemical safety information across all products and countries.",
  },
  {
    order: 27,
    text: "Which SDS section covers first aid measures for exposure to a hazardous chemical?",
    options: JSON.stringify([
      "Section 2 – Hazard Identification",
      "Section 4 – First Aid Measures",
      "Section 8 – Exposure Controls/Personal Protection",
      "Section 11 – Toxicological Information",
    ]),
    correctAnswer: 1,
    explanation:
      "SDS Section 4 – First Aid Measures describes the initial care required following exposure by inhalation, skin contact, eye contact, or ingestion.",
  },
  {
    order: 28,
    text: "Which SDS section would a tower technician consult to find the permissible exposure limit (PEL) and required respiratory protection for a chemical?",
    options: JSON.stringify([
      "Section 3 – Composition/Information on Ingredients",
      "Section 7 – Handling and Storage",
      "Section 8 – Exposure Controls/Personal Protection",
      "Section 9 – Physical and Chemical Properties",
    ]),
    correctAnswer: 2,
    explanation:
      "SDS Section 8 lists occupational exposure limits, engineering controls, and personal protective equipment including respiratory protection requirements.",
  },
  {
    order: 29,
    text: "Under OSHA's HazCom standard, employees must have access to SDSs:",
    options: JSON.stringify([
      "Only during scheduled safety meetings",
      "During their work shifts when they are in the work area",
      "Only after they have completed HazCom training",
      "Only when personally requested from the safety officer",
    ]),
    correctAnswer: 1,
    explanation:
      "OSHA requires that SDSs be readily accessible to employees during their work shift while they are in their work area, either in paper or electronic form.",
  },
  {
    order: 30,
    text: "OSHA requires employers to provide HazCom training to employees:",
    options: JSON.stringify([
      "Only when a new OSHA inspection is scheduled",
      "At the time of initial assignment and whenever a new chemical hazard is introduced into the work area",
      "Once every five years as a refresher",
      "Only after an incident involving a chemical occurs",
    ]),
    correctAnswer: 1,
    explanation:
      "HazCom training must be provided at initial assignment and whenever a new chemical hazard is introduced to the workplace, so workers are always informed.",
  },
  {
    order: 31,
    text: "OSHA requires that training records for safety training (such as fall protection or HazCom) be:",
    options: JSON.stringify([
      "Stored only in the employee's personal file and never shared",
      "Maintained and available for inspection, typically including the employee name, training date, and subject",
      "Destroyed after 90 days for privacy reasons",
      "Kept only at corporate headquarters, not on the job site",
    ]),
    correctAnswer: 1,
    explanation:
      "OSHA requires training records to be documented and retained, generally showing who was trained, when, and on what topic, and they must be available for OSHA inspection.",
  },
  {
    order: 32,
    text: "Which OSHA standard covers first aid requirements on construction job sites?",
    options: JSON.stringify([
      "29 CFR 1926.23 and 1926.50 – First Aid and Medical Attention",
      "29 CFR 1910.147 – Control of Hazardous Energy",
      "29 CFR 1926.502 – Fall Protection Systems",
      "29 CFR 1910.134 – Respiratory Protection",
    ]),
    correctAnswer: 0,
    explanation:
      "29 CFR 1926.50 requires that construction sites have first aid supplies and that in the absence of an infirmary or clinic, a person trained in first aid be available.",
  },
  {
    order: 33,
    text: "Under 29 CFR 1926.50, if a medical facility is not near a construction site, what must the employer ensure?",
    options: JSON.stringify([
      "A helicopter landing zone is marked on site",
      "A person trained in first aid is present at the worksite",
      "All workers carry their own first aid kits",
      "Work must stop any time an injury occurs",
    ]),
    correctAnswer: 1,
    explanation:
      "When a medical facility is not in near proximity, 29 CFR 1926.50 requires that at least one person trained in first aid be on site to provide emergency care.",
  },
  {
    order: 34,
    text: "The OSHA 300 Log is used to record:",
    options: JSON.stringify([
      "All near-miss incidents, regardless of injury",
      "Work-related injuries and illnesses that meet OSHA recordability criteria",
      "Employee training completion dates",
      "Equipment inspection results",
    ]),
    correctAnswer: 1,
    explanation:
      "The OSHA 300 Log (Log of Work-Related Injuries and Illnesses) records specific work-related injuries and illnesses that meet OSHA's recordability thresholds, such as lost workdays, medical treatment beyond first aid, and restricted duty.",
  },
  {
    order: 35,
    text: "Which of the following injuries is generally NOT recordable on the OSHA 300 Log?",
    options: JSON.stringify([
      "A fracture requiring a cast",
      "A laceration requiring stitches",
      "A cut treated only with a bandage (first aid only)",
      "An injury resulting in lost work days",
    ]),
    correctAnswer: 2,
    explanation:
      "Injuries treated solely with first aid (as defined by OSHA) — such as a minor cut requiring only a bandage — are not recordable on the OSHA 300 Log.",
  },
  {
    order: 36,
    text: "NFPA is an organization that publishes fire and life safety codes. Which NFPA standard addresses electrical safety in the workplace?",
    options: JSON.stringify([
      "NFPA 10 – Portable Fire Extinguishers",
      "NFPA 70E – Standard for Electrical Safety in the Workplace",
      "NFPA 101 – Life Safety Code",
      "NFPA 72 – National Fire Alarm and Signaling Code",
    ]),
    correctAnswer: 1,
    explanation:
      "NFPA 70E establishes electrical safety requirements to protect workers from electrical hazards such as arc flash and shock, and is commonly used alongside OSHA electrical standards.",
  },
  {
    order: 37,
    text: "FAA Advisory Circular AC 70/7460-1 primarily covers:",
    options: JSON.stringify([
      "Pilot licensing requirements",
      "Obstruction marking and lighting standards for structures",
      "Air traffic control procedures near towers",
      "Drone flight rules near antenna structures",
    ]),
    correctAnswer: 1,
    explanation:
      "FAA AC 70/7460-1 (Obstruction Marking and Lighting) provides the standards for painting, marking, and lighting towers and other structures to make them visible to aircraft.",
  },
  {
    order: 38,
    text: "Which ANSI standard series covers the safety requirements for personal fall arrest systems and equipment used by tower technicians?",
    options: JSON.stringify([
      "ANSI/TIA-222",
      "ANSI/ASSE Z359 – Fall Protection Code",
      "ANSI Z87.1 – Eye and Face Protection",
      "ANSI B11 – Machine Safety",
    ]),
    correctAnswer: 1,
    explanation:
      "The ANSI/ASSE Z359 series (Fall Protection Code) covers the design, performance, and use of fall protection equipment including harnesses, lanyards, and self-retracting lifelines.",
  },
  {
    order: 39,
    text: "An employer is required to maintain OSHA injury and illness records (Form 300, 300A, and 301) for how long?",
    options: JSON.stringify([
      "1 year",
      "3 years",
      "5 years",
      "10 years",
    ]),
    correctAnswer: 2,
    explanation:
      "OSHA requires that the 300, 300A, and 301 forms be retained for 5 years following the end of the calendar year that the records cover (29 CFR 1904.33).",
  },
  {
    order: 40,
    text: "Under OSHA's training documentation requirements, which of the following must typically be documented to show a training session occurred?",
    options: JSON.stringify([
      "Only a verbal confirmation from the supervisor",
      "Employee name, date of training, trainer's name, and topics covered",
      "A notarized affidavit signed by the employee",
      "A passing score on a 100-question written exam",
    ]),
    correctAnswer: 1,
    explanation:
      "Training records must include at minimum the names of employees trained, the date(s) of training, the subject matter covered, and the name of the trainer to demonstrate compliance with OSHA standards.",
  },
];

export const seedChapters = [
  {
    order: 1,
    title: "Introduction to Message Systems",
    description: "Learn the fundamentals of message systems and protocols.",
    content: `# Introduction to Message Systems

Message systems are fundamental building blocks of modern distributed applications. In this chapter, we will explore the core concepts that underpin message-based communication.

## What is a Message System?

A message system is a software infrastructure that enables asynchronous communication between applications, services, or components. Rather than communicating directly (synchronously), components exchange messages through a shared intermediary.

## Key Concepts

### 1. Message
A message is the basic unit of data exchange. It typically consists of:
- **Header**: Metadata about the message (routing, priority, timestamps)
- **Body**: The actual payload data
- **Properties**: Additional attributes for message processing

### 2. Queue
A queue is a data structure that stores messages in FIFO (First-In, First-Out) order. Messages wait in the queue until a consumer is ready to process them.

### 3. Topic
A topic is a logical channel for publish/subscribe messaging. Multiple consumers can subscribe to receive copies of each message published to a topic.

### 4. Producer
A producer (or publisher) is the component that creates and sends messages to the message system.

### 5. Consumer
A consumer (or subscriber) is the component that receives and processes messages from the message system.

## Benefits of Message Systems

- **Decoupling**: Components do not need to know about each other
- **Scalability**: Easy to add more consumers for load distribution
- **Reliability**: Messages can be persisted and retried
- **Flexibility**: Different communication patterns (point-to-point, pub/sub)

## Summary

Understanding these foundational concepts is essential for the TT1 exam. In the following chapters, we will dive deeper into specific protocols, patterns, and best practices.`,
    quiz: {
      title: "Introduction to Message Systems - Quiz",
      questions: [
        {
          order: 1,
          text: "What is the primary purpose of a message system?",
          options: JSON.stringify([
            "To enable synchronous communication only",
            "To enable asynchronous communication between components",
            "To replace all direct API calls",
            "To store data permanently",
          ]),
          correctAnswer: 1,
          explanation:
            "Message systems primarily enable asynchronous communication between applications and components.",
        },
        {
          order: 2,
          text: "Which data structure does a queue use for message ordering?",
          options: JSON.stringify([
            "LIFO (Last-In, First-Out)",
            "Random order",
            "FIFO (First-In, First-Out)",
            "Priority-based only",
          ]),
          correctAnswer: 2,
          explanation:
            "A queue uses FIFO (First-In, First-Out) ordering — the first message added is the first to be processed.",
        },
        {
          order: 3,
          text: "What is the difference between a Queue and a Topic?",
          options: JSON.stringify([
            "Queues are faster than Topics",
            "Topics support point-to-point, Queues support pub/sub",
            "Queues support point-to-point, Topics support publish/subscribe",
            "There is no difference",
          ]),
          correctAnswer: 2,
          explanation:
            "Queues implement point-to-point messaging (one consumer gets each message), while Topics implement publish/subscribe (multiple subscribers can receive each message).",
        },
        {
          order: 4,
          text: "Which of these is NOT a benefit of message systems?",
          options: JSON.stringify([
            "Decoupling of components",
            "Scalability through adding consumers",
            "Requiring all components to be online simultaneously",
            "Message persistence and retry capability",
          ]),
          correctAnswer: 2,
          explanation:
            "Message systems actually REMOVE the requirement for simultaneous availability — this is one of their key advantages (asynchronous communication).",
        },
        {
          order: 5,
          text: "What does a message Header typically contain?",
          options: JSON.stringify([
            "Only the payload data",
            "Metadata such as routing info, priority, and timestamps",
            "The consumer's address",
            "Database connection strings",
          ]),
          correctAnswer: 1,
          explanation:
            "Message headers contain metadata about the message, such as routing information, priority, and timestamps.",
        },
      ],
    },
  },
  {
    order: 2,
    title: "Message Protocols and Standards",
    description: "Understand the key protocols used in enterprise messaging.",
    content: `# Message Protocols and Standards

In this chapter, we explore the protocols and standards that govern how messages are formatted, transmitted, and processed in enterprise environments.

## AMQP (Advanced Message Queuing Protocol)

AMQP is an open standard application layer protocol for message-oriented middleware. It defines:
- A wire-level protocol for message passing
- Message orientation, queuing, routing, reliability, and security
- Interoperability between different implementations

### AMQP Key Features:
- **Reliability**: At-most-once, at-least-once, exactly-once delivery
- **Security**: Built-in SASL authentication and TLS encryption
- **Flexibility**: Supports multiple messaging patterns

## MQTT (Message Queuing Telemetry Transport)

MQTT is a lightweight publish/subscribe messaging protocol, ideal for IoT and mobile applications.

### MQTT Characteristics:
- **Lightweight**: Minimal bandwidth and battery usage
- **QoS Levels**: 0 (at most once), 1 (at least once), 2 (exactly once)
- **Persistent Sessions**: Support for offline message storage

## JMS (Java Message Service)

JMS is a Java API for message-oriented middleware. It provides:
- A common interface for different messaging providers
- Support for queues and topics
- Transactional message processing

## Message Formats

### JSON
- Human-readable
- Widely supported
- Good for web applications

### XML
- Highly structured
- Schema validation support
- Verbose but well-supported

### Protocol Buffers (Protobuf)
- Binary format (compact)
- Fast serialization/deserialization
- Language-agnostic

## Summary

Understanding these protocols helps you select the right tool for different messaging scenarios. The TT1 exam tests knowledge of protocol differences, use cases, and trade-offs.`,
    quiz: {
      title: "Message Protocols and Standards - Quiz",
      questions: [
        {
          order: 1,
          text: "What does AMQP stand for?",
          options: JSON.stringify([
            "Automated Message Queue Protocol",
            "Advanced Message Queuing Protocol",
            "Application Message Queue Protocol",
            "Asynchronous Message Queue Protocol",
          ]),
          correctAnswer: 1,
          explanation:
            "AMQP stands for Advanced Message Queuing Protocol — an open standard for message-oriented middleware.",
        },
        {
          order: 2,
          text: "Which protocol is best suited for IoT and mobile applications due to its lightweight nature?",
          options: JSON.stringify(["AMQP", "JMS", "MQTT", "SOAP"]),
          correctAnswer: 2,
          explanation:
            "MQTT is designed to be lightweight with minimal bandwidth usage, making it ideal for IoT devices and mobile applications.",
        },
        {
          order: 3,
          text: "What are the three MQTT QoS levels?",
          options: JSON.stringify([
            "Fast, Medium, Slow",
            "Low, Medium, High",
            "0 (at most once), 1 (at least once), 2 (exactly once)",
            "Bronze, Silver, Gold",
          ]),
          correctAnswer: 2,
          explanation:
            "MQTT defines three Quality of Service levels: 0 (at most once), 1 (at least once), and 2 (exactly once).",
        },
        {
          order: 4,
          text: "Which message format uses binary encoding for compact and fast serialization?",
          options: JSON.stringify([
            "JSON",
            "XML",
            "Protocol Buffers (Protobuf)",
            "YAML",
          ]),
          correctAnswer: 2,
          explanation:
            "Protocol Buffers use a binary format, making them more compact and faster to serialize/deserialize compared to text-based formats like JSON or XML.",
        },
        {
          order: 5,
          text: "JMS is primarily associated with which programming language ecosystem?",
          options: JSON.stringify(["Python", "JavaScript", "Java", "C++"]),
          correctAnswer: 2,
          explanation:
            "JMS (Java Message Service) is a Java API specification for message-oriented middleware, primarily used in the Java ecosystem.",
        },
      ],
    },
  },
  {
    order: 3,
    title: "Message Patterns and Architecture",
    description:
      "Explore enterprise integration patterns and messaging architectures.",
    content: `# Message Patterns and Architecture

Enterprise Integration Patterns (EIP) define solutions for common messaging challenges. This chapter covers the most important patterns tested in TT1.

## Core Messaging Patterns

### 1. Point-to-Point (P2P)
In point-to-point messaging, a message is sent to exactly one consumer.
- **Use case**: Task distribution, work queues
- **Example**: Order processing where each order is handled by exactly one worker

### 2. Publish/Subscribe (Pub/Sub)
A message is broadcast to all interested subscribers.
- **Use case**: Event notifications, real-time updates
- **Example**: Price updates sent to all trading terminals

### 3. Request/Reply
A sender expects a response from the receiver.
- **Use case**: Remote procedure calls over messaging
- **Example**: Query a service and receive a result

### 4. Dead Letter Queue (DLQ)
Messages that cannot be processed are routed to a DLQ for inspection.
- **Use case**: Error handling, debugging
- **Importance**: Critical for production reliability

## Enterprise Integration Patterns (EIP)

### Message Router
Routes messages to different channels based on content or rules.

### Message Transformer
Transforms a message from one format to another.

### Message Filter
Removes unwanted messages from the stream.

### Aggregator
Combines multiple related messages into a single message.

### Splitter
Breaks one message into multiple smaller messages.

### Saga Pattern
Manages distributed transactions across multiple services using a sequence of local transactions, each publishing events to trigger the next.

## Architecture Considerations

### Message Broker vs. Peer-to-Peer
- **Message Broker**: Central intermediary (e.g., RabbitMQ, ActiveMQ)
- **Peer-to-Peer**: Direct communication (e.g., ZeroMQ)

### Event-Driven Architecture (EDA)
Components react to events asynchronously. Benefits:
- Loose coupling
- High scalability
- Better fault isolation

## Summary

Mastering these patterns is essential for the TT1 exam. Understand when to apply each pattern and the trade-offs involved.`,
    quiz: {
      title: "Message Patterns and Architecture - Quiz",
      questions: [
        {
          order: 1,
          text: "In which messaging pattern does each message go to exactly one consumer?",
          options: JSON.stringify([
            "Publish/Subscribe",
            "Point-to-Point",
            "Broadcast",
            "Multicast",
          ]),
          correctAnswer: 1,
          explanation:
            "In Point-to-Point (P2P) messaging, each message is consumed by exactly one consumer, making it suitable for task distribution.",
        },
        {
          order: 2,
          text: "What is the purpose of a Dead Letter Queue (DLQ)?",
          options: JSON.stringify([
            "To store all processed messages",
            "To archive old messages",
            "To hold messages that cannot be successfully processed",
            "To prioritize important messages",
          ]),
          correctAnswer: 2,
          explanation:
            "A Dead Letter Queue holds messages that failed processing after multiple attempts, allowing for inspection, debugging, and potential reprocessing.",
        },
        {
          order: 3,
          text: "Which EIP pattern combines multiple related messages into one?",
          options: JSON.stringify([
            "Splitter",
            "Filter",
            "Router",
            "Aggregator",
          ]),
          correctAnswer: 3,
          explanation:
            "The Aggregator pattern collects and combines multiple related messages into a single composite message.",
        },
        {
          order: 4,
          text: "What pattern manages distributed transactions through a sequence of local transactions?",
          options: JSON.stringify([
            "Two-Phase Commit",
            "Saga Pattern",
            "Circuit Breaker",
            "Bulkhead Pattern",
          ]),
          correctAnswer: 1,
          explanation:
            "The Saga Pattern manages distributed transactions by breaking them into a sequence of local transactions, with each step publishing events to trigger the next.",
        },
        {
          order: 5,
          text: "Which architecture style has components react to events asynchronously?",
          options: JSON.stringify([
            "Monolithic Architecture",
            "Event-Driven Architecture (EDA)",
            "Layered Architecture",
            "Client-Server Architecture",
          ]),
          correctAnswer: 1,
          explanation:
            "Event-Driven Architecture (EDA) is characterized by components that produce, detect, consume, and react to events asynchronously.",
        },
      ],
    },
  },
];
