import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { DataTable } from '../shared';
import { FileUpload } from '../inputsComponentes';

interface Documento {
    id: string;
    nombre: string;
    tipo: string;
    fechaSubida: string;
    estado: 'pendiente' | 'aprobado' | 'rechazado';
    archivo?: File;
}

interface ContratosDocumentosProps {
    documentos?: Documento[];
    onChange: (documentos: Documento[]) => void;
}

const ContratosDocumentos: React.FC<ContratosDocumentosProps> = ({ documentos = [], onChange }) => {
    const { currentTheme } = useTheme();

    const [documentosData, setDocumentosData] = useState<Documento[]>(documentos);

    const handleFileUpload = (file: File | null, tipo: string) => {
        if (file) {
            const nuevoDocumento: Documento = {
                id: Date.now().toString(),
                nombre: file.name,
                tipo,
                fechaSubida: new Date().toISOString(),
                estado: 'pendiente',
                archivo: file
            };

            const nuevosDocumentos = [...documentosData, nuevoDocumento];
            setDocumentosData(nuevosDocumentos);
            onChange(nuevosDocumentos);
        }
    };

    const headers = ['Nombre', 'Tipo', 'Fecha', 'Estado'];

    const renderRow = (documento: Documento) => [
        documento.nombre,
        documento.tipo,
        new Date(documento.fechaSubida).toLocaleDateString('es-ES'),
        <span
            key={documento.id}
            className={`px-2 py-1 rounded-full text-xs font-medium ${documento.estado === 'aprobado'
                    ? 'bg-green-100 text-green-800'
                    : documento.estado === 'rechazado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                }`}
        >
            {documento.estado === 'aprobado' ? 'Aprobado' :
                documento.estado === 'rechazado' ? 'Rechazado' : 'Pendiente'}
        </span>
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
                    Contratos y Documentos
                </h3>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                    Gestiona los contratos y documentos del empleado
                </p>
            </div>

            {/* Sección de subida de archivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload
                    onFileChange={(file: File | null) => handleFileUpload(file, 'Contrato')}
                    accept=".pdf,.doc,.docx"
                    label="Subir Contrato"
                    description="Formato: PDF, DOC, DOCX. Máx. 10MB"
                    maxSize={10}
                />

                <FileUpload
                    onFileChange={(file: File | null) => handleFileUpload(file, 'Documento de Identidad')}
                    accept=".pdf,.jpg,.jpeg,.png"
                    label="Documento de Identidad"
                    description="Formato: PDF, JPG, PNG. Máx. 5MB"
                    maxSize={5}
                />
            </div>

            {/* Tabla de documentos */}
            <div className="mt-8">
                <h4 className="text-md font-medium mb-4" style={{ color: currentTheme.colors.text }}>
                    Documentos Subidos
                </h4>
                <DataTable
                    headers={headers}
                    data={documentosData}
                    keyExtractor={(item) => item.id}
                    renderRow={renderRow}
                    emptyMessage="No hay documentos subidos"
                />
            </div>
        </div>
    );
};

export default ContratosDocumentos;
