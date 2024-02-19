"use client";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { createSvgIcon } from "@mui/material/utils";
import calendarIcon from "../public/icon-calendar.svg";
import arrowLeft from "../public/icon-arrow-left.svg";
import arrowRight from "../public/icon-arrow-right.svg";
import Image from "next/image";

const Datepicker = () => {
  const [value, setValue] = useState(dayjs(new Date()));

  const CalendarIcon = () => {
    return (
      <Image
        src={calendarIcon}
        alt=""
        width={16}
        height={16}
        className="w-4 h-auto"
      />
    );
  };
  const ArrowLeft = () => {
    return (
      <Image
        src={arrowLeft}
        alt=""
        width={7}
        height={10}
        className="w-[7px] h-auto"
      />
    );
  };
  const ArrowRight = () => {
    return (
      <Image
        src={arrowRight}
        alt=""
        width={7}
        height={10}
        className="w-[7px] h-auto"
      />
    );
  };

  const datePickerTheme = (theme) =>
    createTheme({
      ...theme,
      components: {
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: "#7E88C3",
              marginRight: "5px",
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              color: "#0C0E16",
              fontFamily: '"League Spartan", "sans-serif"',
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "-0.25px",
              paddingLeft: "12px",
            },
          },
        },
        MuiDateCalendar: {
          styleOverrides: {
            root: {
              color: "#0C0E16",
              fontFamily: '"League Spartan", "sans-serif"',
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "-0.25px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              height: "300px",
            },
          },
        },
        MuiPickersDay: {
          styleOverrides: {
            root: {
              color: "#0C0E16",
              backgroundColor: "#fff",
              fontFamily: '"League Spartan", "sans-serif"',
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "-0.25px",
            },
            today: {
              color: "#7C5DFA",
              border: "none",
              borderColor: "white",
            },
            daySelected: {
              color: "#7C5DFA",
              border: "none",
              backgroundColor: "white",
            },
          },
        },
        MuiPickersCalendarHeader: {
          styleOverrides: {
            label: {
              color: "#0C0E16",
              fontFamily: '"League Spartan", "sans-serif"',
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "-0.25px",
              backgroundColor: "#fff",
              marginTop: "5px",
            },
            switchViewButton: {
              color: "#7C5DFA",
            },
          },
        },
        MuiDayCalendar: {
          styleOverrides: {
            weekDayLabel: {
              display: "none",
            },
          },
        },
        MuiMonthCalendar: {
          styleOverrides: {
            root: {
              backgroundColor: "#fff",
            },
          },
        },
        MuiPickersMonth: {
          styleOverrides: {
            monthButton: {
              color: "#0C0E16",
              fontFamily: '"League Spartan", "sans-serif"',
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "-0.25px",
              backgroundColor: "#fff",
            },
          },
        },
      },
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={datePickerTheme}>
        <DatePicker
          format="MMM DD, YYYY"
          value={value}
          slots={{
            openPickerIcon: CalendarIcon,
            leftArrowIcon: ArrowLeft,
            rightArrowIcon: ArrowRight,
          }}
          onChange={(newValue) => setValue(newValue)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#DFE3FA",
              },
              "&:hover fieldset": {
                borderColor: "#7C5DFA",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #7C5DFA",
              },
            },
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default Datepicker;
