import React from 'react';
import { Link } from 'react-router-dom';

// Iconos SVG como componentes funcionales
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-5 w-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PrinterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-printer h-5 w-5">
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path>
    <rect x="6" y="14" width="12" height="8" rx="1"></rect>
  </svg>
);

const PercentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-percent h-5 w-5">
    <line x1="19" x2="5" y1="5" y2="19"></line>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card h-5 w-5">
    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
    <line x1="2" x2="22" y1="10" y2="10"></line>
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell h-5 w-5">
    <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export const Settings: React.FC = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-8 md:p-8 md:pt-0">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/settings/account">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary transition-colors h-full flex flex-col group border-l-4 border-l-primary">
            <div className="flex flex-col space-y-1.5 p-6 flex-grow">
              <div className="text-2xl leading-none tracking-tight font-bold text-muted-foreground flex items-center gap-2">
                <UserIcon />
                <span>Perfil y Empresa</span>
              </div>
              <div className="text-sm text-muted-foreground">Gestiona tu perfil, datos del local, empresa e impuestos.</div>
            </div>
            <div className="p-6 pt-0 flex items-end justify-end">
              <ArrowRightIcon />
            </div>
          </div>
        </Link>
        
        <Link to="/settings/account?tab=devices">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary transition-colors h-full flex flex-col group border-l-4 border-l-primary">
            <div className="flex flex-col space-y-1.5 p-6 flex-grow">
              <div className="text-2xl leading-none tracking-tight font-bold text-muted-foreground flex items-center gap-2">
                <PrinterIcon />
                <span>Dispositivos e Impresoras</span>
              </div>
              <div className="text-sm text-muted-foreground">Conecta y configura tus impresoras de tickets, KDS y otros periféricos.</div>
            </div>
            <div className="p-6 pt-0 flex items-end justify-end">
              <ArrowRightIcon />
            </div>
          </div>
        </Link>
        
        <Link to="/settings/taxes">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary transition-colors h-full flex flex-col group border-l-4 border-l-primary">
            <div className="flex flex-col space-y-1.5 p-6 flex-grow">
              <div className="text-2xl leading-none tracking-tight font-bold text-muted-foreground flex items-center gap-2">
                <PercentIcon />
                <span>Impuestos</span>
              </div>
              <div className="text-sm text-muted-foreground">Gestiona los tipos de IVA y otros impuestos aplicables.</div>
            </div>
            <div className="p-6 pt-0 flex items-end justify-end">
              <ArrowRightIcon />
            </div>
          </div>
        </Link>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary transition-colors h-full flex flex-col group cursor-not-allowed opacity-50 border-l-4 border-l-primary">
          <div className="flex flex-col space-y-1.5 p-6 flex-grow">
            <div className="text-2xl leading-none tracking-tight font-bold text-muted-foreground flex items-center gap-2">
              <CreditCardIcon />
              <span>Facturación y Suscripción</span>
            </div>
            <div className="text-sm text-muted-foreground">Consulta tu plan, historial de facturas y gestiona tus métodos de pago.</div>
          </div>
          <div className="p-6 pt-0 flex items-end justify-end">
            <ArrowRightIcon />
          </div>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary transition-colors h-full flex flex-col group cursor-not-allowed opacity-50 border-l-4 border-l-primary">
          <div className="flex flex-col space-y-1.5 p-6 flex-grow">
            <div className="text-2xl leading-none tracking-tight font-bold text-muted-foreground flex items-center gap-2">
              <BellIcon />
              <span>Notificaciones</span>
            </div>
            <div className="text-sm text-muted-foreground">Configura cómo y cuándo recibes notificaciones sobre pedidos y reservas.</div>
          </div>
          <div className="p-6 pt-0 flex items-end justify-end">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings; 