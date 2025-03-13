'use client'
import Link from 'next/link';
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <LoginForm></LoginForm>
      <Button onClick={() => router.push('/dashboard')}>Punta ka na beh</Button>
      <Button onClick={() => router.push('/dashboard/nestedpage')}>Punta ka na beh</Button>
    </div>
  </div>
  );
}
