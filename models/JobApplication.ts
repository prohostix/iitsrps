import { Schema, Document, model, models } from 'mongoose';

export interface IJobApplication extends Document {
    jobId: string;
    jobTitle: string;
    applicantName: string;
    email: string;
    phone: string;
    resume: string; // URL to uploaded resume
    coverLetter?: string;
    experience: string;
    status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
    createdAt: Date;
    updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>({
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    applicantName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String },
    experience: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'], 
        default: 'pending' 
    },
}, { timestamps: true });

// Create indexes for better performance
JobApplicationSchema.index({ jobId: 1 });
JobApplicationSchema.index({ email: 1 });
JobApplicationSchema.index({ status: 1 });
JobApplicationSchema.index({ createdAt: -1 });

export default models.JobApplication || model<IJobApplication>('JobApplication', JobApplicationSchema);