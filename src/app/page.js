import AddressCompare from "@/app/components/AddressCompare";

export const runtime = 'edge';

export default function Home() {
    return (
        <div className="flex h-screen justify-center items-center">
            <AddressCompare/>
        </div>
    );
}
