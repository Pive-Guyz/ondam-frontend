export function statusToText(code) {
    switch (code) {
        case 0:
        case 'PENDING':
        case 'Pending':
            return 'Pending'
        case 1:
        case 'APPROVED':
        case 'Approved':
            return 'Approved'
        case 2:
        case 'REJECTED':
        case 'Rejected':
            return 'Rejected'
        default:
            return 'Unknown'
    }
}

export function textToStatus(text) {
    switch (text) {
        case 'Pending':
        case 'PENDING':
            return 0
        case 'Approved':
        case 'APPROVED':
            return 1
        case 'Rejected':
        case 'REJECTED':
            return 2
        default:
            return null
    }
}