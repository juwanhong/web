import React, {Component} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

import resumePDF from '../pdf/JuwanHong Resume 2020.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js';




export default class Resume extends Component {
	render() {
		return (
			<div>
				<h1>Resume</h1>
				<Document file={resumePDF}>
					<Page pageNumber={1}></Page>
				</Document>
			</div>
			)
	}
}