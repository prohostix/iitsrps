import { getSiteData } from '@/lib/data';
import { updateSiteImagesAction } from '@/lib/actions';
import Image from 'next/image';
import ImageInput from '../components/ImageInput';

export default async function ImagesPage() {
    const data = await getSiteData();

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Images</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <form action={updateSiteImagesAction} className="space-y-8">

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Hero Section Image</h2>
                        <ImageInput
                            name="heroUrl"
                            label="Hero Image"
                            defaultValue={data.images.hero.url}
                            required
                            description="Main banner image for the homepage (1920x1080px recommended)"
                        />
                        {/* Current Preview */}
                        <div className="h-48 w-full bg-slate-100 rounded-lg overflow-hidden relative">
                            <Image
                                src={data.images.hero.url}
                                alt="Current hero image"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">About Page Image</h2>
                        <ImageInput
                            name="aboutUrl"
                            label="About Image"
                            defaultValue={data.images.about.url}
                            required
                            description="Image for the about page (1200x800px recommended)"
                        />
                        {/* Current Preview */}
                        <div className="h-48 w-full bg-slate-100 rounded-lg overflow-hidden relative">
                            <Image
                                src={data.images.about.url}
                                alt="Current about image"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Leadership Team Images</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <ImageInput
                                name="dr_abdul_aslam"
                                label="Dr. Abdul Aslam"
                                defaultValue={data.images.directors?.dr_abdul_aslam}
                                description="Professional headshot (400x400px recommended)"
                            />
                            <ImageInput
                                name="dr_basil_thomas"
                                label="Dr. Basil Thomas"
                                defaultValue={data.images.directors?.dr_basil_thomas}
                                description="Professional headshot (400x400px recommended)"
                            />
                            <ImageInput
                                name="adv_shoukath_ali"
                                label="Adv. Shoukath Ali Pootheri"
                                defaultValue={data.images.directors?.adv_shoukath_ali}
                                description="Professional headshot (400x400px recommended)"
                            />
                            <ImageInput
                                name="mr_sumith_vijayan"
                                label="Mr. Sumith Vijayan"
                                defaultValue={data.images.directors?.mr_sumith_vijayan}
                                description="Professional headshot (400x400px recommended)"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
