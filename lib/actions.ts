"use server";

import { login as authLogin, logout as authLogout } from "@/lib/auth";
import { getSiteData, updateSiteData } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import EnquiryModel from "@/models/Enquiry";
import JobModel from "@/models/Job";
import SubsidiaryModel from "@/models/Subsidiary";
import connectDB from "@/lib/db";

// --- GALLERY ACTIONS ---

export async function addGalleryImageAction(formData: FormData) {
    try {
        const url = formData.get('url') as string;
        const alt = formData.get('alt') as string;
        const category = formData.get('category') as string || 'General';

        if (!url || !alt) {
            throw new Error('All fields are required');
        }

        const data = await getSiteData();
        const currentGallery = data.gallery || [];

        const newImage = {
            id: crypto.randomUUID(),
            url,
            alt,
            category
        };

        await updateSiteData({
            gallery: [newImage, ...currentGallery]
        });

        revalidatePath('/');
        revalidatePath('/admin/gallery');
    } catch (error) {
        console.error('Error adding gallery image:', error);
    }
}

export async function removeGalleryImageAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        const data = await getSiteData();
        const currentGallery = data.gallery || [];
        const updatedGallery = currentGallery.filter(img => img.id !== id);

        await updateSiteData({
            gallery: updatedGallery
        });

        revalidatePath('/');
        revalidatePath('/admin/gallery');
    } catch (error) {
        console.error('Error removing gallery image:', error);
    }
}

export async function syncInstagramPhotosAction() {
    try {
        const data = await getSiteData();
        const token = data.contact.socials?.instagramAccessToken;

        if (!token) {
            throw new Error('Instagram Access Token not configured');
        }

        // 1. Fetch media from Instagram
        // Using Instagram Basic Display API
        const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp&access_token=${token}`);

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error?.message || 'Failed to fetch Instagram media');
        }

        const { data: media } = await res.json();

        if (!media || !Array.isArray(media)) {
            throw new Error('No media found in Instagram response');
        }

        // 2. Filter for images and map to our gallery format
        const newImages = media
            .filter((m: any) => m.media_type === 'IMAGE' || m.media_type === 'CAROUSEL_ALBUM')
            .map((m: any) => ({
                id: `ig_${m.id}`,
                url: m.media_url,
                alt: m.caption || 'Instagram Photo',
                category: 'Instagram'
            }));

        // 3. Update gallery (avoiding duplicates)
        const currentGallery = data.gallery || [];
        const currentIds = new Set(currentGallery.map(img => img.id));

        const uniqueNewImages = newImages.filter((img: any) => !currentIds.has(img.id));

        if (uniqueNewImages.length > 0) {
            await updateSiteData({
                gallery: [...uniqueNewImages, ...currentGallery]
            });
            revalidatePath('/');
            revalidatePath('/admin/gallery');
        }

        return { success: true, count: uniqueNewImages.length };
    } catch (error) {
        console.error('Error syncing Instagram photos:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Sync failed' };
    }
}

// --- SITE SETTINGS ACTIONS ---

export async function updateSiteImagesAction(formData: FormData) {
    try {
        const heroUrl = formData.get('heroUrl') as string;
        const aboutUrl = formData.get('aboutUrl') as string;

        const director1 = formData.get('dr_abdul_aslam') as string;
        const director2 = formData.get('dr_basil_thomas') as string;
        const director3 = formData.get('adv_shoukath_ali') as string;
        const director4 = formData.get('mr_sumith_vijayan') as string;

        await updateSiteData({
            images: {
                hero: { url: heroUrl, alt: "IITS Hero Image" },
                about: { url: aboutUrl, alt: "About IITS" },
                directors: {
                    dr_abdul_aslam: director1,
                    dr_basil_thomas: director2,
                    adv_shoukath_ali: director3,
                    mr_sumith_vijayan: director4
                }
            }
        });

        revalidatePath('/');
        revalidatePath('/about');
        revalidatePath('/admin/images');
        redirect('/admin/images?success=1');
    } catch (error) {
        console.error('Error updating site images:', error);
        redirect('/admin/images?error=1');
    }
}

export async function updateSEOAction(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const keywords = formData.get('keywords') as string;
        const ogImage = formData.get('ogImage') as string;

        await updateSiteData({
            seo: { title, description, keywords, ogImage }
        });

        revalidatePath('/');
        revalidatePath('/admin/seo');
        redirect('/admin/seo?success=1');
    } catch (error) {
        console.error('Error updating SEO:', error);
        redirect('/admin/seo?error=1');
    }
}

// --- UNIVERSITY ACTIONS ---

export async function addUniversityAction(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const logo = formData.get('logo') as string;

        if (!name) throw new Error('Name is required');

        const currentData = await getSiteData();
        const newUni = {
            id: Date.now().toString(),
            name,
            logo
        };

        await updateSiteData({
            universities: [...currentData.universities, newUni]
        });

        revalidatePath('/');
        revalidatePath('/admin/universities');
        redirect('/admin/universities');
    } catch (error) {
        console.error('Error adding university:', error);
    }
}

export async function deleteUniversityAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        const currentData = await getSiteData();

        await updateSiteData({
            universities: currentData.universities.filter(u => u.id !== id)
        });

        revalidatePath('/');
        revalidatePath('/admin/universities');
        redirect('/admin/universities');
    } catch (error) {
        console.error('Error deleting university:', error);
    }
}

// --- SUBSIDIARY ACTIONS ---

export async function addSubsidiaryAction(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const logo = formData.get('logo') as string;
        const description = formData.get('description') as string;
        const website = formData.get('website') as string;
        const order = parseInt(formData.get('order') as string || '0');

        if (!name || !logo || !description) {
            throw new Error('Name, logo, and description are required');
        }

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        await connectDB();
        await SubsidiaryModel.create({ name, slug, logo, description, website, order });

        revalidatePath('/subsidiaries');
        revalidatePath('/admin/subsidiaries');
    } catch (error) {
        console.error('Error adding subsidiary:', error);
    }
}

export async function deleteSubsidiaryAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        if (!id) throw new Error('ID is required');

        await connectDB();
        await SubsidiaryModel.findByIdAndDelete(id);

        revalidatePath('/subsidiaries');
        revalidatePath('/admin/subsidiaries');
    } catch (error) {
        console.error('Error deleting subsidiary:', error);
    }
}

// --- ENQUIRY ACTIONS ---

export async function submitEnquiry(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    try {
        await connectDB();
        await EnquiryModel.create({ name, email, subject, message });
        return { success: true };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Failed' };
    }
}

export async function deleteEnquiryAction(formData: FormData) {
    try {
        const id = formData.get('id');
        if (!id) throw new Error('Enquiry ID is required');

        await connectDB();
        const result = await EnquiryModel.findByIdAndDelete(id);
        if (!result) throw new Error('Enquiry not found');

        revalidatePath('/admin/enquiries');
    } catch (error) {
        console.error('Error deleting enquiry:', error);
    }
}

export async function updateEnquiryStatusAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        const status = formData.get('status') as string;

        await connectDB();
        await EnquiryModel.findByIdAndUpdate(id, { status });
        revalidatePath('/admin/enquiries');
    } catch (error) {
        console.error('Error updating enquiry status:', error);
    }
}

export async function updateSettingsAction(formData: FormData) {
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const facebook = formData.get('facebook') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const instagramAccessToken = formData.get('instagramAccessToken') as string;
    const linkedin = formData.get('linkedin') as string;

    // Stats
    const yearsOfExperience = formData.get('yearsOfExperience') as string;
    const studentsCount = formData.get('studentsCount') as string;
    const partnersCount = formData.get('partnersCount') as string;
    const satisfactionRate = formData.get('satisfactionRate') as string;

    await updateSiteData({
        contact: {
            phone,
            email,
            address,
            socials: {
                facebook,
                twitter,
                instagram,
                linkedin,
                instagramAccessToken
            }
        },
        stats: {
            yearsOfExperience,
            studentsCount,
            partnersCount,
            satisfactionRate
        }
    });

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/privacy');
    revalidatePath('/admin/settings');
    redirect('/admin/settings?success=1');
}

export async function addBranchAction(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const address = formData.get('address') as string;
        const phone = formData.get('phone') as string;
        const type = formData.get('type') as string;
        const email = formData.get('email') as string;
        const website = formData.get('website') as string;

        if (!name || !address || !phone) {
            throw new Error('Name, address and phone are required');
        }

        const data = await getSiteData();
        const newBranch = {
            id: crypto.randomUUID(),
            name,
            address,
            phone,
            type: type || 'Regional Office',
            email,
            website
        };

        await updateSiteData({
            branches: [...(data.branches || []), newBranch]
        });

        revalidatePath('/contact');
        revalidatePath('/admin/settings');
    } catch (error) {
        console.error('Error adding branch:', error);
    }
}

export async function deleteBranchAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        const data = await getSiteData();

        await updateSiteData({
            branches: (data.branches || []).filter(b => b.id !== id)
        });

        revalidatePath('/contact');
        revalidatePath('/admin/settings');
    } catch (error) {
        console.error('Error deleting branch:', error);
    }
}

export async function submitPartnershipApplication(formData: FormData) {
    try {
        const orgName = formData.get('orgName');
        const contactPerson = formData.get('contactPerson');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const type = formData.get('type');
        const message = formData.get('message');

        if (!orgName || !contactPerson || !email || !phone || !type || !message) {
            throw new Error('All fields are required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email as string)) {
            throw new Error('Please enter a valid email address');
        }

        await connectDB();

        await EnquiryModel.create({
            name: contactPerson,
            email,
            subject: `Partnership Application - ${type}`,
            message: `Organization: ${orgName}\nContact Person: ${contactPerson}\nPhone: ${phone}\nPartnership Type: ${type}\n\nProposal:\n${message}`
        });

        revalidatePath('/admin/enquiries');
        redirect('/partners?success=true');
    } catch (error) {
        console.error('Error submitting partnership application:', error);
        redirect('/partners?error=true');
    }
}

// --- JOB ACTIONS ---

export async function createJobAction(formData: FormData) {
    try {
        const title = formData.get('title');
        const location = formData.get('location');
        const type = formData.get('type');
        const description = formData.get('description');
        const department = formData.get('department');

        if (!title || !location || !type || !description || !department) {
            throw new Error('All fields are required');
        }

        await connectDB();
        await JobModel.create({ title, location, type, description, department });

        revalidatePath('/admin/jobs');
        revalidatePath('/careers');
    } catch (error) {
        console.error('Error creating job:', error);
    }
}

export async function deleteJobAction(formData: FormData) {
    try {
        const id = formData.get('id');
        if (!id) throw new Error('Job ID is required');

        await connectDB();
        const result = await JobModel.findByIdAndDelete(id);
        if (!result) throw new Error('Job not found');

        revalidatePath('/admin/jobs');
        revalidatePath('/careers');
    } catch (error) {
        console.error('Error deleting job:', error);
    }
}

export async function updateJobStatusAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        const status = formData.get('status') as string;

        await connectDB();
        await JobModel.findByIdAndUpdate(id, { status });

        revalidatePath('/admin/jobs');
        revalidatePath('/careers');
    } catch (error) {
        console.error('Error updating job status:', error);
    }
}

// --- JOB APPLICATION ACTIONS ---

export async function submitJobApplication(formData: FormData) {
    try {
        const jobId = formData.get('jobId') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const applicantName = formData.get('applicantName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const resume = formData.get('resume') as string;
        const coverLetter = formData.get('coverLetter') as string;
        const experience = formData.get('experience') as string;

        if (!jobId || !jobTitle || !applicantName || !email || !phone || !resume || !experience) {
            throw new Error('All required fields must be filled');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        await connectDB();
        const JobApplicationModel = (await import('@/models/JobApplication')).default;

        await JobApplicationModel.create({
            jobId, jobTitle, applicantName, email, phone, resume, coverLetter, experience
        });

        revalidatePath('/admin/applications');
        redirect('/careers?success=application');
    } catch (error) {
        console.error('Error submitting job application:', error);
        redirect('/careers?error=application');
    }
}

export async function updateApplicationStatusAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        const status = formData.get('status') as string;

        await connectDB();
        const JobApplicationModel = (await import('@/models/JobApplication')).default;
        await JobApplicationModel.findByIdAndUpdate(id, { status });
        revalidatePath('/admin/applications');
    } catch (error) {
        console.error('Error updating application status:', error);
    }
}

export async function deleteApplicationAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;

        await connectDB();
        const JobApplicationModel = (await import('@/models/JobApplication')).default;
        await JobApplicationModel.findByIdAndDelete(id);
        revalidatePath('/admin/applications');
    } catch (error) {
        console.error('Error deleting application:', error);
    }
}

// --- AUTH ACTIONS ---

export async function logoutAction() {
    await authLogout();
    redirect("/admin/login");
}

export async function loginAction(formData: FormData) {
    const success = await authLogin(formData);
    if (success) {
        redirect('/admin/dashboard');
    } else {
        redirect('/admin/login?error=1');
    }
}