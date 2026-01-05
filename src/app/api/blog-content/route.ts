import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        const contentDir = path.join(process.cwd(), 'content', 'blog');
        const filePath = path.join(contentDir, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Simplistic strip of frontmatter for the preview
        const content = fileContent.replace(/^---\n[\s\S]*?\n---/, '');

        return NextResponse.json({ content });
    } catch (error) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
}
