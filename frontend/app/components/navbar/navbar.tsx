import Link from "next/link"

export default function Navbar() {
    return (
        <div>
            {/* <!-- Main navigation container --> */}
            <nav
                className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg 
                hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
                data-te-navbar-ref>
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <div>
                        <a
                            className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 
                            lg:mb-0 lg:mt-0"
                            href="#">
                        </a>
                    </div>

                    {/* <!-- Hamburger button for mobile view --> */}
                    <button
                        className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none 
                        focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-te-collapse-init
                        data-te-target="#navbarSupportedContent4"
                        aria-controls="navbarSupportedContent4"
                        aria-expanded="false"
                        aria-label="Toggle navigation">

                        {/* <!-- Hamburger icon --> */}
                        <span className="[&>svg]:w-7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-7 w-7">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 
                                    01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 
                                    1.5H3.75a.75.75 0 01-.75-.75z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    {/* <!-- Collapsible navbar container --> */}
                    <div
                        className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
                        id="navbarSupportedContent4"
                        data-te-collapse-item>

                        {/* <!-- Left links --> */}
                        <ul
                            className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
                            data-te-navbar-nav-ref>

                            {/* <!-- Home link --> */}
                            <li
                                className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                                data-te-nav-item-ref>
                                <a
                                    className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 
                                    disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-400 
                                    dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                    aria-current="page"
                                    href="/"
                                    data-te-nav-link-ref>Home</a>
                            </li>

                            {/* <!-- Formulários link --> */}
                            <li
                                className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                                data-te-nav-item-ref>
                                <a
                                    className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 
                                    disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-400 
                                    dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                    aria-current="page"
                                    href="/formularios"
                                    data-te-nav-link-ref>Formulários</a>
                            </li>
                        </ul>

                        <div className="flex items-center">

                            {/* <!-- Right links --> */}
                            <button
                                type="button"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                className="mr-3 inline-block rounded px-3 py-2.5 text-xs font-medium uppercase leading-normal 
                                text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg 
                                focus:outline-none focus:ring-0 active:shadow-lg motion-reduce:transition-none">
                                <a
                                    className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 
                                    disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-400 
                                    dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                    aria-current="page"
                                    href="#"
                                    data-te-nav-link-ref>Usuário</a>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <li><button><Link href="/login">login</Link></button></li>
            <li><button><Link href="/formularios">formulários</Link></button></li>
            <li><button><Link href="/graficos">gráficos</Link></button></li>
        </div>
    )
}