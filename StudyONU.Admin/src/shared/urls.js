const Urls = {
    check: '/api/check',
    token: '/api/token',
    account: {
        password: '/api/account/password',
        info: '/api/account'
    },
    lecturers: '/api/lecturers',
    specialities: '/api/specialities',
    courses: '/api/courses',
    guides: '/api/guides',
    tasks: {
        common: '/api/tasks',
        files: '/api/tasks/files'
    },
    studentQueue: {
        list: '/api/studentQueue',
        courses: (id) => `/api/studentQueue/${id}/courses`,
        approve: '/api/studentQueue/approve',
        disapprove: (id) => `/api/studentQueue/${id}/disapprove`
    },
    lecturerQueue: {
        list: '/api/lecturerQueue',
        approve: id => `/api/lecturerQueue/${id}/approve`,
        disapprove: id => `/api/lecturerQueue/${id}/disapprove`
    },
    reports: {
        sent: '/api/reports/sent',
        onCheck: '/api/reports/oncheck',
        check: (taskId, studentEmail) => `/api/reports/check?taskId=${taskId}&studentEmail=${studentEmail}`,
        accept: (taskId, studentEmail, mark) => `/api/reports/accept?taskId=${taskId}&studentEmail=${studentEmail}&mark=${mark}`,
        reject: (taskId, studentEmail) => `/api/reports/reject?taskId=${taskId}&studentEmail=${studentEmail}`
    },
    comments: {
        create: '/api/comments',
        list: (taskId, studentEmail) => `/api/comments?taskId=${taskId}&studentEmail=${studentEmail}`
    },
    courseProgress: (courseId) => `/api/courseReport/${courseId}`,
    feedbacks: '/api/feedbacks'
}

export default Urls;