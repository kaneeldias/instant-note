"use client"

import ClientProvider from "./components/ClientProvider"
import './globals.css'
import { Providers } from "./GlobalRedux/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "@/app/head";

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
					<div className="flex flex-row items-center w-screen h-screen">
						<div className="bg-slate-600 h-full sm:p-10 p-3 items-center w-screen">
							<Providers>
								{children}
							</Providers>
						</div>
					</div>
				</div>
			</body>
		</html >
	)
}
