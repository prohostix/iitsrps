import connectDB from './db';
import SiteDataModel from '@/models/SiteData';
import EnquiryModel from '@/models/Enquiry';
import JobModel from '@/models/Job';
import SubsidiaryModel from '@/models/Subsidiary';

// Re-export the interface for use in components
export interface SiteData {
    images: {
        hero: { url: string; alt: string };
        about: { url: string; alt: string };
        directors: {
            dr_abdul_aslam: string;
            dr_basil_thomas: string;
            adv_shoukath_ali: string;
            mr_sumith_vijayan: string;
        };
    };
    branches: {
        id: string;
        name: string;
        address: string;
        phone: string;
        email?: string;
        website?: string;
        type: string;
    }[];
    universities: {
        id: string;
        name: string;
        logo?: string;
    }[];
    gallery: {
        id: string;
        url: string;
        alt: string;
        category?: string;
    }[];
    seo: {
        title: string;
        description: string;
        keywords: string;
        ogImage: string;
    };
    contact: {
        phone: string;
        email: string;
        address: string;
        socials: {
            facebook?: string;
            twitter?: string;
            instagram?: string;
            linkedin?: string;
            instagramAccessToken?: string;
            instagramUserId?: string;
        };
    };
    stats: {
        yearsOfExperience: string;
        studentsCount: string;
        partnersCount: string;
        satisfactionRate: string;
    };
}

export async function getSiteData(): Promise<SiteData> {
    await connectDB();

    const data = await SiteDataModel.findOne().lean();

    if (!data) {
        // Create default data if none exists
        const newData = await SiteDataModel.create({});
        return JSON.parse(JSON.stringify(newData)); // generic serialization
    }

    // Mongoose lean returns _id, we need to map if strict typing is needed, 
    // but for our interface it matches mostly.
    // Ensure arrays exist (for existing documents that might be missing these fields)
    if (!data.gallery) data.gallery = [];
    if (!data.universities) data.universities = [];
    if (!data.branches) data.branches = [];

    return JSON.parse(JSON.stringify(data));
}

export async function updateSiteData(newData: Partial<SiteData>) {
    await connectDB();

    // We assume there's only one document for the site data
    const data = await SiteDataModel.findOneAndUpdate(
        {},
        { $set: newData },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return JSON.parse(JSON.stringify(data));
}

export async function getEnquiries() {
    await connectDB();
    const enquiries = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(enquiries));
}

export async function getJobs() {
    await connectDB();
    const jobs = await JobModel.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(jobs));
}

export async function getActiveJobs() {
    await connectDB();
    const jobs = await JobModel.find({ status: 'active' }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(jobs));
}

export async function getSubsidiaries() {
    await connectDB();
    const subsidiaries = await SubsidiaryModel.find().sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(subsidiaries));
}

export async function getSubsidiaryBySlug(slug: string) {
    await connectDB();
    const subsidiary = await SubsidiaryModel.findOne({ slug }).lean();
    if (!subsidiary) return null;
    return JSON.parse(JSON.stringify(subsidiary));
}
