import MembershipClientWrapper from "@/components/membership/MembershipClientWrapper";

export const metadata = {
  title: 'IAHS Membership | Elite Professional Identity',
  description: 'Join the International Academy for Homeland Security and gain global recognition.',
};

export default function MembershipPage() {
  return (
    <main className="relative min-h-screen">
       <MembershipClientWrapper />
    </main>
  );
}