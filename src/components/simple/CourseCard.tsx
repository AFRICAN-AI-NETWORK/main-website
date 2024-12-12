import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="shadow-lg rounded-xl p-5">
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <img
          src={course.imageUrl}
          className="self-start h-52 min-h-0 min-w-0 rounded-xl bg-black bg-opacity-70"
          alt=""
        />
        <div className="w-full flex flex-col justify-center gap-1 lg:text-lg">
          <p>
            <span className="font-bold">Categories:</span>{' '}
            <span className="text-primary">
              {course.categories.map((c) => c.title).join(', ')}
            </span>
          </p>

          {course.instructor && (
            <p>
              <span className="font-bold">Instructor:</span> {course.instructor}
            </p>
          )}

          <p>
            <span className="font-bold">Duration:</span> {course.duration}
          </p>

          <div className="mt-1">
            <div className="max-w-[40ch]">
              <p className="text-primary w-max">{course.title}:</p>
            </div>

            <div className="unreset text-base">
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
          </div>

          <Button asChild className="flex gap-2 self-end ml-auto capitalize">
            <a
              href={course.linkToCourse}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Course <ExternalLinkIcon />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
