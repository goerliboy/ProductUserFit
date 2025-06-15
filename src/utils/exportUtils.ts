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
 * Export the results page as a PDF with forced light mode styling
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
    
    // Start content from the top of the page after title
    let currentY = 110;
    
    // Add new page for visual content
    pdf.addPage();
    currentY = margin;
    
    // Capture and add each section
    for (let i = 0; i < sectionRefs.length; i++) {
      const ref = sectionRefs[i];
      if (!ref.current) continue;
      
      try {
        // Temporarily add light mode class to body for clean capture
        const originalBodyClass = document.body.className;
        document.body.className = document.body.className.replace('dark', '');
        
        // Wait a moment for styles to apply
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Capture the section with light mode styling
        const canvas = await toPng(ref.current, {
          quality: 0.95,
          backgroundColor: '#ffffff',
          pixelRatio: 1.5,
          style: {
            backgroundColor: '#ffffff',
            color: '#111827'
          },
          filter: (node) => {
            // Skip feedback buttons and interactive elements in PDF
            if (node.classList) {
              return !node.classList.contains('no-print');
            }
            return true;
          }
        });
        
        // Restore original body class
        document.body.className = originalBodyClass;
        
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
    
    // Add detailed text content on new pages
    pdf.addPage();
    currentY = margin;
    
    // Ideal User Profile
    pdf.setFontSize(16);
    pdf.setTextColor(79, 70, 229);
    pdf.text('Ideal User Profile', margin, currentY);
    currentY += 15;
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    const profileSections = [
      { title: 'Experience Level', content: data.idealUserProfile.experienceLevel },
      { title: 'Knowledge Base', content: data.idealUserProfile.knowledgeBase },
      { title: 'Behavior', content: data.idealUserProfile.behavior },
      { title: 'Expectations', content: data.idealUserProfile.expectations }
    ];
    
    profileSections.forEach(section => {
      pdf.setFontSize(11);
      pdf.setTextColor(79, 70, 229);
      pdf.text(section.title, margin, currentY);
      currentY += 8;
      
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      const lines = pdf.splitTextToSize(section.content, contentWidth);
      pdf.text(lines, margin, currentY);
      currentY += lines.length * 5 + 8;
      
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = margin;
      }
    });
    
    // Marketing Strategy
    if (currentY > pageHeight - 60) {
      pdf.addPage();
      currentY = margin;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(79, 70, 229);
    pdf.text('Marketing Strategy', margin, currentY);
    currentY += 15;
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const marketingLines = pdf.splitTextToSize(data.recommendations.marketing.main, contentWidth);
    pdf.text(marketingLines, margin, currentY);
    currentY += marketingLines.length * 5 + 10;
    
    // Key Focus Areas
    pdf.setFontSize(12);
    pdf.setTextColor(79, 70, 229);
    pdf.text('Key Focus Areas', margin, currentY);
    currentY += 10;
    
    data.recommendations.marketing.keyAreas.forEach((area, index) => {
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      const areaLines = pdf.splitTextToSize(`${index + 1}. ${area}`, contentWidth - 10);
      pdf.text(areaLines, margin + 5, currentY);
      currentY += areaLines.length * 5 + 3;
      
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = margin;
      }
    });
    
    // Content Strategy
    currentY += 5;
    pdf.setFontSize(12);
    pdf.setTextColor(79, 70, 229);
    pdf.text('Content Strategy', margin, currentY);
    currentY += 10;
    
    data.recommendations.marketing.contentGuide.forEach((guide, index) => {
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      const guideLines = pdf.splitTextToSize(`${index + 1}. ${guide}`, contentWidth - 10);
      pdf.text(guideLines, margin + 5, currentY);
      currentY += guideLines.length * 5 + 3;
      
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = margin;
      }
    });
    
    // Onboarding Principles
    if (currentY > pageHeight - 60) {
      pdf.addPage();
      currentY = margin;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(79, 70, 229);
    pdf.text('Onboarding Principles', margin, currentY);
    currentY += 15;
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const onboardingLines = pdf.splitTextToSize(data.recommendations.onboarding.main, contentWidth);
    pdf.text(onboardingLines, margin, currentY);
    currentY += onboardingLines.length * 5 + 10;
    
    data.recommendations.onboarding.principles.forEach((principle, index) => {
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      const principleLines = pdf.splitTextToSize(`${index + 1}. ${principle}`, contentWidth - 10);
      pdf.text(principleLines, margin + 5, currentY);
      currentY += principleLines.length * 5 + 3;
      
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = margin;
      }
    });
    
    // Growth Tactics
    if (currentY > pageHeight - 60) {
      pdf.addPage();
      currentY = margin;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(79, 70, 229);
    pdf.text('Growth Tactics', margin, currentY);
    currentY += 15;
    
    data.recommendations.growthTactics.forEach((tactic, index) => {
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      const tacticLines = pdf.splitTextToSize(`${index + 1}. ${tactic}`, contentWidth - 10);
      pdf.text(tacticLines, margin + 5, currentY);
      currentY += tacticLines.length * 5 + 3;
      
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = margin;
      }
    });
    
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