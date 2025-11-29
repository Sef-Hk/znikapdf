import type { GlobalConfig } from 'payload'

export const PDFmanager: GlobalConfig = {
  slug: 'pdfmanager',
  label: 'PDF Manager',
  admin: {
    group: 'Site Manager',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload the Logo',
      admin: {
        description: 'Upload the logo that will be displayed on the page.',
      },
    },
    {
      name: 'displayPDF',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF for Display',
      admin: {
        description: 'Upload the PDF that will be shown on the page.',
      },
    },
    {
      name: 'submittedPDF',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF for User Submission',
      admin: {
        description:
          'Upload the PDF that will be sent or used after a user submits the brochure form.',
      },
    },
  ],
}
