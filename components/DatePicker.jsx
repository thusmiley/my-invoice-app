"use client";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { createSvgIcon } from "@mui/material/utils";

const Datepicker = () => {
  const [value, setValue] = useState(dayjs(new Date()));

  const CalendarIcon = createSvgIcon(
    <path
      d="M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.693h13.334V14z"
      fill="#7E88C3"
      fill-rule="nonzero"
      opacity=".5"
    />,
    "CalendarIcon"
  );

  const datePickerTheme = (theme) =>
    createTheme({
      ...theme,
      components: {
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: "#7E88C3",
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
              border: "none",
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
              borderRadius: "0",
              border: "none",
              backgroundColor: "#fff",
            },
          },
        },
        MuiPickersCalendarHeader: {
          styleOverrides: {
            label: {
              color: "#0C0E16",
              fontFamily: '"League Spartan", "sans-serif"',
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "20px",
              letterSpacing: "-0.25px",
              backgroundColor: "#fff",
            },
            switchViewButton: {
              display: "none",
            },
          },
        },
        MuiDayCalendar: {
          styleOverrides: {
            weekDayLabel: {
              color: "#888EB0",
              fontFamily: '"League Spartan", "sans-serif"',
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "-0.25px",
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
          slots={{ openPickerIcon: CalendarIcon }}
          onChange={(newValue) => setValue(newValue)}
          sx={{
            "&:hover .MuiOutlinedInput-root": {
              border: "1px solid #7C5DFA",
            },
            "&:focus .MuiOutlinedInput-root": {
              border: "1px solid #7C5DFA",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7C5DFA",
            },
            "&:hover .MuiSvgIcon-root": {
              color: "##7C5DFA",
            },
            "&.Mui-focused .MuiInputLabel-root": {
              color: "##7C5DFA",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7C5DFA",
            },
            "&.Mui-focused .MuiSvgIcon-root": {
              color: "#7E88C3",
            },
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default Datepicker;
