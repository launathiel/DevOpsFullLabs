const { memberRepository } = require('../database');
const { healthCheck } = require('../utils');
const logger = require('../utils/logger');

class memberServices {
    constructor() {
        this.repository = new memberRepository();
    }

    async createMember(memberDets, res){
        try{
            const newMember = await this.repository.createMember(memberDets);
            return res.status(201).json({
                message: "Member Created!",
                success: true,
                data: newMember
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                message: "Unable to create member",
                success: false,
                error: err.message
            });
        }
    }
    
    async getAllMember(res){
        try{
            const data = await this.repository.findAllMember();
            return res.status(200).json({
                message: 'Successfully get all member',
                success: "true",
                data
            });
        }catch(err){
            logger.error(err.message)
            return res.status(500).json({
                message: 'Unable to get all member',
                success: "false",
                error: err.message
            });
        }
    }

    async getMemberById(id, res){
        try{
            const member = await this.repository.findMemberById(id);
            if(member.length == 0 ){
                return res.status(404).json({
                    message: 'member not found',
                    success: "false",
                });
            }
            return res.status(200).json({
                message: 'Successfully get member by id',
                success: "true",
                member
            });
        }catch(err){
            logger.error(err.message)
            return res.status(500).json({
                message: 'Unable to get member',
                success: "false"
            });
        }
    }

    async updateMemberById(id, memberDets, res){
        try{
            // check if member exists
            const member = await this.repository.findMemberById(id);
            if(member.length == 0 ){
                return res.status(404).json({
                    message: "member Not Found",
                    success: false
                });
            }
            // update member
            await this.repository.updateMemberById(id, memberDets);
            return res.status(200).json({
                message: "member updated successfully",
                success: true
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                message: "Unable to update member",
                success: false,
                error: err.message
            });
        }
    }
    
    async deleteMemberById(id, res){
        try{
            // check if member exists
            const member = await this.repository.findMemberById(id);
            if(member.length == 0 ){
                return res.status(404).json({
                    message: "member Not Found",
                    success: false
                });
            }
            // delete member
            await this.repository.deleteMemberById(id);
            return res.status(200).json({
                message: "member deleted successfully",
                success: true
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                message: "Unable to delete member",
                success: false,
                error: err.message
            });
        }
    }

    async healthCheck(res){
        try{
            const health = await healthCheck();
            return res.status(200).json({
                health
            });
        }catch(err){
            logger.error(err.message);
            return res.status(500).json({
                error: err.message,
            });
        }
    }
}

module.exports = memberServices;