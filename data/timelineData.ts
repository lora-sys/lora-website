export interface TimelineEvent {
  year: string
  title: string
  description: string
  type: 'education' | 'work' | 'achievement'
}

const timelineData: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
    description:
      'Leading development of cloud-native applications using Next.js, React, and Node.js',
    type: 'work',
  },
  {
    year: '2023',
    title: 'AWS Certified Solutions Architect',
    description: 'Achieved AWS Solutions Architect Associate certification',
    type: 'achievement',
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    description:
      'Built scalable web applications with modern JavaScript frameworks and microservices architecture',
    type: 'work',
  },
  {
    year: '2021',
    title: 'Frontend Developer',
    description:
      'Specialized in React and Vue.js development, creating responsive and accessible user interfaces',
    type: 'work',
  },
  {
    year: '2020',
    title: 'Bachelor of Computer Science',
    description: 'Graduated with honors, focused on software engineering and web technologies',
    type: 'education',
  },
]

export default timelineData
