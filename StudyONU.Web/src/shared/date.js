export class DateHelper {
    static nowDate() {
        let now = new Date();
        now.setHours(0, 0, 0, 0);

        return now;
    }

    static toDate(yyyyMMdd, divider) {
        let parts = yyyyMMdd.split(divider);

        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    static ddmmyyyy(date, divider) {
        var mm = date.getMonth() + 1;
        var dd = date.getDate();

        return [
            (dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            date.getFullYear()
        ].join(divider);
    }
}