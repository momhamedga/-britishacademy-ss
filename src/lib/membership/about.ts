import { Users, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

interface AcademyDataType {
  headline: string;
  description: string;
  location: string; 
}


export const ACADEMY_DATA:AcademyDataType = {

  headline: "YOUR TRUSTED PROFESSIONAL DEVELOPMENT COURSES PARTNER IN WEMBLEY",
  location: "Wembley",
  description: `Located in Wembley, Integra Training Academy is a leader in professional development courses and skills training. We're dedicated to providing excellent training that helps you advance in your career. Our goal at Integra Training Academy is simple: to equip you with the skills and knowledge you need to succeed in your career. We offer a variety of courses taught by some of the UK’s leading trainers, each with over 15 years of experience. They know how to connect classroom lessons to real-world situations. Get in touch with us for more information.`
  

};


export const VALUES = [
  {
    title: "Expert Trainers",
    desc: "Our team boasts over 15 years of experience. They're instructors and passionate leaders with a proven track record of success.",
    icon: Users
  },
  {
    title: "Industry-Leading Courses",
    desc: "Our curriculum is constantly reviewed and updated to reflect the latest industry standards and best practices.",
    icon: BookOpen
  },
  {
    title: "Real-World Focus",
    desc: "We go beyond theory. Our courses are designed to equip you with practical skills you can apply immediately in your workplace.",
    icon: Briefcase
  },
  {
    title: "Supportive Environment",
    desc: "We foster an interactive space where you feel comfortable asking questions and gaining insights from your peers.",
    icon: GraduationCap
  }
];