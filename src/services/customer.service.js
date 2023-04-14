import { Company } from "../models/company.model.js"

const FetchCompanyById = async ( companyId ) => Company.findOne({companyId});

const CreateCompany = async ( newRegistration ) => Company.create({...newRegistration});

const FetchByToken = async ( verificationToken ) => Company.findOne({verificationToken});

const UpdateVerificationStatus = async ( companyId ) => {
    Company.findByIdAndUpdate({_id: companyId}, {isVerified : true}, {new: true})
};
const FetchCompanyByEmail = async ( email ) => Company.findOne({email});

export {
    FetchCompanyById,
    CreateCompany,
    FetchByToken,
    UpdateVerificationStatus,
    FetchCompanyByEmail,
    
}