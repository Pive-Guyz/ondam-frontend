export function formatPhoneNumber(input) {
    const onlyNums = input.replace(/\D/g, '').slice(0, 11); // 숫자만 최대 11자리까지만
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
}


export function formatBirthday(input) {
    const onlyNums = input.replace(/\D/g, '').slice(0, 8); // 숫자만 최대 8자리까지만
    if (onlyNums.length <= 4) return onlyNums;
    if (onlyNums.length <= 6)
        return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`;
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}-${onlyNums.slice(6, 8)}`;
}

