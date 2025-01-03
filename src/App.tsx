import { Suspense, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import MessageManager from './component/MessageManager';
import Login from './component/Login';

function App() {
    const [loginVisible, setLoginVisible] = useState(() => {
        if (localStorage.getItem('token')) {
            return false;
        } else {
            return true;
        }
    });
    return (
        <>
            <MessageManager />
            <div className="flex min-h-screen items-start">
                <Sidebar loginVisible={loginVisible} setLoginVisible={setLoginVisible} />
                <div className="h-screen flex-1 overflow-y-scroll bg-[#f3fff7]">
                    <Navbar />
                    <div className="px-5 pt-8 sm:pl-12 sm:pt-12">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
                <Login visible={loginVisible} setVisible={setLoginVisible} />
            </div>
        </>
    );
}
export default App;
