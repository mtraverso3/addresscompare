import AddressCompare from "@/app/components/AddressCompare";

export const runtime = 'edge';

export default function Home() {
    return (
        <div className="flex h-screen justify-center items-center">
            <AddressCompare/>
            <footer className="absolute bottom-0 right-0 p-4">
                Source code <a href="https://github.com/mtraverso3/addresscompare"
                               className="text-blue-500 hover:text-blue-700"> available here</a>
            </footer>
        </div>
    );
}
