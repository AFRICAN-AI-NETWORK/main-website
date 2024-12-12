import React from 'react';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="shadow-lg rounded-xl p-5">
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <img
          src={event.imageUrl}
          className="self-start h-52 min-h-0 min-w-0 rounded-xl bg-black bg-opacity-70"
          alt=""
        />
        <div className="w-full flex flex-col justify-center gap-1 lg:text-lg">
          <p>
            <span className="font-bold">Time:</span>{' '}
            <span className="text-primary">
              {format(new Date(event.date), 'HH:mm')}
            </span>
          </p>
          <p>
            <span className="font-bold">Location:</span> {event.location}
          </p>
          <p>
            <span className="font-bold">Date:</span>{' '}
            {new Date(event.date).toDateString()}
          </p>
          <div className="mt-1">
            <div className="max-w-[40ch]">
              <p className="text-primary w-max">{event.title}:</p>
            </div>

            <div className="unreset text-base">
              <ReactMarkdown>{event.description}</ReactMarkdown>
            </div>
          </div>
          <Button
            asChild
            variant="default"
            className="flex gap-2 self-end ml-auto capitalize"
          >
            <a
              href={event.linkToEvent}
              target="_blank"
              rel="noopener noreferrer"
            >
              Attend Event <ExternalLink className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
