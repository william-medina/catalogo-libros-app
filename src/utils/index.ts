
export function formatYear(year : number | null) : string {
    if (year === null) {
        return "N/A"; 
    }
    if (year < 0) {
        return `${Math.abs(year)} a.C.`;
    }
    return year.toString();
}