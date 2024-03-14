
export interface DiagnosticFiles {
    diagnosticId: number;
    comment: string;
    files: {
        invoices: any[],
        indications: any[],
        medicReports: any[],
        paymentVouchers: any[],
        otros: any[]
    };
}