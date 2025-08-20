
import React, { useState } from 'react';
import { Header } from '../components';
import { useTheme } from '../hooks';
import ContenedorInventario from '../components/inventario/ContenedorInventario';
import IngredientesModal from '../components/inventario/inventarioModal/IngredientesModal';

const Ingredientes: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = [
    'Ingrediente',
    'Stock',
    'Costo Unitario',
    'Impuesto',
    'Acciones'
  ];

  const inventarioData = [
    { ingrediente: 'Tomate Pera', stock: '4 kg', stockValue: 4, warning: 10, alert: 5, unit: 'kg', costoUnitario: '€1.80', impuesto: 'IVA Reducido' },
    { ingrediente: 'Lechuga Romana', stock: '12 unidades', stockValue: 12, warning: 20, alert: 10, unit: 'unidades', costoUnitario: '€1.20', impuesto: 'IVA Reducido' },
    { ingrediente: 'Cebolla Morada', stock: '7 kg', stockValue: 7, warning: 15, alert: 5, unit: 'kg', costoUnitario: '€1.10', impuesto: 'IVA Reducido' },
    { ingrediente: 'Patata Agria', stock: '50 kg', stockValue: 50, warning: 20, alert: 10, unit: 'kg', costoUnitario: '€0.90', impuesto: 'IVA Reducido' },
    { ingrediente: 'Pimiento Rojo', stock: '10 kg', stockValue: 10, warning: 15, alert: 5, unit: 'kg', costoUnitario: '€2.50', impuesto: 'IVA Reducido' },
    { ingrediente: 'Ajo', stock: '5 kg', stockValue: 5, warning: 10, alert: 3, unit: 'kg', costoUnitario: '€4.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Calabacín', stock: '12 kg', stockValue: 12, warning: 20, alert: 8, unit: 'kg', costoUnitario: '€1.30', impuesto: 'IVA Reducido' },
    { ingrediente: 'Berenjena', stock: '10 kg', stockValue: 10, warning: 15, alert: 8, unit: 'kg', costoUnitario: '€1.50', impuesto: 'IVA Reducido' },
    { ingrediente: 'Solomillo de Ternera', stock: '1 kg', stockValue: 1, warning: 3, alert: 1, unit: 'kg', costoUnitario: '€28.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Pechuga de Pollo', stock: '3 kg', stockValue: 3, warning: 5, alert: 2, unit: 'kg', costoUnitario: '€7.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Costillar de Cerdo', stock: '12 kg', stockValue: 12, warning: 15, alert: 8, unit: 'kg', costoUnitario: '€8.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Carne Picada Vacuno', stock: '10 kg', stockValue: 10, warning: 15, alert: 8, unit: 'kg', costoUnitario: '€9.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Jamón Serrano', stock: '5 kg', stockValue: 5, warning: 8, alert: 3, unit: 'kg', costoUnitario: '€25.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Chorizo Ibérico', stock: '4 kg', stockValue: 4, warning: 8, alert: 3, unit: 'kg', costoUnitario: '€15.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Salmón Fresco', stock: '1.5 kg', stockValue: 1.5, warning: 3, alert: 1, unit: 'kg', costoUnitario: '€18.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Merluza de Pincho', stock: '6 kg', stockValue: 6, warning: 10, alert: 5, unit: 'kg', costoUnitario: '€16.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Calamares Frescos', stock: '10 kg', stockValue: 10, warning: 15, alert: 8, unit: 'kg', costoUnitario: '€14.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Gambas Rojas', stock: '3 kg', stockValue: 3, warning: 5, alert: 2, unit: 'kg', costoUnitario: '€35.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Huevo Campero (unidad)', stock: '30 unidades', stockValue: 30, warning: 50, alert: 20, unit: 'unidades', costoUnitario: '€0.25', impuesto: 'IVA Reducido' },
    { ingrediente: 'Queso de Cabra Rulo', stock: '3 kg', stockValue: 3, warning: 5, alert: 2, unit: 'kg', costoUnitario: '€15.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Queso Mozzarella', stock: '10 kg', stockValue: 10, warning: 15, alert: 8, unit: 'kg', costoUnitario: '€8.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Nata para Cocinar (35%)', stock: '8 l', stockValue: 8, warning: 12, alert: 5, unit: 'l', costoUnitario: '€3.50', impuesto: 'IVA Reducido' },
    { ingrediente: 'Yogur Griego', stock: '5 kg', stockValue: 5, warning: 8, alert: 3, unit: 'kg', costoUnitario: '€2.50', impuesto: 'IVA Reducido' },
    { ingrediente: 'Harina de Trigo', stock: '20 kg', stockValue: 20, warning: 30, alert: 15, unit: 'kg', costoUnitario: '€1.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Arroz Bomba', stock: '15 kg', stockValue: 15, warning: 25, alert: 10, unit: 'kg', costoUnitario: '€2.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Pan de Hamburguesa Brioche', stock: '40 unidades', stockValue: 40, warning: 60, alert: 30, unit: 'unidades', costoUnitario: '€0.60', impuesto: 'IVA Reducido' },
    { ingrediente: 'Aceite de Oliva Virgen Extra', stock: '4 l', stockValue: 4, warning: 8, alert: 3, unit: 'l', costoUnitario: '€9.50', impuesto: 'IVA Reducido' },
    { ingrediente: 'Sal Marina', stock: '10 kg', stockValue: 10, warning: 15, alert: 8, unit: 'kg', costoUnitario: '€0.50', impuesto: 'IVA Reducido' },
    { ingrediente: 'Pimienta Negra en Grano', stock: '2 kg', stockValue: 2, warning: 5, alert: 2, unit: 'kg', costoUnitario: '€12.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Pan de Masa Madre (hogaza)', stock: '10 unidades', stockValue: 10, warning: 20, alert: 8, unit: 'unidades', costoUnitario: '€3.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Chocolate Negro 70%', stock: '4 kg', stockValue: 4, warning: 8, alert: 3, unit: 'kg', costoUnitario: '€10.00', impuesto: 'IVA Reducido' },
    { ingrediente: 'Azúcar Blanco', stock: '15 kg', stockValue: 15, warning: 25, alert: 10, unit: 'kg', costoUnitario: '€0.80', impuesto: 'IVA Reducido' },
    { ingrediente: 'Agua Mineral (botella 50cl)', stock: '100 unidades', stockValue: 100, warning: 150, alert: 80, unit: 'unidades', costoUnitario: '€0.40', impuesto: 'IVA General' },
    { ingrediente: 'Refresco de Cola (lata 33cl)', stock: '150 unidades', stockValue: 150, warning: 200, alert: 100, unit: 'unidades', costoUnitario: '€0.70', impuesto: 'IVA General' },
    { ingrediente: 'Cerveza Lager (botella 33cl)', stock: '200 unidades', stockValue: 200, warning: 250, alert: 150, unit: 'unidades', costoUnitario: '€0.90', impuesto: 'IVA General' },
    { ingrediente: 'Vino Tinto Rioja Crianza (botella)', stock: '30 unidades', stockValue: 30, warning: 50, alert: 20, unit: 'unidades', costoUnitario: '€9.00', impuesto: 'IVA General' },
    { ingrediente: 'Café en Grano', stock: '5 kg', stockValue: 5, warning: 10, alert: 3, unit: 'kg', costoUnitario: '€15.00', impuesto: 'IVA General' }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      <h1>(TO-DO FIX) RECORDAR QUE AQUI NO SE ESTAN MOSTRANDO LOS INGREDIENTES AL CREARLOS *Tampoco esta usando la interfaz adecuada a ingredientes ni datos cotejados con la bbdd*</h1>
      <div className="container mx-auto ">
        <div className="mb-8">
          <Header
            title="Librería de Ingredientes"
          />
        </div>
        <ContenedorInventario
          headers={headers}
          data={inventarioData}
          searchPlaceholder="Buscar ingredientes..."
          createButtonText="Crear Ingrediente"

          onCreateClick={() => setIsModalOpen(true)}
          onRowClick={(item) => console.log('Ingrediente seleccionado:', item)}
        />

        {/* Modal de Ingredientes */}
        <IngredientesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Ingredientes;
