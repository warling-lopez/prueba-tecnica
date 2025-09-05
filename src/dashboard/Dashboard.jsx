import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  ArrowLeft,
  Share2,
  Save,
  Type,
  Calendar,
  CheckSquare,
  PenTool,
  FileText,
  Edit,
  MoreVertical,
  Move,
  X,
} from "lucide-react";

const FormulariosDigitalesPro = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Contrato de Servicios.pdf",
      date: "01/08/2025",
      fields: [],
    },
    {
      id: 2,
      name: "Consentimiento Informado.pdf",
      date: "28/07/2025",
      fields: [],
    },
  ]);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragState, setDragState] = useState({
    isDragging: false,
    draggedField: null,
    offset: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
  });

  const pdfContainerRef = useRef(null);
  const shareLinkInputRef = useRef(null);
  const signatureCanvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  // Mejorar el sistema de drag & drop
  const handleMouseDown = useCallback((e, field) => {
    e.preventDefault();
    e.stopPropagation();

    if (!pdfContainerRef.current) return;

    const containerRect = pdfContainerRef.current.getBoundingClientRect();
    const fieldElement = e.currentTarget;
    const fieldRect = fieldElement.getBoundingClientRect();

    const offset = {
      x: e.clientX - fieldRect.left,
      y: e.clientY - fieldRect.top,
    };

    const startPos = {
      x: e.clientX - containerRect.left - offset.x,
      y: e.clientY - containerRect.top - offset.y,
    };

    setDragState({
      isDragging: true,
      draggedField: field.id,
      offset,
      startPos,
    });

    // Agregar cursor de arrastre
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragState.isDragging || !pdfContainerRef.current) return;

      e.preventDefault();
      const containerRect = pdfContainerRef.current.getBoundingClientRect();

      let newX = e.clientX - containerRect.left - dragState.offset.x;
      let newY = e.clientY - containerRect.top - dragState.offset.y;

      // Limitar el arrastre dentro del contenedor
      const containerWidth = pdfContainerRef.current.offsetWidth;
      const containerHeight = pdfContainerRef.current.offsetHeight;

      // Obtener dimensiones del campo actual
      const currentField = currentTemplate?.fields.find(
        (f) => f.id === dragState.draggedField
      );
      if (currentField) {
        newX = Math.max(0, Math.min(newX, containerWidth - currentField.width));
        newY = Math.max(
          0,
          Math.min(newY, containerHeight - currentField.height)
        );
      }

      setCurrentTemplate((prev) => ({
        ...prev,
        fields: prev.fields.map((f) =>
          f.id === dragState.draggedField ? { ...f, x: newX, y: newY } : f
        ),
      }));
    },
    [dragState, currentTemplate?.fields]
  );

  const handleMouseUp = useCallback(() => {
    if (dragState.isDragging) {
      setDragState({
        isDragging: false,
        draggedField: null,
        offset: { x: 0, y: 0 },
        startPos: { x: 0, y: 0 },
      });

      // Restaurar cursor
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
  }, [dragState.isDragging]);

  // Event listeners para mouse
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  // Funciones auxiliares
  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const newTemplate = {
        id: templates.length + 1,
        name: file.name,
        date: new Date().toLocaleDateString("es-ES"),
        fields: [],
        fileUrl: URL.createObjectURL(file),
      };
      setTemplates([newTemplate, ...templates]);
      editTemplate(newTemplate);
      showSuccessMessage();
    }
  };

  const editTemplate = (templateOrId) => {
    const template =
      typeof templateOrId === "number"
        ? templates.find((t) => t.id === templateOrId)
        : templateOrId;
    setCurrentTemplate(template);
    setCurrentView("editor");
  };

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      x: 50,
      y: 50,
      width: type === "signature" ? 200 : type === "checkbox" ? 20 : 150,
      height: type === "checkbox" ? 20 : 40,
    };
    setCurrentTemplate((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
  };

  const removeField = (fieldId) => {
    setCurrentTemplate((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== fieldId),
    }));
  };

  const openShareModal = (template) => {
    setCurrentTemplate(template);
    setShareLink(`https://your-app.com/form/${template.id}/${Date.now()}`);
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    if (shareLinkInputRef.current) {
      shareLinkInputRef.current.select();
      navigator.clipboard
        .writeText(shareLink)
        .then(() => {
          showSuccessMessage();
        })
        .catch(() => {
          document.execCommand("copy");
          showSuccessMessage();
        });
    }
  };

  const previewForm = () => {
    setShowShareModal(false);
    setCurrentView("filler");
  };

  const openSignatureModal = () => {
    setShowSignatureModal(true);
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const saveSignature = () => {
    setShowSignatureModal(false);
    showSuccessMessage();
  };

  const submitForm = () => {
    console.log("Formulario enviado con datos:", currentTemplate.fields);
    showSuccessMessage();
    setCurrentView("dashboard");
  };

  // Renderizar diferentes tipos de campos
  const renderFieldContent = (field) => {
    const baseClasses =
      "w-full h-full flex items-center justify-center text-sm";

    switch (field.type) {
      case "text":
        return (
          <textarea
            placeholder="Escribe aquí..."
            className={`${baseClasses} bg-blue-50 border-2 border-blue-200 rounded text-blue-800 px-2 outline-none focus:border-blue-500 transition-colors duration-200`}
          />
        );
      case "date":
        return (
          <input
            type="date"
            className={`${baseClasses} bg-green-50 border-2 border-green-200 rounded text-green-800 px-2 outline-none focus:border-green-500 transition-colors duration-200`}
          />
        );
      case "checkbox":
        return (
          <div
            className={`${baseClasses} bg-purple-50 border-2 border-purple-200 rounded`}
          >
            <input
              type="checkbox"
              className="w-4 h-4 border-2 border-purple-400 focus:ring-purple-500 focus:ring-1"
            />
          </div>
        );
      case "signature":
        return (
          <div
            className={`${baseClasses} bg-yellow-50 border-2 border-yellow-200 rounded text-yellow-800 cursor-pointer`}
            onClick={() => alert("¡Función de firma por implementar!")}
          >
            Firma aquí
          </div>
        );
      default:
        return <div className={baseClasses}>Campo</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50 antialiased">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">
                Formularios Digitales Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, Negocio Pequeño
              </span>
              <img
                className="h-9 w-9 rounded-full"
                src="https://placehold.co/100x100/e2e8f0/475569?text=NP"
                alt="Avatar"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard View */}
      {currentView === "dashboard" && (
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Panel de Control
              </h2>
              <label
                htmlFor="pdf-upload-input"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="mr-2 h-5 w-5" />
                Subir Nuevo PDF
              </label>
              <input
                type="file"
                id="pdf-upload-input"
                className="hidden"
                onChange={handlePdfUpload}
                accept="application/pdf"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <a
                    href="#"
                    className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    aria-current="page"
                  >
                    Mis Plantillas
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Envíos Recibidos
                  </a>
                </nav>
              </div>
              <ul className="divide-y divide-gray-200 mt-4">
                {templates.map((template) => (
                  <li
                    key={template.id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {template.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Subido el {template.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => editTemplate(template.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => openShareModal(template)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                      >
                        <Share2 className="mr-1 h-4 w-4" />
                        Compartir
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      )}

      {/* Editor View */}
      {currentView === "editor" && currentTemplate && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Panel
            </button>
            <div className="text-lg font-semibold text-gray-800">
              {currentTemplate.name}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => openShareModal(currentTemplate)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                <Save className="mr-2 h-4 w-4" />
                Guardar Plantilla
              </button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <aside className="w-64 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Añadir Campos
              </h3>
              <div className="space-y-3">
                <div
                  onClick={() => addField("text")}
                  className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all"
                >
                  <Type className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-700">
                    Campo de Texto
                  </span>
                </div>
                <div
                  onClick={() => addField("date")}
                  className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all"
                >
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-700">Fecha</span>
                </div>
                <div
                  onClick={() => addField("checkbox")}
                  className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all"
                >
                  <CheckSquare className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-700">Checkbox</span>
                </div>
                <div
                  onClick={() => addField("signature")}
                  className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all"
                >
                  <PenTool className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-700">Firma</span>
                </div>
              </div>
            </aside>
            <main className="flex-1 bg-gray-100 p-8 overflow-auto flex justify-center">
              <div
                ref={pdfContainerRef}
                className="relative bg-white rounded-lg shadow-lg"
                style={{ width: "800px", height: "1131px" }}
              >
                {/* Simulación del PDF */}
                <div className="w-full h-full bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 text-lg">
                  Documento PDF
                </div>

                {/* Campos arrastrables */}
                {/* Campos arrastrables */}
                {currentTemplate.fields.map((field) => (
                  <div
                    key={field.id}
                    className={`absolute group transition-all duration-150 ease-out ${
                      dragState.draggedField === field.id
                        ? "z-50 shadow-xl scale-105"
                        : "z-10 hover:shadow-lg"
                    }`}
                    style={{
                      top: `${field.y}px`,
                      left: `${field.x}px`,
                      width: `${field.width}px`,
                      height: `${field.height}px`,
                    }}
                  >
                    {/* Handle de arrastre */}
                    <div
                      className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full p-1 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      onMouseDown={(e) => handleMouseDown(e, field)}
                    >
                      <Move className="h-3 w-3" />
                    </div>

                    {/* Contenido del campo */}
                    {renderFieldContent(field)}

                    {/* Botón de eliminar */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeField(field.id);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Filler View */}
      {currentView === "filler" && currentTemplate && (
        <div className="flex-1 flex flex-col bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Llenar: {currentTemplate.name}
              </h2>
              <button
                onClick={() => setCurrentView("dashboard")}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Cerrar
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center">
            <div
              className="relative bg-white p-4 rounded-lg shadow-lg"
              style={{ width: "800px", height: "1131px" }}
            >
              <div className="w-full h-full bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-400 text-lg">
                Formulario de Ejemplo
              </div>
              {currentTemplate.fields.map((field) => (
                <div
                  key={field.id}
                  className="absolute"
                  style={{
                    top: `${field.y}px`,
                    left: `${field.x}px`,
                    width: `${field.width}px`,
                    height: `${field.height}px`,
                  }}
                >
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder="Escriba aquí..."
                      className="w-full h-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  {field.type === "date" && (
                    <input
                      type="date"
                      className="w-full h-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center h-full">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  )}
                  {field.type === "signature" && (
                    <div
                      onClick={openSignatureModal}
                      className="w-full h-full bg-yellow-100 border border-yellow-400 rounded-md cursor-pointer flex items-center justify-center text-gray-500 text-sm hover:bg-yellow-200"
                    >
                      <PenTool className="mr-2 h-4 w-4" /> Haz clic para firmar
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
          <footer className="bg-white border-t p-4 flex justify-end">
            <button
              onClick={submitForm}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enviar Formulario
            </button>
          </footer>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-30">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Compartir Formulario</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Cualquiera con este enlace podrá llenar y enviar el formulario.
            </p>
            <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
              <input
                type="text"
                readOnly
                value={shareLink}
                ref={shareLinkInputRef}
                className="bg-transparent w-full text-gray-700 focus:outline-none"
              />
              <button
                onClick={copyShareLink}
                className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
              >
                Copiar
              </button>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={previewForm}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Vista Previa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Firme en el recuadro
            </h3>
            <canvas
              ref={signatureCanvasRef}
              className="border border-gray-300 rounded-md w-full h-48 bg-white"
            ></canvas>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={clearSignature}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Limpiar
              </button>
              <button
                onClick={saveSignature}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
              >
                Guardar Firma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md z-50">
          <strong className="font-bold">¡Éxito!</strong>
          <span className="block sm:inline ml-2">
            Acción completada correctamente.
          </span>
        </div>
      )}
    </div>
  );
};

export default FormulariosDigitalesPro;
