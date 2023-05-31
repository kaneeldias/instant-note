"use client"

import ClientProvider from "./components/ClientProvider"
import './globals.css'
import { Providers } from "./GlobalRedux/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "@/app/head";
import Image from "next/image";
import Link from "next/link"

const queryClient = new QueryClient()

export default function App({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<RootLayout>
				{children}
			</RootLayout>
		</QueryClientProvider >
	)
}

function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<Head />
			<body>
				<div>
					{/* Header */}
					{/* <Header /> */}

					{/* Notifications */}
					<ClientProvider />
					<div className="flex flex-col items-center w-screen h-screen">
						<div className="bg-slate-600 h-full sm:p-10 sm:pb-5 p-3 items-center w-screen">
							<Providers>
								{children}
							</Providers>
						</div>
						<div className="bg-slate-300 flex-1 flex flex-row p-2 text-xs text-slate-700 w-full items-center justify-center">
							<div className="flex flex-1 items-center justify-center">Made in <Image src={"/lk.png"} alt="Flag of Sri Lanka" width={20} height={20} className="mx-1" /> with ❤️</div>
							<div>
								<Link href={"https://github.com/kaneeldias/instant-note/"} target="_blank">
									<Image src="/github-mark.svg" alt="GitHub repository" width={20} height={20} />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html >
	)
}
