import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../components';
import { CartasGrid } from '../components/carta';
import IconColorSelector from '../components/carta/modalCarta/IconColorSelector';
import AccionesModal from '../components/carta/modalCarta/AccionesModal';
import type { ICarta } from '../types/database.types';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { fetchCartas } from '../types/mockups.types';

const Carta: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  // Estado para las cartas
  const [cartas, setCartas] = useState<ICarta[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos de cartas al montar el componente
  useEffect(() => {
    const loadCartas = async () => {
      try {
        const cartasData = await fetchCartas();
        setCartas(cartasData);
      } catch (error) {
        console.error('Error cargando cartas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartas();
  }, []);


  const [showIconColorModal, setShowIconColorModal] = useState(false);
  const [cartaParaIconColor, setCartaParaIconColor] = useState<ICarta | null>(null);

  // Estados para el modal de acciones
  const [showAccionesModal, setShowAccionesModal] = useState(false);
  const [cartaParaAcciones, setCartaParaAcciones] = useState<ICarta | null>(null);

  // Referencias para botones
  const buttonRef = useRef<HTMLButtonElement>(null);
  const accionesButtonRef = useRef<HTMLButtonElement>(null);

  const handleToggleActivo = (id: string) => {
    setCartas(prev =>
      prev.map(carta =>
        carta.id === id
          ? { ...carta, activo: !carta.activo }
          : carta
      )
    );
  };


  const handleCrearCarta = () => {
    const nuevaCarta: ICarta = {
      id: Date.now().toString(),
      nombre: `Carta ${cartas.length + 1}`,
      icono: 'utensils',
      activo: true,
      aforoTotal: 0,
      mesas: 0,
      mesasActivas: 0,
      estado: 'Abierto',
      porcentajeOcupacion: 0,
      colorBorde: 'rgb(155, 110, 253)',
      categorias: []
    };
    setCartas(prev => [...prev, nuevaCarta]);
  };

  const handleEditarNombre = (id: string, nuevoNombre: string) => {
    setCartas(prev =>
      prev.map(carta =>
        carta.id === id
          ? { ...carta, nombre: nuevoNombre }
          : carta
      )
    );
  };

  const handleConfigurar = (carta: ICarta, btnRef: React.RefObject<HTMLButtonElement>) => {
    setCartaParaIconColor(carta);
    buttonRef.current = btnRef.current;
    setShowIconColorModal(true);
  };

  const handleEliminarCarta = (carta: ICarta) => {
    setCartas(prev => prev.filter(c => c.id !== carta.id));
  };

  const handleSaveIconColor = (cartaActualizada: ICarta) => {
    setCartas(prev =>
      prev.map(carta =>
        carta.id === cartaActualizada.id
          ? cartaActualizada
          : carta
      )
    );
    // No cerramos el modal para permitir múltiples cambios
  };

  const handleCloseIconColorModal = () => {
    setShowIconColorModal(false);
    setCartaParaIconColor(null);
  };

  // Funciones para el modal de acciones
  const handleAcciones = (carta: ICarta, btnRef: React.RefObject<HTMLButtonElement>) => {
    setCartaParaAcciones(carta);
    accionesButtonRef.current = btnRef.current;
    setShowAccionesModal(true);
  };

  const handleCloseAccionesModal = () => {
    setShowAccionesModal(false);
    setCartaParaAcciones(null);
  };

  const handleGestionar = (carta: ICarta) => {
    const cartaName = carta.nombre.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dashboard/carta/${cartaName}/edit`);
    setShowAccionesModal(false);
  };

  const handleDuplicar = (carta: ICarta) => {
    // Funcionalidad próximamente
    console.log('Duplicar carta:', carta.nombre);
    setShowAccionesModal(false);
  };

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="container mx-auto">
          <div className="mb-8">
            <Header
              title="Gestión de Cartas"
              subtitle="Crea y organiza las diferentes cartas que ofreces (principal, bebidas, postres, etc.)"
            />
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto ">
        <div className="mb-8">
          <Header
            title="Gestión de Cartas"
            subtitle="Crea y organiza las diferentes cartas que ofreces (principal, bebidas, postres, etc.)"
          />
        </div>
        <CartasGrid
          cartas={cartas}
          onToggleActivo={handleToggleActivo}
          onEditarNombre={handleEditarNombre}
          onConfigurar={handleConfigurar}
          onCrearCarta={handleCrearCarta}
          onAcciones={handleAcciones}
        />



        <IconColorSelector
          carta={cartaParaIconColor}
          isOpen={showIconColorModal}
          onClose={handleCloseIconColorModal}
          onSave={handleSaveIconColor}
          buttonRef={buttonRef as React.RefObject<HTMLButtonElement>}
        />

        <AccionesModal
          carta={cartaParaAcciones}
          isOpen={showAccionesModal}
          onClose={handleCloseAccionesModal}
          onGestionar={handleGestionar}
          onDuplicar={handleDuplicar}
          onEliminar={handleEliminarCarta}
          buttonRef={accionesButtonRef as React.RefObject<HTMLButtonElement>}
        />
      </div>
    </div>
  );
};

export default Carta;
