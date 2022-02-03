import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { DateData } from 'react-native-calendars';

import theme from '../../styles/theme';

type MarkedDatesType = {
  [date: string]: {
    selected?: boolean;
    disabled?: boolean;
    disableTouchEvent?: boolean;
    textColor?: string;
    selectedColor?: string;
    selectedTextColor?: string;
    startingDay?: boolean;
    endingDay?: boolean;
    color: string;
  };
};

function generateInterval(start: DateData, end: DateData) {
  let interval: MarkedDatesType = {};

  eachDayOfInterval({
    start: parseISO(start.dateString),
    end: parseISO(end.dateString),
  }).forEach(item => {
    const date = format(item, 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
      },
    };
  });

  return interval;
}

export { generateInterval, MarkedDatesType };
