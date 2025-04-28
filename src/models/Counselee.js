export default class Counselee {
    constructor({
        id = '',
        name = '',
        birthday = '',
        gender = '',
        phone = '',
        emePhone = '',
        address = '',
        severityLevel = null,
        createdAt = '',
        deletedAt = '',
        updatedAt = '',
        endDate = '',
        endReason = '',
        memberId = '',
    } = {}) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
        this.phone = phone;
        this.emePhone = emePhone;
        this.address = address;
        this.severityLevel = severityLevel;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
        this.updatedAt = updatedAt;
        this.endDate = endDate;
        this.endReason = endReason;
        this.memberId = memberId;
    }

    validateBirthday() {
        const birthdayRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        if (!birthdayRegex.test(this.birthday)) {
            throw new Error('생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD)');
        }
    }

    validatePhoneNumber() {
        const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
        if (this.phone && !phoneRegex.test(this.phone)) {
            throw new Error('전화번호 형식이 올바르지 않습니다 (XXX-XXXX-XXXX)');
        }
        if (this.emePhone && !phoneRegex.test(this.emePhone)) {
            throw new Error('비상 연락처 형식이 올바르지 않습니다 (XXX-XXXX-XXXX)');
        }
    }

    validateGender() {
        if (!(this.gender === 'M' || this.gender === 'F')) {
            throw new Error('성별은 M 또는 F만 가능합니다');
        }
    }

    validateAll() {
        this.validateBirthday();
        this.validatePhoneNumber();
        this.validateGender();
    }
}
