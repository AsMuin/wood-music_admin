import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';

function App() {
    return (
        <div className="flex min-h-screen items-start">
            <Sidebar />
            <div className="h-screen flex-1 overflow-y-scroll bg-[#f3fff7]">
                <Navbar />
                <div className="pl-5 pt-8 sm:pl-12 sm:pt-12">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
export default App;
