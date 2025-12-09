import React from 'react';
import { Search, ClipboardList, CalendarCheck, ShieldCheck, FileText, Video, CreditCard, HeartPulse } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  { icon: Search, title: 'Search Mentor', description: 'Find your mentor easily with a minimum of effort.' },
  { icon: ClipboardList, title: 'Check Mentor Profile', description: 'Get to know your mentor better.' },
  { icon: CalendarCheck, title: 'Schedule Session', description: 'Choose the time and date that suits you.' },
  { icon: ShieldCheck, title: 'Get Your Solution', description: 'Learn new skills from experienced mentors.' },
  { icon: FileText, title: 'Receive Materials', description: 'Get learning materials or notes instantly.' },
  { icon: Video, title: 'Instant Online Session', description: 'Consult or learn with mentors from anywhere.' },
  { icon: CreditCard, title: 'Easy Payment Options', description: 'Pay securely with various methods.' },
  { icon: HeartPulse, title: 'Be a Mentor', description: 'Share your skills and earn by mentoring others.' }, // ✅ New Step
];

const StepCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
  const bgColors = ['bg-blue-50', 'bg-pink-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50', 'bg-blue-50', 'bg-yellow-50', 'bg-green-50'];
  const textColors = ['text-blue-500', 'text-pink-500', 'text-green-500', 'text-yellow-500', 'text-pink-500', 'text-blue-500', 'text-yellow-500', 'text-green-500'];

  return (
    <Card className={`${bgColors[index % 8]}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${textColors[index % 8]} bg-white shadow-sm`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Steps = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Easy Steps to Get Your Solution</h2>
          <p className="text-muted-foreground mt-4">
            Learn from top mentors or become a mentor yourself and start sharing your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
