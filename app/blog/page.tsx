"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BlogRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/en/blog");
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="animate-pulse text-muted-foreground">Redirecting to blog...</div>
        </div>
    );
}
