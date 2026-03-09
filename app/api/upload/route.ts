import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { decrypt } from '@/lib/auth';

// Authentication helper
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    try {
        const sessionCookie = request.cookies.get('session')?.value;
        if (!sessionCookie) return false;
        
        const session = await decrypt(sessionCookie);
        return !!session;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const authenticated = await isAuthenticated(request);
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Unauthorized. Please login to upload files.' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', // Images
            'application/pdf', // PDF
            'application/msword', // DOC
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
        ];
        
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Only image files (JPG, PNG, GIF, WebP) and documents (PDF, DOC, DOCX) are allowed' },
                { status: 400 }
            );
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 5MB limit' },
                { status: 400 }
            );
        }

        // Validate file extension
        const allowedExtensions = [
            '.jpg', '.jpeg', '.png', '.gif', '.webp', // Images
            '.pdf', '.doc', '.docx' // Documents
        ];
        const fileExtension = path.extname(file.name).toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
            return NextResponse.json(
                { error: 'Invalid file extension. Only JPG, PNG, GIF, WebP, PDF, DOC, and DOCX files are allowed' },
                { status: 400 }
            );
        }

        // Create upload directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + fileExtension;
        const filepath = path.join(uploadDir, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Return success response
        const publicUrl = `/uploads/${filename}`;
        return NextResponse.json({
            url: publicUrl,
            filename: filename,
            size: file.size,
            message: 'File uploaded successfully'
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed. Please try again.' },
            { status: 500 }
        );
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}