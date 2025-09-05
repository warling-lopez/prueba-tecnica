import React, { useState } from 'react';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import EditorView from './components/EditorView';
import FillerView from './components/FillerView';
import ShareModal from './components/ShareModal';
import SignatureModal from './components/SignatureModal';
import SuccessNotification from './components/SuccessNotification';

const templatesData = [
  { id: 1, name: 'Contrato de Servicios.pdf', date: '01/08/2025', fields: [], fileUrl: null },
  { id: 2, name: 'Consentimiento Informado.pdf', date: '28/07/2025', fields: [], fileUrl: null },
];

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [templates, setTemplates] = useState(templatesData);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Funciones de manejo de estado
  const editTemplate = (id) => {
    const template = templates.find((t) => t.id === id);
    if (!template) return;
    setCurrentTemplate(template);
    setCurrentView('editor');
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const newTemplate = {
        id: templates.length + 1,
        name: file.name,
        date: new Date().toLocaleDateString('es-ES'),
        fields: [],
        fileUrl: URL.createObjectURL(file),
      };
      setTemplates([newTemplate, ...templates]);
      setCurrentTemplate(newTemplate); // aseguramos que currentTemplate tenga fileUrl
      setCurrentView('editor');        // abrimos editor directamente
      showSuccessMessage();
    }
  };

  const openShareModal = (template) => {
    setCurrentTemplate(template);
    setShareLink(`https://your-app.com/form/${template.id}/${Date.now()}`);
    setShowShareModal(true);
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col h-screen antialiased">
      <Header />
      {currentView === 'dashboard' && (
        <DashboardView
          templates={templates}
          editTemplate={editTemplate}
          openShareModal={openShareModal}
          handlePdfUpload={handlePdfUpload}
        />
      )}
      {currentView === 'editor' && currentTemplate && (
        <EditorView
          currentTemplate={currentTemplate}
          setCurrentView={setCurrentView}
          openShareModal={openShareModal}
        />
      )}
      {currentView === 'filler' && currentTemplate && (
        <FillerView
          currentTemplate={currentTemplate}
          setCurrentView={setCurrentView}
          showSignatureModal={showSignatureModal}
          setShowSignatureModal={setShowSignatureModal}
          showSuccessMessage={showSuccessMessage}
        />
      )}
      {showShareModal && (
        <ShareModal
          shareLink={shareLink}
          setShowShareModal={setShowShareModal}
          previewForm={() => {
            setShowShareModal(false);
            setCurrentView('filler');
          }}
          showSuccessMessage={showSuccessMessage}
        />
      )}
      {showSignatureModal && (
        <SignatureModal
          setShowSignatureModal={setShowSignatureModal}
          showSuccessMessage={showSuccessMessage}
        />
      )}
      {showSuccess && <SuccessNotification />}
    </div>
  );
}

export default App;
