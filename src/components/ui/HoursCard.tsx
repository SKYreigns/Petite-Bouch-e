import { Clock } from 'lucide-react';
import { business } from '../../data/site';
import { isToday } from '../../lib/hours';

interface HoursCardProps {
  className?: string;
}

export function HoursCard({ className = '' }: HoursCardProps) {
  return (
    <div className={['card p-5 sm:p-6', className].join(' ')}>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-secondary" aria-hidden="true" />
        <h3 className="label-caps text-secondary">Opening hours</h3>
      </div>

      <table className="mt-4 w-full text-sm">
        <caption className="sr-only">
          Petite Bouchée opening hours by day
        </caption>
        <tbody>
          {business.hours.map((entry) => {
            const today = isToday(entry.day);
            return (
              <tr
                key={entry.day}
                className={today ? 'bg-secondary-container/30' : ''}
              >
                <th
                  scope="row"
                  className={[
                    'py-2 pl-2 pr-3 text-left font-medium',
                    today ? 'text-primary' : 'text-on-surface-variant',
                  ].join(' ')}
                >
                  {entry.day}
                  {today ? (
                    <span className="ml-2 inline-block rounded-sm bg-secondary-container px-1.5 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-on-secondary-container">
                      Today
                    </span>
                  ) : null}
                </th>
                <td
                  className={[
                    'py-2 pr-2 text-right tabular-nums',
                    today
                      ? 'font-semibold text-primary'
                      : 'text-on-surface-variant',
                  ].join(' ')}
                >
                  {entry.open} – {entry.close}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="body-sm mt-4 border-t border-[#efe5d6] pt-4 text-on-surface-variant">
        {business.hoursNote}
      </p>
    </div>
  );
}
