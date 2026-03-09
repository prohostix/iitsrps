import { Schema, Document, model, models } from 'mongoose';

export interface IEnquiry extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: Date;
    updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true });

const EnquiryModel = models.Enquiry || model<IEnquiry>('Enquiry', EnquirySchema);

export default EnquiryModel;
