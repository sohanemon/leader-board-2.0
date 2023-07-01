import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDaysLeft(targetDate: string) {
  var currentDate = new Date(); // Current date
  var targetDateObj = new Date(targetDate); // Convert target date string to Date object

  // Calculate the time difference in milliseconds
  var timeDiff = targetDateObj.getTime() - currentDate.getTime();

  // Convert the time difference to days
  var daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft - 1;
}
