import { useState } from 'react'
import { type daysOfWeekType } from '@/lib/days-of-week';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/layout'
import { DayAgenda } from '@/components/layout/schedule/day';
import { Button } from '@/components/ui/button';

type daysOfWeekWithLabel = {
  label: string,
  value: daysOfWeekType
}

const daysOfWeek: daysOfWeekWithLabel[] = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
]

export default function Page() {
  const [selectedDay, setSelectedDay] = useState<daysOfWeekType>('monday')

  return (
    <Layout>
      <div className='w-11/12 max-w-6xl mx-auto flex flex-col items-center md:flex-row md:items-start justify-start gap-4 md:gap-0'>
        <div className='hidden md:flex flex-col items-start justify-center self-start gap-2 w-1/6'>
          {daysOfWeek.map((day) => (
            <Button
              className={`${day.value === selectedDay ? 'font-semibold': 'text-muted-foreground'} hover:bg-transparent`}
              onClick={() => setSelectedDay(day.value)}
              variant="ghost"
              key={day.label}
            >
              {day.label}
            </Button>
          ))}
        </div>

        <Select value={selectedDay} onValueChange={(value) => setSelectedDay(value as daysOfWeekType)}>
          <SelectTrigger className="w-full md:hidden">
            <SelectValue
              placeholder={selectedDay}
            />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((day) => (
              <SelectItem
                key={day.value} value={day.value}>
                {day.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='flex-1 self-stretch'>
          <DayAgenda day={selectedDay} />
        </div>
      </div>
    </Layout>
  )
}
