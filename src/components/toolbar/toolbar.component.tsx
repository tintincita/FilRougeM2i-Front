import { AddButton } from "../buttons/addButton.component";
import { DeleteButton } from "../buttons/deleteButton.component";
import { DisplayHideContentButton } from "../buttons/display-hideContentButton.component";
import { EditButton } from "../buttons/editButton.component";
import "./toolbar.css";
import JsPDF from 'jspdf';

interface ToolBarProps {
  className: string;
  id: string;
}
const generatePDF = () => {
  const docToPDF= document.querySelector('.document_editor') as HTMLElement;
  const report = new JsPDF('portrait','pt','a4' );
  report.html(docToPDF).then(() => {
     
      report.save('report.pdf');
  });}


export const ToolBar: React.FC<ToolBarProps> = ({ className, id }) => {
  return (
    <div className={"toolbar_" + className}>
      <AddButton id={id} />
      <DeleteButton />
      <EditButton />
      <DisplayHideContentButton/>
      <button onClick={generatePDF} type="button">Export PDF</button>
    </div>
  );
};
