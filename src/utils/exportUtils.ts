import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export interface ExportData {
  score: number;
  scoreRange: string;
  interpretation: string;
  idealUserProfile: {
    experienceLevel: string;
    knowledgeBase: string;
    behavior: string;
    expectations: string;
  };
  recommendations: {
    marketing: {
      main: string;
      keyAreas: string[];
      contentGuide: string[];
    };
    onboarding: {
      main: string;
      principles: string[];
    };
    growthTactics: string[];
  };
  similarProducts: Array<{
    name: string;
    category: string;
    website: string;
    twitter: string;
  }>;
}

/**
 * Export the results page as a PDF with light mode styling
 */
export const exportToPdf = async (
  sectionRefs: React.RefObject<HTMLElement>[],
  data: ExportData
): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Add title page
    pdf.setFontSize(24);
    pdf.setTextColor(79, 70, 229); // Indigo color
    pdf.text('Product-User Fit Analysis Report', margin, 40);
    
    pdf.setFontSize(16);
    pdf.setTextColor(99, 102, 241); // Lighter indigo
    pdf.text(`Score Range: ${data.scoreRange}`, margin, 60);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const reportDate = new Date().toLocaleDateString();
    pdf.text(`Generated on: ${reportDate}`, margin, 80);
    
    // Add interpretation
    pdf.setFontSize(14);
    pdf.setTextColor(79, 70, 229);
    pdf.text('Executive Summary', margin, 110);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const interpretationLines = pdf.splitTextToSize(data.interpretation, contentWidth);
    pdf.text(interpretationLines, margin, 125);
    
    let currentY = 125 + (interpretationLines.length * 5) + 20;
    
    // Capture and add each section with light mode styling
    for (let i = 0; i < sectionRefs.length; i++) {
      const ref = sectionRefs[i];
      if (!ref.current) continue;
      
      try {
        // Add new page for each section (except the first one if it fits)
        if (i > 0 || currentY > pageHeight - 100) {
          pdf.addPage();
          currentY = margin;
        }
        
        // Capture with forced light mode styling
        const canvas = await toPng(ref.current, {
          quality: 0.95,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
          style: {
            // Force light mode colors for PDF
            color: '#111827',
            backgroundColor: '#ffffff',
            // Override any dark mode styles
            '--tw-text-opacity': '1',
            '--tw-bg-opacity': '1'
          },
          filter: (node) => {
            // Skip feedback buttons and interactive elements in PDF
            if (node.classList) {
              return !node.classList.contains('no-print');
            }
            return true;
          }
        });
        
        const imgData = canvas;
        const imgWidth = contentWidth;
        const imgHeight = (ref.current.offsetHeight * contentWidth) / ref.current.offsetWidth;
        
        // Check if image fits on current page
        if (currentY + imgHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }
        
        pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 10;
        
      } catch (error) {
        console.warn(`Failed to capture section ${i}:`, error);
      }
    }
    
    // Save the PDF
    const fileName = `product-user-fit-analysis-${data.scoreRange.replace('.', '-')}-${Date.now()}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Export the results data as a CSV
 */
export const exportToCsv = (data: ExportData): void => {
  try {
    const csvRows: string[] = [];
    
    // Add header
    csvRows.push('Product-User Fit Analysis Report');
    csvRows.push(`Generated on: ${new Date().toLocaleDateString()}`);
    csvRows.push('');
    
    // Add score information
    csvRows.push('SCORE INFORMATION');
    csvRows.push(`Score Range,${data.scoreRange}`);
    csvRows.push(`Numeric Score,${data.score}`);
    csvRows.push('');
    
    // Add interpretation
    csvRows.push('INTERPRETATION');
    csvRows.push(`"${data.interpretation.replace(/"/g, '""')}"`);
    csvRows.push('');
    
    // Add ideal user profile
    csvRows.push('IDEAL USER PROFILE');
    csvRows.push(`Experience Level,"${data.idealUserProfile.experienceLevel.replace(/"/g, '""')}"`);
    csvRows.push(`Knowledge Base,"${data.idealUserProfile.knowledgeBase.replace(/"/g, '""')}"`);
    csvRows.push(`Behavior,"${data.idealUserProfile.behavior.replace(/"/g, '""')}"`);
    csvRows.push(`Expectations,"${data.idealUserProfile.expectations.replace(/"/g, '""')}"`);
    csvRows.push('');
    
    // Add marketing recommendations
    csvRows.push('MARKETING STRATEGY');
    csvRows.push(`Main Strategy,"${data.recommendations.marketing.main.replace(/"/g, '""')}"`);
    csvRows.push('');
    csvRows.push('Key Focus Areas');
    data.recommendations.marketing.keyAreas.forEach((area, index) => {
      csvRows.push(`Area ${index + 1},"${area.replace(/"/g, '""')}"`);
    });
    csvRows.push('');
    csvRows.push('Content Strategy');
    data.recommendations.marketing.contentGuide.forEach((guide, index) => {
      csvRows.push(`Strategy ${index + 1},"${guide.replace(/"/g, '""')}"`);
    });
    csvRows.push('');
    
    // Add onboarding recommendations
    csvRows.push('ONBOARDING PRINCIPLES');
    csvRows.push(`Main Principle,"${data.recommendations.onboarding.main.replace(/"/g, '""')}"`);
    csvRows.push('');
    csvRows.push('Core Principles');
    data.recommendations.onboarding.principles.forEach((principle, index) => {
      csvRows.push(`Principle ${index + 1},"${principle.replace(/"/g, '""')}"`);
    });
    csvRows.push('');
    
    // Add growth tactics
    csvRows.push('GROWTH TACTICS');
    data.recommendations.growthTactics.forEach((tactic, index) => {
      csvRows.push(`Tactic ${index + 1},"${tactic.replace(/"/g, '""')}"`);
    });
    
    // Create and download CSV
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `product-user-fit-analysis-${data.scoreRange.replace('.', '-')}-${Date.now()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw new Error('Failed to generate CSV. Please try again.');
  }
};