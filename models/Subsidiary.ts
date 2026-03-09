import { Schema, Document, model, models } from 'mongoose';

export interface ISubsidiary extends Document {
    name: string;
    slug: string;
    logo: string;
    description: string;
    website?: string;
    order: number;
}

const SubsidiarySchema = new Schema<ISubsidiary>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, default: '' },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const SubsidiaryModel = models.Subsidiary || model<ISubsidiary>('Subsidiary', SubsidiarySchema);

export default SubsidiaryModel;
