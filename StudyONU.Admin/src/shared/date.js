export const yyyymmdd = (date, divider) => {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join(divider);
};

export const ddmmyyyy = (date, divider) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    let format = `${dd}${divider}${mm}${divider}${yyyy}`;
    return format;
}

export const toDate = (yyyyMMdd, divider) => {
    let parts = yyyyMMdd.split(divider);

    return new Date(parts[0], parts[1] - 1, parts[2]); 
}