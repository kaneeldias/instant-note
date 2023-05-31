"use client"

import NoteListPanel from "@/components/layout/NoteListPanel";
import Head from "./head";
import './globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./GlobalRedux/provider";
import Link from "next/link";
import Image from "next/image";

const queryClient = new QueryClient();

export default function NotesLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<html lang="en">
			<Head />
			<body>
				<QueryClientProvider client={queryClient}>
					<Providers>
						<div className="flex flex-col h-screen w-screen">
							<div className="flex sm:flex-row flex-col justify-center p-3 sm:p-5 h-[calc(100vh-50px)]">
								<NoteListPanel></NoteListPanel>
								<div className="flex min-h-[300px] justify-center flex-1 max-w-[1000px] sm:mt-5 rounded-lg">
									{children}
								</div>
							</div >
							<div className="bg-slate-300 flex flex-row p-2 text-xs text-slate-700 w-full items-center justify-center h-[50px]">
								<div className="flex flex-1 items-center justify-center">Made in <Image src={"/lk.png"} alt="Flag of Sri Lanka" width={20} height={20} className="mx-1" /> with ❤️</div>
								<div>
									<Link href={"https://github.com/kaneeldias/instant-note/"} target="_blank">
										<Image src="/github-mark.svg" alt="GitHub repository" width={20} height={20} />
									</Link>
								</div>
							</div>
						</div>
					</Providers>
				</QueryClientProvider>
			</body>
		</html>
	)
}
