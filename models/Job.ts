import { Schema, Document, model, models } from 'mongoose';

export interface IJob extends Document {
    title: string;
    department?: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    description: string;
    status: 'active' | 'closed';
    createdAt: Date;
    updatedAt: Date;
}

const JobSchema = new Schema<IJob>({
    title: { type: String, required: true },
    department: { type: String },
    location: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
}, { timestamps: true });

const JobModel = models.Job || model<IJob>('Job', JobSchema);

export default JobModel;
