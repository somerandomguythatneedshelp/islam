export const timetable = [
    {date: "28/02/2025", sehri: "05:11", iftar: "17:42"},
    {date: "01/03/2025", sehri: "05:09", iftar: "17:44"},
    {date: "02/03/2025", sehri: "05:07", iftar: "17:46"}, // ramadan should start here
    {date: "03/03/2025", sehri: "05:05", iftar: "17:48"},
    {date: "04/03/2025", sehri: "05:02", iftar: "17:50"},
    {date: "05/03/2025", sehri: "05:00", iftar: "17:52"},
    {date: "06/03/2025", sehri: "04:57", iftar: "17:54"},
    {date: "07/03/2025", sehri: "04:55", iftar: "17:56"},
    {date: "08/03/2025", sehri: "04:53", iftar: "17:57"},
    {date: "09/03/2025", sehri: "04:50", iftar: "17:59"},
    {date: "10/03/2025", sehri: "04:48", iftar: "18:01"},
    {date: "11/03/2025", sehri: "04:46", iftar: "18:03"},
    {date: "12/03/2025", sehri: "04:43", iftar: "18:05"},
    {date: "13/03/2025", sehri: "04:41", iftar: "18:07"},
    {date: "14/03/2025", sehri: "04:38", iftar: "18:09"},
    {date: "15/03/2025", sehri: "04:36", iftar: "18:11"},
    {date: "16/03/2025", sehri: "04:33", iftar: "18:13"},
    {date: "17/03/2025", sehri: "04:31", iftar: "18:14"},
    {date: "18/03/2025", sehri: "04:28", iftar: "18:16"},
    {date: "19/03/2025", sehri: "04:26", iftar: "18:18"},
    {date: "20/03/2025", sehri: "04:24", iftar: "18:20"},
    {date: "21/03/2025", sehri: "04:21", iftar: "18:22"},
    {date: "22/03/2025", sehri: "04:19", iftar: "18:24"},
    {date: "23/03/2025", sehri: "04:16", iftar: "18:26"},
    {date: "24/03/2025", sehri: "04:14", iftar: "18:27"},
    {date: "25/03/2025", sehri: "04:11", iftar: "18:29"},
    {date: "26/03/2025", sehri: "04:09", iftar: "18:31"},
    {date: "27/03/2025", sehri: "04:06", iftar: "18:33"},
    {date: "28/03/2025", sehri: "04:04", iftar: "18:35"},
    {date: "29/03/2025", sehri: "04:02", iftar: "18:37"},
    {date: "30/03/2025", sehri: "03:59", iftar: "18:39"},
    {date: "31/03/2025", sehri: "04:57", iftar: "19:40"} // just in case
];

export const getCurrentSehriIftarTiming = (
    timetable: { date: string; sehri: string; iftar: string }[],
    currentDateTime: Date
) => {
    const currentDate = currentDateTime;

    // Convert timetable dates to Date objects and sort them in chronological order
    const sortedTimetable = timetable
        .map((entry) => ({
            ...entry,
            dateObject: parseDate(entry.date),
        }))
        .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());

    // Find today's entry
    const todayEntry = sortedTimetable.find((entry) =>
        isSameDate(entry.dateObject, currentDate)
    );

    // If today's date is found, calculate Sehri and Iftar timings
    if (todayEntry) {
        const currentMinutes = convertTimeToMinutes(
            `${currentDateTime.getHours()}:${currentDateTime.getMinutes()}`
        );
        const todayIftarMinutes = convertTimeToMinutes(todayEntry.iftar);

        // Find the next day's entry
        const todayIndex = sortedTimetable.findIndex((entry) =>
            isSameDate(entry.dateObject, currentDate)
        );
        const nextDayEntry = sortedTimetable[todayIndex + 1];

        // If the current time is past today's Iftar, transition to the next day
        if (currentMinutes > todayIftarMinutes && nextDayEntry) {
            return {
                date: formatDate(nextDayEntry.dateObject),
                sehri: nextDayEntry.sehri,
                iftar: nextDayEntry.iftar,
            };
        }

        // Otherwise, return today's Sehri and Iftar timings
        return {
            date: formatDate(todayEntry.dateObject),
            sehri: todayEntry.sehri,
            iftar: todayEntry.iftar,
        };
    }

    // If today's date is not in the timetable
    // Find the most recent past date
    const mostRecentEntry = sortedTimetable
        .filter((entry) => entry.dateObject.getTime() < currentDate.getTime())
        .pop();

    // Find the next available future date
    const nextAvailableEntry = sortedTimetable.find(
        (entry) => entry.dateObject.getTime() > currentDate.getTime()
    );

    // If all dates have passed, continue showing the most recent entry
    if (!nextAvailableEntry && mostRecentEntry) {
        return {
            date: formatDate(mostRecentEntry.dateObject),
            sehri: mostRecentEntry.sehri,
            iftar: mostRecentEntry.iftar,
        };
    }

    // If there are future dates, show the next available entry
    if (nextAvailableEntry) {
        return {
            date: formatDate(nextAvailableEntry.dateObject),
            sehri: nextAvailableEntry.sehri,
            iftar: nextAvailableEntry.iftar,
        };
    }

    // If no past or future dates exist, fallback to N/A (this should rarely happen)
    return {
        date: "N/A",
        sehri: "N/A",
        iftar: "N/A",
    };
};

// Helper function to parse a date string (DD/MM/YYYY) into a Date object
const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
};

// Helper function to check if two dates are the same (ignoring time)
const isSameDate = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

// Helper function to format a Date object as "DD/MM/YYYY"
const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString("default", {month: "long"}); // Get full month name
    const suffix = getDaySuffix(day); // Get the suffix for the day (e.g., "st", "nd", "rd", "th")
    return `${month} ${day}${suffix}`;
};

// Helper function to determine the suffix for a day (e.g., "st", "nd", "rd", "th")
const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return "th"; // Special case for 11, 12, 13
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

// Helper function to convert time (HH:mm) to minutes
const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};