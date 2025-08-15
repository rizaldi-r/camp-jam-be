import {
  PrismaClient,
  UserRole,
  Program,
  MembershipStatus,
  ModuleType,
  CourseStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Sample data for seeding
const students = [
  {
    username: 'student1',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    program: Program.WEBDEV,
    batchYear: 2024,
  },
  {
    username: 'student2',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    program: Program.WEBDEV,
    batchYear: 2024,
  },
  {
    username: 'student3',
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@example.com',
    program: Program.DATA_ANALYST,
    batchYear: 2025,
  },
  {
    username: 'student4',
    firstName: 'David',
    lastName: 'Evans',
    email: 'david.evans@example.com',
    program: Program.MARKETING,
    batchYear: 2025,
  },
];

const instructors = [
  {
    username: 'instructor1',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    program: Program.WEBDEV,
    userTitle: 'Lead Instructor',
  },
  {
    username: 'instructor2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    program: Program.DATA_ANALYST,
    userTitle: 'Data Science Specialist',
  },
  {
    username: 'instructor3',
    firstName: 'Eve',
    lastName: 'Miller',
    email: 'eve.miller@example.com',
    program: Program.MARKETING,
    userTitle: 'Marketing Lead',
  },
];

const admin = {
  username: 'admin1',
  firstName: 'Diana',
  lastName: 'Prince',
  email: 'diana.prince@example.com',
  role: UserRole.ADMIN,
};

const categories = [
  { name: 'Frontend', programs: [Program.WEBDEV] },
  { name: 'Backend', programs: [Program.WEBDEV] },
  { name: 'Data Visualization', programs: [Program.DATA_ANALYST] },
  { name: 'Machine Learning', programs: [Program.DATA_ANALYST] },
  { name: 'Digital Marketing', programs: [Program.MARKETING] },
];

async function clearData() {
  // 1. Clean up existing data
  await prisma.moduleProgress.deleteMany();
  await prisma.submissionFieldValue.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.submissionField.deleteMany();
  await prisma.submissionTemplate.deleteMany();
  await prisma.link.deleteMany();
  await prisma.subdescription.deleteMany();
  await prisma.module.deleteMany();
  await prisma.section.deleteMany();
  await prisma.coursesCategories.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleaned up existing data.');
}

async function insertData() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 2. Create users, students, and instructors
  await prisma.user.create({
    data: {
      ...admin,
      passwordHash: hashedPassword,
    },
  });

  const seededStudents = await Promise.all(
    students.map(async (student) => {
      const user = await prisma.user.create({
        data: {
          username: student.username,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          passwordHash: hashedPassword,
          role: UserRole.STUDENT,
        },
      });
      return prisma.student.create({
        data: {
          userId: user.id,
          program: student.program,
          batchYear: student.batchYear,
          membershipStatus: MembershipStatus.APPROVED,
        },
      });
    }),
  );

  const seededInstructors = await Promise.all(
    instructors.map(async (instructor) => {
      const user = await prisma.user.create({
        data: {
          username: instructor.username,
          firstName: instructor.firstName,
          lastName: instructor.lastName,
          email: instructor.email,
          passwordHash: hashedPassword,
          role: UserRole.INSTRUCTOR,
        },
      });
      return prisma.instructor.create({
        data: {
          userId: user.id,
          program: instructor.program,
          userTitle: instructor.userTitle,
        },
      });
    }),
  );
  console.log(
    `Created ${seededStudents.length} students and ${seededInstructors.length} instructors.`,
  );

  // 3. Create categories
  await prisma.category.createMany({
    data: categories,
  });
  console.log(`Created ${categories.length} categories.`);
  const frontendCategory = await prisma.category.findUnique({
    where: { name: 'Frontend' },
  });
  const backendCategory = await prisma.category.findUnique({
    where: { name: 'Backend' },
  });
  const dataVizCategory = await prisma.category.findUnique({
    where: { name: 'Data Visualization' },
  });
  const mlCategory = await prisma.category.findUnique({
    where: { name: 'Machine Learning' },
  });
  const digitalMarketingCategory = await prisma.category.findUnique({
    where: { name: 'Digital Marketing' },
  });

  if (!frontendCategory)
    throw new Error('Frontend category not found during seeding!');
  if (!backendCategory)
    throw new Error('Backend category not found during seeding!');
  if (!dataVizCategory)
    throw new Error('dataVizCategory not found during seeding!');
  if (!mlCategory) throw new Error('mlCategory not found during seeding!');
  if (!digitalMarketingCategory)
    throw new Error('digitalMarketingCategory not found during seeding!');

  // 4. Create courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Advanced NestJS & Prisma',
      instructorId: seededInstructors[0].id,
      description:
        'A comprehensive course on building robust backend APIs with NestJS and Prisma.',
      allowedPrograms: [Program.WEBDEV],
      allowedBatchYears: [2024],
      isMemberOnly: false,
      categories: {
        create: [
          { categoryId: frontendCategory.id },
          { categoryId: backendCategory.id },
        ],
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Python for Data Analysis',
      instructorId: seededInstructors[1].id,
      description:
        'An introduction to Python programming for data scientists and analysts.',
      allowedPrograms: [Program.DATA_ANALYST],
      allowedBatchYears: [2025],
      isMemberOnly: false,
      categories: {
        create: [
          { categoryId: dataVizCategory.id },
          { categoryId: mlCategory.id },
        ],
      },
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Introduction to Digital Marketing',
      instructorId: seededInstructors[2].id,
      description:
        'Learn the fundamentals of digital marketing strategies and tools.',
      allowedPrograms: [Program.MARKETING],
      allowedBatchYears: [2025],
      isMemberOnly: false,
      categories: {
        create: [{ categoryId: digitalMarketingCategory.id }],
      },
    },
  });
  console.log(
    `Created courses: ${course1.title}, ${course2.title}, and ${course3.title}.`,
  );

  // 5. Create sections for the courses
  const section1 = await prisma.section.create({
    data: { title: 'Module 1: Introduction', courseId: course1.id },
  });
  const section2 = await prisma.section.create({
    data: { title: 'Module 2: Advanced Topics', courseId: course1.id },
  });
  const section3 = await prisma.section.create({
    data: { title: 'Python Fundamentals', courseId: course2.id },
  });
  const section4 = await prisma.section.create({
    data: { title: 'Data Manipulation with Pandas', courseId: course2.id },
  });
  const section5 = await prisma.section.create({
    data: { title: 'Marketing Fundamentals', courseId: course3.id },
  });
  console.log(`Created sections for all courses.`);

  // 6. Create modules for the sections
  const module1_1 = await prisma.module.create({
    data: {
      title: 'Introduction to NestJS',
      moduleType: ModuleType.LECTURE,
      description: 'Overview of NestJS concepts and architecture.',
      sectionId: section1.id,
    },
  });
  const module1_2 = await prisma.module.create({
    data: {
      title: 'Prisma ORM Deep Dive',
      moduleType: ModuleType.LECTURE,
      description:
        'Learn how to use Prisma for database access and migrations.',
      sectionId: section1.id,
    },
  });
  const module1_3 = await prisma.module.create({
    data: {
      title: 'Project Assignment',
      moduleType: ModuleType.ASSIGNMENT,
      description: 'Build a small CRUD application.',
      sectionId: section2.id,
    },
  });
  const module2_1 = await prisma.module.create({
    data: {
      title: 'Variables and Data Types',
      moduleType: ModuleType.LECTURE,
      description: 'Basic Python syntax and data types.',
      sectionId: section3.id,
    },
  });
  const module2_2 = await prisma.module.create({
    data: {
      title: 'Project: Data Cleaning',
      moduleType: ModuleType.ASSIGNMENT,
      description: 'Clean a sample dataset using Pandas.',
      sectionId: section4.id,
    },
  });
  const module3_1 = await prisma.module.create({
    data: {
      title: 'SEO Basics',
      moduleType: ModuleType.LECTURE,
      description: 'An overview of Search Engine Optimization.',
      sectionId: section5.id,
    },
  });
  const module3_2 = await prisma.module.create({
    data: {
      title: 'Social Media Strategy',
      moduleType: ModuleType.LECTURE,
      description: 'Developing a social media presence.',
      sectionId: section5.id,
    },
  });
  console.log(`Created modules for all sections.`);

  // 7. Create a submission template and fields for an assignment module
  const submissionTemplate = await prisma.submissionTemplate.create({
    data: {
      moduleId: module1_3.id,
      submissionTitle: 'Project Assignment Submission',
    },
  });

  const submissionField1 = await prisma.submissionField.create({
    data: {
      isTextfield: false,
      label: 'Project URL',
      submissionTemplateId: submissionTemplate.id,
    },
  });
  const submissionField2 = await prisma.submissionField.create({
    data: {
      isTextfield: true,
      label: 'Summary of Work',
      submissionTemplateId: submissionTemplate.id,
    },
  });
  console.log(
    `Created submission template and fields for assignment: ${module1_3.title}.`,
  );

  // 8. Create enrollments for students
  const enrollment1 = await prisma.enrollment.create({
    data: {
      studentId: seededStudents[0].id,
      instructorId: seededInstructors[0].id,
      courseId: course1.id,
      status: CourseStatus.ENROLLED,
      moduleProgresses: {
        create: [
          { moduleId: module1_1.id, isCompleted: true },
          { moduleId: module1_2.id, isCompleted: false },
          { moduleId: module1_3.id, isCompleted: false },
        ],
      },
    },
  });

  const enrollment2 = await prisma.enrollment.create({
    data: {
      studentId: seededStudents[2].id,
      instructorId: seededInstructors[1].id,
      courseId: course2.id,
      status: CourseStatus.ENROLLED,
      moduleProgresses: {
        create: [
          { moduleId: module2_1.id, isCompleted: false },
          { moduleId: module2_2.id, isCompleted: false },
        ],
      },
    },
  });

  const enrollment3 = await prisma.enrollment.create({
    data: {
      studentId: seededStudents[3].id,
      instructorId: seededInstructors[2].id,
      courseId: course3.id,
      status: CourseStatus.ENROLLED,
      moduleProgresses: {
        create: [
          { moduleId: module3_1.id, isCompleted: false },
          { moduleId: module3_2.id, isCompleted: false },
        ],
      },
    },
  });
  console.log(`Created ${seededStudents.length} enrollments.`);

  // 9. Create a submission with submitted content
  const submission1 = await prisma.submission.create({
    data: {
      studentId: seededStudents[0].id,
      submissionTemplateId: submissionTemplate.id,
      enrollmentId: enrollment1.id,
      moduleId: module1_1.id,
    },
  });

  const submission2 = await prisma.submission.create({
    data: {
      studentId: seededStudents[1].id,
      enrollmentId: enrollment2.id,
      moduleId: module1_1.id,
      submissionTemplateId: submissionTemplate.id,
      isGraded: true,
      isPassed: true,
      scorePercentage: 95.5,
      scoreAchieved: 95.5,
      scoreTotal: 100,
      feedback:
        'Excellent work, Alice! The project is well-designed and functional.',
    },
  });

  await prisma.submissionFieldValue.createMany({
    data: [
      {
        submitted: 'https://github.com/alice/project',
        submissionId: submission1.id,
        submissionFieldId: submissionField1.id,
      },
      {
        submitted: 'This is my first NestJS project.',
        submissionId: submission1.id,
        submissionFieldId: submissionField2.id,
      },
      {
        submissionId: submission2.id,
        submissionFieldId: submissionField1.id,
        submitted: 'https://github.com/alice/my-project',
      },
      {
        submissionId: submission2.id,
        submissionFieldId: submissionField2.id,
        submitted: 'A simple portfolio website built with HTML, CSS, and JS.',
      },
    ],
  });
  console.log(`Created submission for student: ${seededStudents[0].userId}.`);

  console.log('Seeding finished successfully.');
}

async function main() {
  await clearData();
  console.log('Start seeding...');
  await insertData();
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
