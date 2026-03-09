import { getActiveJobs } from "@/lib/data";
import CareersClient from "./CareersClient";

export default async function CareersPage() {
    const jobs = await getActiveJobs();
    return <CareersClient jobs={jobs} />;
}