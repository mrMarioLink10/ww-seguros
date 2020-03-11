export interface BaseDialog {
	logo: string;
	title: string;
	text: string;
	showButtons: boolean;
	showCancelButton?: boolean;
	textPrincipalButton?: string;
	textCancelButton?: string;
	buttonSize?: string;
}
