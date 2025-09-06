import React from "react";
import { FileText, MoreVertical, Edit, Share2, Upload } from "lucide-react";

const DashboardView = ({
  templates,
  editTemplate,
  openShareModal,
  handlePdfUpload,
}) => {
  return (
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
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => editTemplate(template.id)}
                >
                  {/* Miniatura PDF */}
                  {template.fileUrl ? (
                    <object
                      data={template.fileUrl}
                      type="application/pdf"
                      width="60"
                      height="80"
                      className="rounded border"
                    >
                      <img src="https://dms-shuttle.com/test-pdf-file.pdf" alt="" />
                    </object>
                  ) : (
                    <FileText className="h-6 w-6 text-gray-400" />
                  )}
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
                    onClick={() => openShareModal(template)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
                  >
                    <Share2 className="mr-1 h-4 w-4" />
                    Compartir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DashboardView;
