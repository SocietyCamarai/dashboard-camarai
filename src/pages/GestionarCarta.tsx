import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {TrashIcon, SubirIcon, BajarIcon, CategoriasIcon, CombosIcons, RetrocederIcon} from '../components/icons';
import { useTheme } from '../hooks/useTheme';
import { SwitchToggle } from '../components/SwitchToggle';

interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  orden: number;
}

interface Menu {
  id: string;
  nombre: string;
  icono: string;
  orden: number;
}

interface ElementoCarta {
  id: string;
  nombre: string;
  tipo: 'categoria' | 'menu';
  orden: number;
}

const GestionarCarta: React.FC = () => {
  const { cartaId } = useParams<{ cartaId: string }>();
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  
  // Extraer el nombre de la carta del ID
  const cartaNombre = cartaId?.split('-').slice(0, -1).join(' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Carta';
  
  // Estados para los detalles de la carta
  const [nombreCarta, setNombreCarta] = useState(cartaNombre);
  const [descripcionCarta, setDescripcionCarta] = useState('Nuestra selección completa de platos para disfrutar.');
  const [cartaActiva, setCartaActiva] = useState(true);
  
  // Estados para categorías y menús
  const [categorias] = useState<Categoria[]>([
    { id: '1', nombre: 'Entrantes', icono: 'utensils', orden: 1 },
    { id: '2', nombre: 'Ensaladas', icono: 'utensils', orden: 2 },
    { id: '3', nombre: 'Arroces y Pastas', icono: 'utensils', orden: 3 },
    { id: '4', nombre: 'Carnes', icono: 'utensils', orden: 4 },
    { id: '5', nombre: 'Pescados', icono: 'utensils', orden: 5 },
    { id: '6', nombre: 'Hamburguesas', icono: 'utensils', orden: 6 },
    { id: '7', nombre: 'Platos Vegetarianos', icono: 'utensils', orden: 7 },
    { id: '8', nombre: 'Postres', icono: 'utensils', orden: 8 }
  ]);
  
  const [menus] = useState<Menu[]>([
    { id: '1', nombre: 'Menú del Día', icono: 'utensils', orden: 1 },
    { id: '2', nombre: 'Menú Degustación', icono: 'utensils', orden: 2 },
    { id: '3', nombre: 'Menú Infantil', icono: 'utensils', orden: 3 }
  ]);
  

  
  const [contenidoCarta, setContenidoCarta] = useState<ElementoCarta[]>([
    { id: '1', nombre: 'Menú del Día', tipo: 'menu', orden: 1 },
    { id: '2', nombre: 'Ensaladas', tipo: 'categoria', orden: 2 },
    { id: '3', nombre: 'Arroces y Pastas', tipo: 'categoria', orden: 3 },
    { id: '4', nombre: 'Carnes', tipo: 'categoria', orden: 4 },
    { id: '5', nombre: 'Pescados', tipo: 'categoria', orden: 5 },
    { id: '6', nombre: 'Hamburguesas', tipo: 'categoria', orden: 6 }
  ]);
  
  const handleVolver = () => {
    navigate('/dashboard/carta');
  };
  
  const moverElemento = (lista: any[], setLista: any, id: string, direccion: 'up' | 'down') => {
    const index = lista.findIndex(item => item.id === id);
    if ((direccion === 'up' && index > 0) || (direccion === 'down' && index < lista.length - 1)) {
      const nuevaLista = [...lista];
      const elementoActual = nuevaLista[index];
      nuevaLista[index] = nuevaLista[direccion === 'up' ? index - 1 : index + 1];
      nuevaLista[direccion === 'up' ? index - 1 : index + 1] = elementoActual;
      
      setLista(nuevaLista);
    }
  };
  
  const eliminarElemento = (lista: any[], setLista: any, id: string) => {
    setLista(lista.filter(item => item.id !== id));
  };
  
  const agregarAContenido = (elemento: any, tipo: 'categoria' | 'menu') => {
    // Verificar si el elemento ya existe en el contenido
    const yaExiste = contenidoCarta.some(item => item.nombre === elemento.nombre && item.tipo === tipo);
    if (yaExiste) return;
    
    // Crear nuevo elemento para el contenido
    const nuevoElemento: ElementoCarta = {
      id: Date.now().toString(), // ID único basado en timestamp
      nombre: elemento.nombre,
      tipo: tipo,
      orden: contenidoCarta.length + 1
    };
    
    setContenidoCarta([...contenidoCarta, nuevoElemento]);
  };
  
  // const renderSeccionElementos = (titulo: string, elementos: any[], setElementos: any, textoBoton: string) => (
  //   <div className="bg-white rounded-lg p-6 shadow-sm" style={{ backgroundColor: currentTheme.colors.sidebar }}>
  //     <div className=" mb-4">
  //       <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>{titulo}</h3>
  //       <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Añade categorías a la carta.</span>
  //     </div>
      
  //     <div className="space-y-3">
  //       {elementos.map((elemento) => (
  //         <div key={elemento.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: currentTheme.colors.border, backgroundColor: currentTheme.colors.background }}>
  //           <div className="flex items-center gap-3">
  //             <UtensilsIcon className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
  //             <span style={{ color: currentTheme.colors.text }}>{elemento.nombre}</span>
  //           </div>
  //           <button
  //             onClick={() => agregarAContenido(elemento, 'categoria')}
  //             className="px-4 py-2 rounded-lg text-sm font-medium"
  //             style={{ backgroundColor: currentTheme.colors.primary, color: 'white' }}
  //           >
  //             {textoBoton}
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  
  const renderContenidoCarta = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm h-min" style={{ backgroundColor: currentTheme.colors.sidebar }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>Contenido de la Carta</h3>
        <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Organiza el orden de los elementos en tu carta.</span>
      </div>
      
      <div className="space-y-3">
        {contenidoCarta.map((elemento, index) => (
          <div key={elemento.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: currentTheme.colors.border, backgroundColor: currentTheme.colors.background }}>
            <div className="flex items-center gap-3">
              {elemento.tipo === 'menu' ? (
                <CombosIcons className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
              ) : (
                <CategoriasIcon className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
              )}
              <div className="flex flex-col">
                <span style={{ color: currentTheme.colors.text }}>{elemento.nombre}</span>
                <span className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                  {elemento.tipo === 'menu' ? 'Menú' : 'Categoría'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => moverElemento(contenidoCarta, setContenidoCarta, elemento.id, 'up')}
                disabled={index === 0}
                className="p-1 rounded disabled:opacity-50"
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}33`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <SubirIcon className="h-4 w-4" style={{ color: currentTheme.colors.textSecondary }} />
              </button>
              <button
                onClick={() => moverElemento(contenidoCarta, setContenidoCarta, elemento.id, 'down')}
                disabled={index === contenidoCarta.length - 1}
                className="p-1 rounded disabled:opacity-50"
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}33`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <BajarIcon className="h-4 w-4" style={{ color: currentTheme.colors.textSecondary }} />
              </button>
              <button
                onClick={() => eliminarElemento(contenidoCarta, setContenidoCarta, elemento.id)}
                className="p-1 rounded"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef444433';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <TrashIcon className="h-4 w-4" style={{ color: '#ef4444' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: currentTheme.colors.border, backgroundColor: currentTheme.colors.sidebar }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVolver}
              className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ backgroundColor: currentTheme.colors.primary,
                color: currentTheme.colors.background
               }}
            >
              <RetrocederIcon className='w-4 h-4'/>
            </button>
            <div className="inline-block">
              <h1
                className="text-left text-[2.2rem]"
                style={{
                  background: 'linear-gradient(to right, rgb(155, 110, 253), rgb(240, 118, 140), rgb(120, 163, 237))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontFamily: "'Inter var', system-ui, -apple-system, sans-serif",
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                }}
              >
                Gestionar Carta: "{cartaNombre}"
              </h1>

              <p className="text-[1.1rem] mt-2" style={{ color: currentTheme.colors.textSecondary }}>
                Define los detalles y organiza el contenido de esta carta.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Columna 1: Detalles de la Carta */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-min" style={{ backgroundColor: currentTheme.colors.sidebar }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>Detalles de la Carta</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>Nombre de la Carta</label>
                <input
                  type="text"
                  value={nombreCarta}
                  onChange={(e) => setNombreCarta(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  style={{ 
                    borderColor: currentTheme.colors.border,
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>Descripción</label>
                <textarea
                  value={descripcionCarta}
                  onChange={(e) => setDescripcionCarta(e.target.value)}
                  rows={4}
                  className="w-full p-3 border rounded-lg resize-none"
                  style={{ 
                    borderColor: currentTheme.colors.border,
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span style={{ color: currentTheme.colors.text }}>Carta Activa (visible)</span>
                <SwitchToggle
                  isActive={cartaActiva}
                  onToggle={() => setCartaActiva(!cartaActiva)}
                />
              </div>
            </div>
          </div>
          
          {/* Columna 2: Categorías Disponibles y Menús y Combos */}
          <div className="space-y-6">
            {/* Categorías Disponibles */}
            <div className="bg-white rounded-lg p-6 shadow-sm " style={{ backgroundColor: currentTheme.colors.sidebar }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Categorías Disponibles</h3>
                <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Añade categorías a la carta.</span>
              </div>
              
              <div className="space-y-3 lg:max-h-72 lg:overflow-y-auto">
                {categorias.map((elemento) => (
                  <div key={elemento.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: currentTheme.colors.border, backgroundColor: currentTheme.colors.background }}>
                    <div className="flex items-center gap-3">
                      <CategoriasIcon className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                      <span style={{ color: currentTheme.colors.text }}>{elemento.nombre}</span>
                    </div>
                    <button
                      onClick={() => agregarAContenido(elemento, 'categoria')}
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: currentTheme.colors.primary, color: 'white' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}E6`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = currentTheme.colors.primary;
                      }}
                    >
                      Añadir
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Menús y Combos Disponibles */}
            <div className="bg-white rounded-lg p-6 shadow-sm" style={{ backgroundColor: currentTheme.colors.sidebar }}>
              <div className="mb-4 text-center">
                <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Menús y Combos Disponibles</h3>
                <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Añade menús completos a la carta.</span>
              </div>
              <div className="space-y-3 lg:max-h-96 lg:overflow-y-auto">
                {menus.map((menu) => (
                  <div key={menu.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: currentTheme.colors.border, backgroundColor: currentTheme.colors.background }}>
                    <div className="flex items-center gap-3">
                      <CombosIcons className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                      <span style={{ color: currentTheme.colors.text }}>{menu.nombre}</span>
                    </div>
                    <button
                      onClick={() => agregarAContenido(menu, 'menu')}
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: currentTheme.colors.primary, color: 'white' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}E6`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = currentTheme.colors.primary;
                      }}
                    >
                      Añadir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Columna 3: Contenido de la Carta */}
          {renderContenidoCarta()}
        </div>
        

      </div>
      
      {/* Botón Guardar Flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: currentTheme.colors.primary, color: 'white' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}E6`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.colors.primary;
          }}
        >
          Guardar Carta
        </button>
      </div>
    </div>
  );
};

export default GestionarCarta;