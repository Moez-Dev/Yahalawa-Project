'use client'

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent,PopoverTrigger } from "@/components/ui/popover"

const DatePicker = ({ date, setDate, name, disbaled }) => {
  const adjustDateToMidday = (d) => {
    const newDate = new Date(d);
    newDate.setHours(1, 0, 0, 0); 
    return newDate;
  };

  const day = date ? String(adjustDateToMidday(date).getDate()).padStart(2, '0') : '';
  const month = date ? String(adjustDateToMidday(date).getMonth() + 1).padStart(2, '0') : '';
  const year = date ? adjustDateToMidday(date).getFullYear() : '';

  const formattedDate = date ? `${day}/${month}/${year}` : '';

  
  return (
    <div className="relative w-fit">
      {date && <span onClick={() => setDate('')} className="absolute top-2 right-2 px-2 z-20 cursor-pointer">&#10005;</span>}

      <Popover>
        <PopoverTrigger asChild>
          <button
            variant={"outline"}
            className="flex items-center justify-between text-[#9CA3BC] w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none"
          >
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                <path fill="#9CA3BC" d="M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z" />
                <path fill="#cccccc" d="M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5" />
              </svg>

              {date ? <span className="text-black">{formattedDate}</span> : <span>Programmer une date</span>}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={disbaled}
          />
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} value={date && adjustDateToMidday(date)?.toISOString()} />
    </div>
  );
};

export default DatePicker;


