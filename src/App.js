import React, { useState } from "react";

import BpkButton from "@skyscanner/backpack-web/bpk-component-button";

import BpkText from "@skyscanner/backpack-web/bpk-component-text";

import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from "@skyscanner/backpack-web/bpk-component-calendar";

import BpkInput, {
  INPUT_TYPES,
} from "@skyscanner/backpack-web/bpk-component-input";

import format from "date-fns/format";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";

import STYLES from "./App.scss";

const getClassName = cssModules(STYLES);

const formatDateFull = (date) => format(date, "yyyy-MM-dd");
const formatMonth = (date) => format(date, "MMMM yyyy");

const daysOfWeek = [
  {
    name: "Sunday",
    nameAbbr: "Sun",
    index: 0,
    isWeekend: true,
  },
  {
    name: "Monday",
    nameAbbr: "Mon",
    index: 1,
    isWeekend: false,
  },
  {
    name: "Tuesday",
    nameAbbr: "Tue",
    index: 2,
    isWeekend: false,
  },
  {
    name: "Wednesday",
    nameAbbr: "Wed",
    index: 3,
    isWeekend: false,
  },
  {
    name: "Thursday",
    nameAbbr: "Thur",
    index: 4,
    isWeekend: false,
  },
  {
    name: "Friday",
    nameAbbr: "Frid",
    index: 5,
    isWeekend: false,
  },
  {
    name: "Saturday",
    nameAbbr: "Sat",
    index: 6,
    isWeekend: false,
  },
];

const App = () => {
  const [selectionConfiguration, setSelectionConfiguration] = useState({
    type: CALENDAR_SELECTION_TYPE.single,
    date: null,
  });

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDateSelect = (date) => {
    setSelectionConfiguration({
      type: CALENDAR_SELECTION_TYPE.single,
      date: date,
    });
    setIsCalendarVisible(false); // Hide the calendar after selecting a date
  };

  const handleInputClick = () => {
    setIsCalendarVisible(true); // Show the calendar when the input is clicked
  };

  return (
    <div className={getClassName("App")}>
      <header className={getClassName("App__header")}>
        <BpkText
          tagName='h1'
          textStyle='xxl'
          className={getClassName("App__heading")}
        >
          Flight Schedule
        </BpkText>
      </header>

      <main className={getClassName("App__main")}>
        <BpkInput
          id='dateInput'
          type={INPUT_TYPES.DATE}
          name='date'
          value={
            selectionConfiguration.date
              ? format(selectionConfiguration.date, "yyyy-MM-dd")
              : ""
          }
          placeholder='Departure date'
          onClick={handleInputClick}
          readOnly
        />

        {isCalendarVisible && (
          <BpkCalendar
            id='calendar'
            onDateSelect={handleDateSelect}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            daysOfWeek={daysOfWeek}
            weekStartsOn={1}
            changeMonthLabel='Change Month'
            nextMonthLabel='Next Month'
            previousMonthLabel='Previous Month'
            selectionConfiguration={selectionConfiguration}
          />
        )}
      </main>
      <BpkButton onClick={() => alert("Continue")}>Continue</BpkButton>
    </div>
  );
};

export default App;
