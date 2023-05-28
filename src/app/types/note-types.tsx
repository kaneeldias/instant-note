export type CreateNoteRequest = {
	id?: string;
	title: string;
	content: string;
}

export type UpdateNoteRequest = {
	title: string;
	content: string;
}

export type ReadNoteRequest = {
	id: string;
}

export type ReadNoteResponse = {
	id: string;
	title: string;
	content: string;
}

export type GetNotesRequest = {
	ids: string;
}

export type GetNotesResponseElement = {
	id: string;
	title: string;
	lastModifiedAt: string
}
