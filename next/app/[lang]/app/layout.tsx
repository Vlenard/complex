import { redirect } from "next/navigation";
import Auth from "@/lib/Auth";

export default async function AppLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const isAuthenticated = await Auth.isAuthenticated();

    if (!isAuthenticated) {
        const { lang } = await params;
        redirect(`/${lang}/sign-in`);
    }

    return <>{children}</>;
}
