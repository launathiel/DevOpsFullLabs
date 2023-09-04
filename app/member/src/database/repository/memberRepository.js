const Member = require('../models/member');
const logger = require('../../utils/logger');

class memberRepository {
    async createMember(memberDets) {
        try {
            const newMember = new Member({
                firstName: memberDets.firstName,
                lastName: memberDets.lastName,
                company: memberDets.company,
                age: memberDets.age,
                city: memberDets.city
            });
            await newMember.save();
            return newMember;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async findAllMember() {
        try {
            const member = await Member.find();
            return member;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async findMemberById(id) {
        try {
            const member = await Member.find({ _id : id });
            return member;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async updateMemberById(id, memberDets) {
        try {
            const member = await Member.findByIdAndUpdate(id, memberDets);
            return member;
        } catch (err) {
            logger.error(err.message);
        }
    }

    async deleteMemberById(id) {
        try {
            const member = await Member.deleteOne({ _id : id });
            return member;
        } catch (err) {
            logger.error(err.message);
        }
    }
}

module.exports = memberRepository;