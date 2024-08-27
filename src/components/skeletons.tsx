export function FormSkeleton() {
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
            <div className="flex flex-col space-y-4">
                <div className="h-10 w-full bg-gray-200 rounded-md" />
                <div className="h-10 w-full bg-gray-200 rounded-md" />
                <div className="h-10 w-full bg-gray-200 rounded-md" />
                <div className="h-10 w-full bg-gray-200 rounded-md" />
                <div className="h-10 w-full bg-gray-200 rounded-md" />
            </div>
            <div className="flex justify-end mt-4">
                <div className="h-10 w-20 bg-gray-200 rounded-md" />
            </div>
        </div>
    );
}