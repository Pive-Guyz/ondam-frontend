export default class Counsel {
    constructor({
        id = '',
        createdAt = '',
        nextCreatedAt = '',
        content = '',
        opinion = '',
        weather = '',
        counselType = '',
        time = '',
        deletedAt = '',
        counseleeId = '',
        memberId = '',
    } = {}) {
        this.id = id;
        this.createdAt = createdAt;
        this.nextCreatedAt = nextCreatedAt;
        this.content = content;
        this.opinion = opinion;
        this.weather = weather;
        this.counselType = counselType;
        this.time = time;
        this.deletedAt = deletedAt;
        this.counseleeId = counseleeId;
        this.memberId = memberId;
    }

    validateTime() {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(this.time)) {
            throw new Error('상담 소요 시간 형식이 올바르지 않습니다 (HH:MM)');
        }
    }

    validateDate(date, fieldName) {
        const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        if (date && !dateTimeRegex.test(date)) {
            throw new Error(`${fieldName} 형식이 올바르지 않습니다 (YYYY-MM-DDTHH:mm:ss)`);
        }
    }

    validateRequiredFields() {
        if (!this.content) {
            throw new Error('상담 내용은 필수입니다');
        }
        if (!this.opinion) {
            throw new Error('상담사 소견은 필수입니다');
        }
        if (!this.weather) {
            throw new Error('날씨는 필수입니다');
        }
        if (!this.counselType) {
            throw new Error('상담 유형은 필수입니다');
        }
        if (!this.time) {
            throw new Error('상담 소요 시간은 필수입니다');
        }
        if (!this.counseleeId) {
            throw new Error('내담자 ID는 필수입니다');
        }
        if (!this.memberId) {
            throw new Error('상담사 ID는 필수입니다');
        }
    }

    validateAll() {
        this.validateRequiredFields();
        this.validateTime();
        this.validateDate(this.nextCreatedAt, '다음 상담일');
    }
}
