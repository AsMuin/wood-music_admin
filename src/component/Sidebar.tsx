import { assets } from '@/assets/assets';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    const sidebarConfig = [
        {
            name: '添加歌曲',
            icon: assets.add_song,
            path: '/addSong'
        },
        {
            name: '管理歌曲',
            icon: assets.song_icon,
            path: '/listSong'
        },
        {
            name: '添加专辑',
            icon: assets.add_album,
            path: '/addAlbum'
        },
        {
            name: '管理专辑',
            icon: assets.album_icon,
            path: '/listAlbum'
        }
    ];

    return (
        <div className="min-h-screen bg-[#003a10] pl-[4vw]">
            <img className="mt-5 hidden w-[max(10vw,100px)] sm:block" src={assets.logo} alt="" />
            <img className="mr-5 mt-5 block w-[max(5vw,50px)] sm:hidden" src={assets.logo_small} alt="" />
            <div className="mt-10 flex flex-col gap-5">
                {sidebarConfig.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className="flex cursor-pointer items-center gap-2.5 border-black bg-white p-2 pr-[max(8vw,10px)] text-sm font-medium text-gray-800 drop-shadow-[-4px_4px_#00ff5b]">
                        <img className="" src={item.icon} alt="" />
                        <p className="hidden sm:block">{item.name}</p>
                    </NavLink>
                ))}
                {/* <div className="flex items-center gap-2.5 border-black bg-white p-2 pr-[max(8vw,10px)] text-sm font-medium text-gray-800 drop-shadow-[-4px_4px_#00ff5b]">
                    <img className="" src={assets.add_song} alt="" />
                    <p className="hidden sm:block">添加歌曲</p>
                </div> */}
            </div>
        </div>
    );
}

export default Sidebar;
